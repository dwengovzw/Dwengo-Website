// Maps url name to hruid in the database
// To make a new direct link to a learing path you should:
// 1) add a new markdown document for the page (see wegostem.md)
// 2) In that file you specify the permalink and include the learning path html
// 3) Add the permalink text in the object below and specify the hruid and available languages
let urlToHruidMapping = {
    socialrobot_old: {
        hruid: "agri_landbouw",
        languages: ["nl"],
        default_language: "nl"
    },
    socialerobot0: {
        hruid: "agri_lopendeband",
        languages: ["nl"],
        default_language: "nl"
    },
    socialerobot1: {
        hruid: "aiz1_zorg",
        languages: ["nl"],
        default_language: "nl"
    },
    socialerobot2: {
        hruid: "aiz2_grafen",
        languages: ["nl"],
        default_language: "nl"
    },
    socialerobot2oefeningen: {
        hruid: "aiz3_unplugged",
        languages: ["nl"],
        default_language: "nl"
    },
    socialerobot3: {
        hruid: "aiz4_eindtermen",
        languages: ["nl"],
        default_language: "nl"
    },
    socialerobot4: {
        hruid: "jommeke-vooroordelen-van-ai",
        languages: ["nl"],
        default_language: "nl"
    },
    starttodwenguino: {
        hruid: "art_turtle",
        languages: ["nl"],
        default_language: "nl"
    },
    starttodwenguino: {
        hruid: "cb1_chatbot",
        languages: ["nl"],
        default_language: "nl"
    },
    starttodwenguino: {
        hruid: "cb2_sentimentanalyse",
        languages: ["nl"],
        default_language: "nl"
    },
    socialrobot_old: {
        hruid: "cb3_vervoegmachine",
        languages: ["nl"],
        default_language: "nl"
    },
    socialerobot0: {
        hruid: "cb4_eindtermen",
        languages: ["nl"],
        default_language: "nl"
    },
    socialerobot1: {
        hruid: "ct1_concepten",
        languages: ["nl"],
        default_language: "nl"
    },
    socialerobot2: {
        hruid: "ct2_concreet",
        languages: ["nl"],
        default_language: "nl"
    },
    socialerobot2oefeningen: {
        hruid: "ct3_voorbeelden",
        languages: ["nl"],
        default_language: "nl"
    },
    socialerobot3: {
        hruid: "ct4_evaluatiekader",
        languages: ["nl"],
        default_language: "nl"
    },
    socialerobot4: {
        hruid: "ct5_kijkwijzer",
        languages: ["nl"],
        default_language: "nl"
    },
    starttodwenguino: {
        hruid: "ct6_cases",
        languages: ["nl"],
        default_language: "nl"
    },
    starttodwenguino: {
        hruid: "ct7_historiek",
        languages: ["nl"],
        default_language: "nl"
    },
    starttodwenguino: {
        hruid: "ct8_eindtermen",
        languages: ["nl"],
        default_language: "nl"
    },
    socialrobot_old: {
        hruid: "kiks1_microscopie",
        languages: ["nl"],
        default_language: "nl"
    },
    socialerobot0: {
        hruid: "kiks2_practicum",
        languages: ["nl"],
        default_language: "nl"
    },
    socialerobot1: {
        hruid: "kiks3_dl_basis",
        languages: ["nl"],
        default_language: "nl"
    },
    socialerobot2: {
        hruid: "kiks4_dl_gevorderd",
        languages: ["nl"],
        default_language: "nl"
    },
    socialerobot2oefeningen: {
        hruid: "kiks5_classificatie",
        languages: ["nl"],
        default_language: "nl"
    },
    socialerobot3: {
        hruid: "kiks6_regressie",
        languages: ["nl"],
        default_language: "nl"
    },
    socialerobot4: {
        hruid: "kiks7_ethiek",
        languages: ["nl"],
        default_language: "nl"
    },
    starttodwenguino: {
        hruid: "kiks8_eindtermen",
        languages: ["nl"],
        default_language: "nl"
    },
    starttodwenguino: {
        hruid: "maths_parabolen",
        languages: ["nl"],
        default_language: "nl"
    },
    starttodwenguino: {
        hruid: "maths_parameters",
        languages: ["nl"],
        default_language: "nl"
    },
    socialrobot_old: {
        hruid: "maths_pythagoras",
        languages: ["nl"],
        default_language: "nl"
    },
    socialerobot0: {
        hruid: "maths_spreidingsdiagrammen",
        languages: ["nl"],
        default_language: "nl"
    },
    socialerobot1: {
        hruid: "maths_rechten",
        languages: ["nl"],
        default_language: "nl"
    },
    socialerobot2: {
        hruid: "maths_lineaireregressie",
        languages: ["nl"],
        default_language: "nl"
    },
    socialerobot2oefeningen: {
        hruid: "maths_epidemie",
        languages: ["nl"],
        default_language: "nl"
    },
    socialerobot3: {
        hruid: "sr_module3",
        languages: ["nl"],
        default_language: "nl"
    },
    socialerobot4: {
        hruid: "sr_module4",
        languages: ["nl"],
        default_language: "nl"
    },
    starttodwenguino: {
        hruid: "maths_logica",
        languages: ["nl"],
        default_language: "nl"
    },
    starttodwenguino: {
        hruid: "maths7_grafen",
        languages: ["nl"],
        default_language: "nl"
    },
    starttodwenguino: {
        hruid: "pc_microcontroller",
        languages: ["nl"],
        default_language: "nl"
    },
    socialrobot_old: {
        hruid: "pc_starttodwenguino",
        languages: ["nl"],
        default_language: "nl"
    },
    socialerobot0: {
        hruid: "pn_datatypes",
        languages: ["nl"],
        default_language: "nl"
    },
    socialerobot1: {
        hruid: "pn_digitalebeelden",
        languages: ["nl"],
        default_language: "nl"
    },
    socialerobot2: {
        hruid: "pn_functies",
        languages: ["nl"],
        default_language: "nl"
    },
    socialerobot2oefeningen: {
        hruid: "pn_peb",
        languages: ["nl"],
        default_language: "nl"
    },
    socialerobot3: {
        hruid: "pn_klimaatverandering",
        languages: ["nl"],
        default_language: "nl"
    },
    socialerobot4: {
        hruid: "pn_operatoren",
        languages: ["nl"],
        default_language: "nl"
    },
    starttodwenguino: {
        hruid: "pn_regressie",
        languages: ["nl"],
        default_language: "nl"
    },
    starttodwenguino: {
        hruid: "pn_structuren",
        languages: ["nl"],
        default_language: "nl"
    },
    starttodwenguino: {
        hruid: "pn_werking",
        languages: ["nl"],
        default_language: "nl"
    },
    socialerobot0: {
        hruid: "sr_algemeen",
        languages: ["nl"],
        default_language: "nl"
    },
    socialerobot1: {
        hruid: "sr_module1",
        languages: ["nl"],
        default_language: "nl"
    },
    socialerobot2: {
        hruid: "sr_module2",
        languages: ["nl"],
        default_language: "nl"
    },
    socialerobot2oefeningen: {
        hruid: "sr_module22",
        languages: ["nl"],
        default_language: "nl"
    },
    socialerobot3: {
        hruid: "sr_module3",
        languages: ["nl"],
        default_language: "nl"
    },
    socialerobot4: {
        hruid: "sr_module4",
        languages: ["nl"],
        default_language: "nl"
    },
    starttodwenguino: {
        hruid: "stem_ipadres",
        languages: ["nl"],
        default_language: "nl"
    },
    starttodwenguino: {
        hruid: "wegostem",
        languages: ["fr"],
        default_language: "nl"
    },
    starttodwenguino: {
        hruid: "wegostem",
        languages: ["nl"],
        default_language: "nl"
    }
}
