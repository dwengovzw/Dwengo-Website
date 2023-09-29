// Maps url name to hruid in the database
// To make a new direct link to a learing path you should:
// 1) add a new markdown document for the page (see wegostem.md)
// 2) In that file you specify the permalink and include the learning path html
// 3) Add the permalink text in the object below and specify the hruid and available languages
let urlToHruidMapping = {
    agri_deeplearning: {
        hruid: "agri_landbouw",
        languages: ["nl"],
        default_language: "nl"
    },
    agri_lopendeband: {
        hruid: "agri_lopendeband",
        languages: ["nl"],
        default_language: "nl"
    },
    aiz1_zorg: {
        hruid: "aiz1_zorg",
        languages: ["nl"],
        default_language: "nl"
    },
    aiz2_grafen: {
        hruid: "aiz2_grafen",
        languages: ["nl"],
        default_language: "nl"
    },
    aiz3_unplugged: {
        hruid: "aiz3_unplugged",
        languages: ["nl"],
        default_language: "nl"
    },
    aiz4_eindtermen: {
        hruid: "aiz4_eindtermen",
        languages: ["nl"],
        default_language: "nl"
    },
    art_jommeke: {
        hruid: "art_jommeke",
        languages: ["nl"],
        default_language: "nl"
    },
    art_turtle: {
        hruid: "art_turtle",
        languages: ["nl"],
        default_language: "nl"
    },
    cb1_chatbot: {
        hruid: "cb1_chatbot",
        languages: ["nl"],
        default_language: "nl"
    },
    cb2_sentimentanalyse: {
        hruid: "cb2_sentimentanalyse",
        languages: ["nl"],
        default_language: "nl"
    },
    cb3_vervoegmachine: {
        hruid: "cb3_vervoegmachine",
        languages: ["nl"],
        default_language: "nl"
    },
    cb4_eindtermen: {
        hruid: "cb4_eindtermen",
        languages: ["nl"],
        default_language: "nl"
    },
    ct1_concepten: {
        hruid: "ct1_concepten",
        languages: ["nl"],
        default_language: "nl"
    },
    ct2_concreet: {
        hruid: "ct2_concreet",
        languages: ["nl"],
        default_language: "nl"
    },
    ct3_voorbeelden: {
        hruid: "ct3_voorbeelden",
        languages: ["nl"],
        default_language: "nl"
    },
    ct4_evaluatiekader: {
        hruid: "ct4_evaluatiekader",
        languages: ["nl"],
        default_language: "nl"
    },
    ct5_kijkwijzer: {
        hruid: "ct5_kijkwijzer",
        languages: ["nl"],
        default_language: "nl"
    },
    ct6_cases: {
        hruid: "ct6_cases",
        languages: ["nl"],
        default_language: "nl"
    },
    ct7_historiek: {
        hruid: "ct7_historiek",
        languages: ["nl"],
        default_language: "nl"
    },
    ct8_eindtermen: {
        hruid: "ct8_eindtermen",
        languages: ["nl"],
        default_language: "nl"
    },
    kiks1_microscopie: {
        hruid: "kiks1_microscopie",
        languages: ["nl"],
        default_language: "nl"
    },
    kiks2_practicum: {
        hruid: "kiks2_practicum",
        languages: ["nl"],
        default_language: "nl"
    },
    kiks3_dl_basis: {
        hruid: "kiks3_dl_basis",
        languages: ["nl"],
        default_language: "nl"
    },
    kiks4_dl_gevorderd: {
        hruid: "kiks4_dl_gevorderd",
        languages: ["nl"],
        default_language: "nl"
    },
    kiks5_classificatie: {
        hruid: "kiks5_classificatie",
        languages: ["nl"],
        default_language: "nl"
    },
    kiks6_regressie: {
        hruid: "kiks6_regressie",
        languages: ["nl"],
        default_language: "nl"
    },
    kiks7_ethiek: {
        hruid: "kiks7_ethiek",
        languages: ["nl"],
        default_language: "nl"
    },
    kiks8_eindtermen: {
        hruid: "kiks8_eindtermen",
        languages: ["nl"],
        default_language: "nl"
    },
    maths_parabolen: {
        hruid: "maths_parabolen",
        languages: ["nl"],
        default_language: "nl"
    },
    maths_parameters: {
        hruid: "maths_parameters",
        languages: ["nl"],
        default_language: "nl"
    },
    maths1_pythagoras: {
        hruid: "maths_pythagoras",
        languages: ["nl"],
        default_language: "nl"
    },
    maths2_spreidingsdiagrammen: {
        hruid: "maths_spreidingsdiagrammen",
        languages: ["nl"],
        default_language: "nl"
    },
    maths3_rechten: {
        hruid: "maths_rechten",
        languages: ["nl"],
        default_language: "nl"
    },
    maths4_linreg: {
        hruid: "maths_lineaireregressie",
        languages: ["nl"],
        default_language: "nl"
    },
    maths5_epidemie: {
        hruid: "maths_epidemie",
        languages: ["nl"],
        default_language: "nl"
    },
    maths_logica: {
        hruid: "maths_logica",
        languages: ["nl"],
        default_language: "nl"
    },
    maths7_grafen: {
        hruid: "maths7_grafen",
        languages: ["nl"],
        default_language: "nl"
    },
    pc_microcontroller: {
        hruid: "pc_microcontroller",
        languages: ["nl"],
        default_language: "nl"
    },
    pc_starttodwenguino: {
        hruid: "pc_starttodwenguino",
        languages: ["nl"],
        default_language: "nl"
    },
    pn_datatypes: {
        hruid: "pn_datatypes",
        languages: ["nl"],
        default_language: "nl"
    },
    pn_digitalebeelden: {
        hruid: "pn_digitalebeelden",
        languages: ["nl"],
        default_language: "nl"
    },
    pn_functies: {
        hruid: "pn_functies",
        languages: ["nl"],
        default_language: "nl"
    },
    pn_functiesblockly: {
        hruid: "pn_peb",
        languages: ["nl"],
        default_language: "nl"
    },
    pn_klimaat: {
        hruid: "pn_klimaatverandering",
        languages: ["nl"],
        default_language: "nl"
    },
    pn_operatoren: {
        hruid: "pn_operatoren",
        languages: ["nl"],
        default_language: "nl"
    },
    pn_regressie: {
        hruid: "pn_regressie",
        languages: ["nl"],
        default_language: "nl"
    },
    pn_structuren: {
        hruid: "pn_structuren",
        languages: ["nl"],
        default_language: "nl"
    },
    pn_werking: {
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
    stem_ipadres: {
        hruid: "stem_ipadres",
        languages: ["nl"],
        default_language: "nl"
    },
    wgs_fr: {
        hruid: "wegostem",
        languages: ["fr"],
        default_language: "nl"
    },
    wgs_nl: {
        hruid: "wegostem",
        languages: ["nl"],
        default_language: "nl"
    },
    un_artificiele_intelligentie: {
        hruid: "un_artificiele_intelligentie",
        languages: ["nl"],
        default_language: "nl"
    },
    lift: {
        hruid: "un_elevator_riddle",
        languages: ["nl"],
        default_language: "nl"
    }
}
