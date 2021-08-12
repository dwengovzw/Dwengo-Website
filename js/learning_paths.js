function visualizeLearningPaths(paths) {
    let dwengoColors = ["#0f5faa", "#0f5d6d", "#115b4e", "#115933", "#3c8227", "#73b51e", "#f9d713", "#f4a72c", "#e87b66"];
    let col = 0;
    paths.forEach(path => {
        let div = document.createElement("div");
        div.className = "col-lg-4 col-md-6 col-sm-12 py-3";

        let a = document.createElement("a");
        a.href = `learning-path?id=${path._id}`
        a.style.textDecoration = "none"

        let img = document.createElement("img");
        img.src = "data:image/jpeg;base64, " + path.image;
        img.style.filter = "grayscale(100%)";
        let info = document.createElement("div");
        info.className = "p-2"
        info.style.backgroundColor = dwengoColors[col];
        info.style.color = "white";


        let title = document.createElement("h5");
        title.innerHTML = path.title;
        title.className = "mb-3"
        let desc = document.createElement("p");
        desc.innerHTML = path.description;

        info.appendChild(title);
        info.appendChild(desc);

        a.appendChild(img);
        a.appendChild(info)

        div.appendChild(a)
        document.getElementById("learning_paths").appendChild(div);

        col = (col + 1) % dwengoColors.length;
    });

}

function loadLearningPaths() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let learning_paths = JSON.parse(this.response);
            visualizeLearningPaths(learning_paths);
        }
    };
    xhttp.open("GET", "http://localhost:8085/api/learningPath/search?all=test", true);
    xhttp.send();
}

function loadObjectContent(object_id) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("lo_content").innerHTML = this.response;
        }
    };
    xhttp.open("GET", "http://localhost:8085/api/learningObject/getContent/" + object_id, true);
    xhttp.send();
}

function objectButtonClicked(object_id, path) {

    document.getElementById("lp_visualisation").childNodes.forEach((item) => {
        item.className = "list-group-item list-group-item-action" + (item.id == "btn_obj_" + object_id ? " active" : "");
    })
    let node = path.nodes.find((n) => n.learningobject_id == object_id)
    // if node.transitions && node.transitions.length > 0 =>  next bestaat
    //      => toon buttn next + on click (objectButtonClicked(next-id, path))
    // if find node die in next het id heeft => prev bestaat
    //      => toon btn prev + on click (objectButtonClicked(prev-id, path))

    if (node.transitions && node.transitions.length > 0) {
        document.getElementById("btn_next_lo").className = "btn btn-outline-primary col m-3"
        document.getElementById("btn_next_lo").onclick = (ev) => {
            objectButtonClicked(node.transitions[0].next, path);
        }
    } else {
        document.getElementById("btn_next_lo").className = "btn btn-outline-primary col m-3 invisible"
    }

    let prev = path.nodes.find((n) => {
        return n.transitions && n.transitions.length > 0 && n.transitions[0].next == object_id;
    })
    if (prev) {
        document.getElementById("btn_previous_lo").className = "btn btn-outline-secondary col m-3"
        document.getElementById("btn_previous_lo").onclick = (ev) => {
            objectButtonClicked(prev.learningobject_id, path);
        }
    } else {
        document.getElementById("btn_previous_lo").className = "btn btn-outline-secondary col m-3 invisible"

    }

    loadObjectContent(object_id);

}

function nextButtonClicked(node, path) {
    let next = node.transitions[0].next
    objectButtonClicked(next, path);

    let nextNode = path.nodes.find((n) => n.learningobject_id == next)

    if (nextNode.transitions && nextNode.transitions.length > 0) {
        document.getElementById("btn_next_lo").onclick = (ev) => {
            nextButtonClicked(nextNode, path);
        }
    } else {
        document.getElementById("btn_next_lo").className += " invisible";
    }

}

function visualizeLearningPath(path) {
    document.querySelectorAll('.lp_title').forEach((element) => {
        element.innerHTML = path.title;
    })
    let nodes = path.nodes.slice();
    let counter = 0;
    let node = nodes.find((n) => n.start_node);

    if (node.transitions && node.transitions.length > 0) {
        let nodeCopy = Object.assign(node);
        document.getElementById("btn_next_lo").onclick = (ev) => {
            nextButtonClicked(nodeCopy, path);
        }
    } else {
        document.getElementById("btn_next_lo").className += " invisible";
    }


    loadObjectContent(node.learningobject_id)

    while (counter < path.nodes.length) {
        console.log(node.learningobject_id)
        const next = node.transitions && node.transitions.length > 0 ? nodes.find((n) => n.learningobject_id == node.transitions[0].next) : undefined;

        let item = document.createElement("button")
        item.id = "btn_obj_" + node.learningobject_id;
        item.type = "button"
        item.className = "list-group-item list-group-item-action" + (node.start_node ? " active" : "");

        document.getElementById("lp_visualisation").appendChild(item);

        var xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let metadata = JSON.parse(this.response);
                let item = document.getElementById("btn_obj_" + metadata._id);
                item.innerHTML = metadata.title;
                item.onclick = (ev) => {
                    objectButtonClicked(metadata._id, path);
                }
            }
        };
        xhttp.open("GET", "http://localhost:8085/api/learningObject/getMetadata/" + node.learningobject_id, true);
        xhttp.send();
        const index = nodes.indexOf(node);
        if (index > -1) {
            nodes.splice(index, 1);
        }
        node = next ? next : nodes[0];
        counter++;
    }


}

function getParameterByName(name) {
    let url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function loadLearningPath() {
    var id = getParameterByName('id');

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            try {
                let learning_path = JSON.parse(this.response);
                visualizeLearningPath(learning_path);

            } catch (e) {
                console.log(this.response);
            }
        }
    };
    xhttp.open("GET", "http://localhost:8085/api/learningPath/" + id, true);
    xhttp.send();

}

if (document.getElementById("learning_paths")) {
    loadLearningPaths();
} else if (document.getElementById("learning_path")) {
    loadLearningPath();
}