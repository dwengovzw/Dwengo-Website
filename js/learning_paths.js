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

function loadLearningObjects(nodes) {

}

function visualizeLearningPath(path) {
    document.getElementById("lp_title").innerHTML = path.title;

    // path.nodes.forEach(node => {
    let node = path.nodes[0];
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("lo_content").innerHTML = this.response;
            console.log(this.response);
            // visualizeLearningPaths(learning_paths);
        }
    };
    xhttp.open("GET", "http://localhost:8085/api/learningObject/getContent/" + node.learningobject_id, true);
    xhttp.send();
    // });

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
            let learning_path = JSON.parse(this.response);
            //visualizeLearningPaths(learning_paths);
            visualizeLearningPath(learning_path);
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