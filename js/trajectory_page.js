---
---

(() => {

    let lang = "{% t lang %}";
    console.log(lang);
    console.log("Trajectory Page");
    let readQueryString = () => {
        let query = window.location.search.substring(1);
        let vars = query.split("&");
        let queryString = {};
        for (let i = 0; i < vars.length; i++) {
            let pair = vars[i].split("=");
            queryString[pair[0]] = decodeURIComponent(pair[1]);
        }
        return queryString;
    };
    let query = readQueryString();
    console.log(JSON.parse(query.trajectory))

    let trajectoryNameMap = {
        "ai": "{% t learning_trajectories.ai %}",
        "pc": "{% t learning_trajectories.physical_computing %}"
    }

    let gradeNameMape = {
        "first_grade": "{% t learning_trajectories.grade1 %}",
        "second_grade": "{% t learning_trajectories.grade2 %}",
        "third_grade": "{% t learning_trajectories.grade3 %}"
    }

    let visualizeTajectory = (trajectories) => {
        let trajectoryContent = document.querySelector(".personal_trajectory_content");
        for (let trajectory in trajectories) {
            // lookup the name of the trajectory and add a div with the name as title
            let trajectoryName = trajectoryNameMap[trajectory];
            let trajectoryContainer = document.createElement("div");
            trajectoryContainer.classList.add("trajectory_container");
            trajectoryContainer.classList.add(trajectory);
            let trajectoryTitle = document.createElement("h2");
            trajectoryTitle.classList.add("trajectory_title");
            trajectoryTitle.innerHTML = trajectoryName;
            trajectoryContainer.appendChild(trajectoryTitle);
            trajectoryContent.appendChild(trajectoryContainer);
            for (let grade in trajectories[trajectory]) {
                // lookup the name of the grade and add a div with the name as title
                let gradeName = gradeNameMape[grade];
                let gradeContainer = document.createElement("div");
                gradeContainer.classList.add("grade_container");
                gradeContainer.classList.add(grade);
                let gradeTitle = document.createElement("h3");
                gradeTitle.classList.add("grade_title");
                gradeTitle.innerHTML = gradeName;
                gradeContainer.appendChild(gradeTitle);
                trajectoryContainer.appendChild(gradeContainer);
                // add the content of the grade
                let gradeContent = document.createElement("div");
                gradeContent.classList.add("grade_content");
                gradeContainer.appendChild(gradeContent);

                let item = trajectories[trajectory][grade]
                let itemContainer = document.createElement("div");
                itemContainer.classList.add("item");
                let itemTitle = document.createElement("h4");
                itemTitle.classList.add("item_title");
                itemTitle.innerText = item.title;

                let itemLearningPaths = document.createElement("div");
                itemLearningPaths.classList.add("item_learning_paths");

                
                let pageTitle ="{% t learning_trajectories.my_personal_trajectory %}"
                loadLearningPathsInContainer(item.paths, lang, itemLearningPaths, pageTitle)

                itemContainer.appendChild(itemTitle);
                itemContainer.appendChild(itemLearningPaths);
                gradeContent.appendChild(itemContainer);
            }
        }  
    };

    
    let trajectory = JSON.parse(query.trajectory);
    visualizeTajectory(trajectory);
})();