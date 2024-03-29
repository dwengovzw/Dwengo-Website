---
---

(() => {
    let lang = "{% t lang %}";
    console.log("Learning Trajectories");
    let trajectoryLearningPathIdOptions = {
        ai: {
            first_grade: [
                {
                    title: "{% t learning_trajectories.items.ai_in_art.title %}",
                    description: "{% t learning_trajectories.items.ai_in_art.description %}",
                    image: "/images/learning_trajectories/jommeke.jpg",
                    paths: ["art1"] // Leerpad jommeke
                },
                {
                    title: "{% t learning_trajectories.items.socialrobot.title %}",
                    description: "{% t learning_trajectories.items.socialrobot.description %}",
                    image: "/images/learning_trajectories/sociale_robot.jpg",
                    paths: ['sr0_lkr', 'sr0_lln', 'sr1', 'sr2', 'sr3', 'sr4']
                }
            ],
            second_grade: [
                {
                    title: "{% t learning_trajectories.items.socialrobot.title %}",
                    description: "{% t learning_trajectories.items.socialrobot.description %}",
                    image: "/images/learning_trajectories/sociale_robot.jpg",
                    paths: ['sr0_lkr', 'sr0_lln', 'sr1', 'sr2', 'sr3', 'sr4'] 
                },
                {
                    title: "{% t learning_trajectories.items.kiks.title %}",
                    description: "{% t learning_trajectories.items.kiks.description %}",
                    image: "/images/learning_trajectories/kiks.jpg",
                    paths: ['pn_werking', 'un_artificiele_intelligentie', 'pn_klimaatverandering', 'pn_digitalebeelden'] 
                }
            ],
            third_grade: [
                {
                    title: "{% t learning_trajectories.items.kiks.title %}",
                    description: "{% t learning_trajectories.items.kiks.description %}",
                    image: "/images/learning_trajectories/kiks.jpg",
                    paths: ['pn_werking', 'un_artificiele_intelligentie', 'pn_klimaatverandering', 'kiks1_microscopie', 'kiks2_practicum', 'pn_digitalebeelden', 'kiks3_dl_basis', 'kiks4_dl_gevorderd', 'kiks5_classificatie', 'kiks6_regressie', 'kiks7_ethiek', 'kiks8_eindtermen'] 
                },
                {
                    title: "{% t learning_trajectories.items.chatbot.title %}",
                    description: "{% t learning_trajectories.items.chatbot.description %}",
                    image: "/images/learning_trajectories/chatbot.jpg",
                    paths: ['pn_werking', 'un_artificiele_intelligentie', 'cb5_chatbotunplugged', 'cb1_chatbot'] 
                }
            ],
        },
        pc: {
            first_grade: [
                {
                    title: "{% t learning_trajectories.items.socialrobot.title %}",
                    description: "{% t learning_trajectories.items.socialrobot.description %}",
                    image: "/images/learning_trajectories/sociale_robot.jpg",
                    paths: ['sr0_lkr', 'sr0_lln', 'sr1', 'sr2', 'sr3', 'sr4']
                },
                {
                    title: "{% t learning_trajectories.items.wegostem.title %}",
                    description: "{% t learning_trajectories.items.wegostem.description %}",
                    image: "/images/learning_trajectories/wegostem.jpg",
                    paths: ['wegostem'] 
                },
                {
                    title: "{% t learning_trajectories.items.intro_dwenguino.title %}",
                    description: "{% t learning_trajectories.items.intro_dwenguino.description %}",
                    image: "/images/learning_trajectories/intro_dwenguino.jpg",
                    paths: ['wegostem'] 
                }
            ],
            second_grade: [
                {
                    title: "{% t learning_trajectories.items.theremin.title %}",
                    description: "{% t learning_trajectories.items.theremin.description %}",
                    image: "/images/learning_trajectories/theremin.jpg",
                    paths: ['pc_theremin'] 
                },
                {
                    title: "{% t learning_trajectories.items.leerlijn_microcontrollers.title %}",
                    description: "{% t learning_trajectories.items.leerlijn_microcontrollers.description %}",
                    image: "/images/learning_trajectories/microcontroller.jpg",
                    paths: ['pc_leerlijn_introductie', 'pc_leerlijn_invoer_verwerking_uitvoer', 'pc_leerlijn_basisprincipes_digitale_elektronica', 'pc_leerlijn_grafisch_naar_tekstueel', 'pc_leerlijn_basis_programmeren', 'pc_leerlijn_fiches_dwenguino', 'pc_leerlijn_seriele_monitor', 'pc_leerlijn_fiches_arduino', 'pc_leerlijn_project_lijnvolger', 'pc_leerlijn_project_bluetooth'] 
                }
            ],
            third_grade: [
                {
                    title: "{% t learning_trajectories.items.geavanceerde_microcontroller.title %}",
                    description: "{% t learning_trajectories.items.geavanceerde_microcontroller.description %}",
                    image: "/images/learning_trajectories/microcontroller.jpg",
                    paths: ['pc_microcontroller']
                }
            ],
        },
    }
    let currentTrajectorySelection = {
        ai: {
            first_grade: trajectoryLearningPathIdOptions.ai.first_grade[0],
            second_grade:  trajectoryLearningPathIdOptions.ai.second_grade[0],
            third_grade: trajectoryLearningPathIdOptions.ai.third_grade[0],
        },
        pc: {
            first_grade: trajectoryLearningPathIdOptions.pc.first_grade[0],
            second_grade: trajectoryLearningPathIdOptions.pc.second_grade[0],
            third_grade: trajectoryLearningPathIdOptions.pc.third_grade[0],
        }
    }
    let trajectoryItemViews = {
        ai: {
            first_grade: document.querySelector(".one_ai"),
            second_grade: document.querySelector(".two_ai"),
            third_grade: document.querySelector(".three_ai"),
        },
        pc: {
            first_grade: document.querySelector(".one_pc"),
            second_grade: document.querySelector(".two_pc"),
            third_grade: document.querySelector(".three_pc"),
        }
    
    }
    let setCurrentTrajectorySelection = (grade, trajectory, content) => {
        currentTrajectorySelection[trajectory][grade] = content;
    }

    let openTrajectoryDetailsInNewTab = (trajectorySelection) => {
        // Remove description and image from each item in each trajectory in the selection
        let reducedTrajectorySelection = JSON.parse(trajectorySelection);
        for (let trajectory in reducedTrajectorySelection) {
            for (let grade in reducedTrajectorySelection[trajectory]) {
                reducedTrajectorySelection[trajectory][grade].description = "";
                reducedTrajectorySelection[trajectory][grade].image = "";
            }
        }

        window.location = `${lang == "nl" ? "" : "/" + lang}/trajectory?trajectory=${JSON.stringify(reducedTrajectorySelection)}`;
    }

    let updateTrajectoryViews = () => {
        for (let trajectory in trajectoryItemViews) {
            for (let grade in trajectoryItemViews[trajectory]) {
                let trajectoryItemView = trajectoryItemViews[trajectory][grade];
                let trajectoryItem = currentTrajectorySelection[trajectory][grade];
                trajectoryItemView.querySelector(".title").innerText = trajectoryItem.title;
                trajectoryItemView.querySelector(".image").src = trajectoryItem.image;

                let singleItemInTrajectory = {}
                singleItemInTrajectory[trajectory] = {}
                singleItemInTrajectory[trajectory][grade] = trajectoryItem;
                trajectoryItemView.querySelector(".image").addEventListener("click", () => {
                    openTrajectoryDetailsInNewTab(JSON.stringify(singleItemInTrajectory))
                });


                trajectoryItemView.querySelector(".choose_alternative").addEventListener("click", () => {
                    let dialog = document.querySelector("#customize_selection_dialog");
                    let alternatives = dialog.querySelector(".alternatives");
                    alternatives.innerHTML = "";
                    trajectoryLearningPathIdOptions[trajectory][grade].forEach((alternative) => {
                        let alternativeView = document.createElement("div");
                        alternativeView.classList.add("alternative");
                        alternativeView.innerHTML = `
                            <img src="${alternative.image}" class="image"/>
                            <div class="alternative_content">
                                <h2 class="title">${alternative.title}</h2>
                                <div class="description">${alternative.description}</div>
                            </div>
                        `;

                        alternativeView.addEventListener("click", () => {
                            setCurrentTrajectorySelection(grade, trajectory, alternative);
                            updateTrajectoryViews();
                            dialog.close()
                        });
                        alternatives.appendChild(alternativeView);
                    });
                    dialog.showModal();
                });
            }
        }
    }
    updateTrajectoryViews();
    document.querySelector(".my_personal_trajectory").addEventListener("click", () => {
        openTrajectoryDetailsInNewTab(JSON.stringify(currentTrajectorySelection));
    });
})();