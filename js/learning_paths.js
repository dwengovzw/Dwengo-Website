function visualizeLearningPaths(paths) {
    let dwengoColors = ["#0f5faa", "#0f5d6d", "#115b4e", "#115933", "#3c8227", "#73b51e", "#f9d713", "#f4a72c", "#e87b66"];
    let col = 0;
    paths.forEach(path => {
        let div = document.createElement("div");
        div.className = "col-lg-4 col-md-6 col-sm-12 py-3";

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

        div.appendChild(img)
        div.appendChild(info)
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

loadLearningPaths();