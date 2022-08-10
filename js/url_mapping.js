// Maps url name to hruid in the database
// To make a new direct link to a learing path you should:
// 1) add a new markdown document for the page (see wegostem.md)
// 2) In that file you specify the permalink and include the learning path html
// 3) Add the permalink text in the object below and specify the hruid and available languages
let urlToHruidMapping = {
    wegostem_old: {
        hruid: "WeGoSTEM-v1",
        languages: ["nl", "fr"],
        default_language: "nl"
    },
    sociale_robot: {
        hruid: "SR_Algemeen-v1",
        languages: ["nl"],
        default_language: "nl"
    },
    socialerobot: {
        hruid: "SR_Algemeen-v1",
        languages: ["nl"],
        default_language: "nl"
    },
    socialrobot_old: {
        hruid: "SR_Algemeen-v1",
        languages: ["nl"],
        default_language: "nl"
    },
    socialerobot0: {
        hruid: "SR_Algemeen-v1",
        languages: ["nl"],
        default_language: "nl"
    },
    socialerobot1: {
        hruid: "SR_Module1-v1",
        languages: ["nl"],
        default_language: "nl"
    },
    socialerobot2: {
        hruid: "SR_Module2-v1",
        languages: ["nl"],
        default_language: "nl"
    },
    socialerobot2oefeningen: {
        hruid: "SR_Module22-v1",
        languages: ["nl"],
        default_language: "nl"
    },
    socialerobot3: {
        hruid: "SR_Module3-v1",
        languages: ["nl"],
        default_language: "nl"
    },
    socialerobot4: {
        hruid: "SR_Module4-v1",
        languages: ["nl"],
        default_language: "nl"
    },
    starttodwenguino: {
        hruid: "StartToDwenguino-v1",
        languages: ["nl"],
        default_language: "nl"
    }
}
