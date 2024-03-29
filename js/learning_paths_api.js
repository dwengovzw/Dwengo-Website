//let api_base_path = window.location.origin + "/backend" // For deploy
let api_base_path = "http://localhost:8085"   // For debug

let visualizeLearningPathsInContainer = (learningPaths, container, pageTitle, sort=true) => {
    let dwengoColors = ["#0f5faa", "#0f5d6d", "#115b4e", "#115933", "#3c8227", "#73b51e", "#f4a72c", "#e87b66"];
    let currentColorIndex = 0;
    let learningPathsContainer = container;
    
    // add class to container
    learningPathsContainer.classList.add("item_learning_paths");
    learningPaths.forEach(path => {
        let div = document.createElement("div");
        div.className = "lp_card_container";
        let a = document.createElement("a");
        // TODO add language to url
        let langPrefix = ""
        if (path.language !== "nl" && siteLanguages.includes(path.language)){
            langPrefix = "/" + path.language
        }
        a.href = `${langPrefix}/learning-path.html?hruid=${path.hruid}&language=${path.language}&te=true&source_page=${encodeURIComponent(window.location.pathname)}${window.location.search}&source_title=${pageTitle}${window.location.hash}`
        a.style.textDecoration = "none"

        let card = document.createElement("div");
        card.className = "card";

        let img = document.createElement("img");
        img.className = "card-img-top"
        img.src = "data:image/jpeg;base64, " + path.image;
        img.style.filter = "grayscale(100%)";
        img.width = "500";
        img.height = "500";

        let cardBodyContainer = document.createElement("div");
        cardBodyContainer.className = "card-body-container"

        let info = document.createElement("div");
        info.className = "card-body"
        info.style.backgroundColor = dwengoColors[currentColorIndex];
        info.style.color = "white";

        let age_range_container = document.createElement("span");
        age_range_container.className = "age_group_label"
        let age_range = document.createElement("span");
        let icon = document.createElement("img");
        icon.className = "age_range_icon"
        icon.width = "100"
        icon.height = "75"
        icon.setAttribute("src", "/images/logos/age_logo.svg");

        let agerange = `${path.min_age} - ${path.max_age}`
        age_range.innerHTML = agerange;
        age_range.className = "age_range_text";
        age_range_container.append(icon);
        age_range_container.append(age_range)
        
        cardBodyContainer.appendChild(info)

        let title = document.createElement("h5");
        title.innerHTML = path.title;
        title.className = "card-title"
        let desc = document.createElement("p");
        desc.innerHTML = path.description;
        desc.className = "card-text"

        info.appendChild(title);
        info.appendChild(desc);

        

        card.appendChild(img);
        card.appendChild(cardBodyContainer);
        card.appendChild(age_range_container);

        a.appendChild(card);
        div.appendChild(a)
        learningPathsContainer.appendChild(div);

        currentColorIndex = (currentColorIndex + 1) % dwengoColors.length;
    });
}

let searchAndLoadLearningPathsIntoContainer = (filter, lang, container, pageTitle, min_age = 0, max_age = 25) => {
    let url =  api_base_path + "/api/learningPath/search?all=" + filter + "&language=" + lang + "&min_age=" + min_age + "&max_age=" + max_age;
    loadAndVisualizeLearningPaths(url, container, pageTitle, true);
}

let loadLearningPathListInContainer = (paths, lang, container, pageTitle) => {
    //let basepath = window.location.origin + "/backend";
    let payload = {
        hruids: paths,
    }
    let url = api_base_path + "/api/learningPath/getPathsFromIdList?pathIdList=" + JSON.stringify(payload) + "&language=" + lang;
    loadAndVisualizeLearningPaths(url, container, pageTitle, false);
}

let loadAndVisualizeLearningPaths = (url, container, pageTitle, sort) => {
    container.innerHTML = "";
    // Add loading spinner
    let loadingSpinner = document.createElement("div");
    loadingSpinner.className = "loading_spinner";
    loadingSpinner.role = "status";
    container.appendChild(loadingSpinner);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let learning_paths = JSON.parse(this.response);
            visualizeLearningPathsInContainer(learning_paths, container, pageTitle, sort);
            container.removeChild(loadingSpinner);
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}


let sortResults = (my_array, prop, asc) => {
    my_array.sort(function(a, b) {
        if (asc) {
            return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
        } else {
            return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
        }
    });
    return my_array;
}
