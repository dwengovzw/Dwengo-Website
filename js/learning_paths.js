function visualizeLearningPaths(paths) {
    let dwengoColors = ["#0f5faa", "#0f5d6d", "#115b4e", "#115933", "#3c8227", "#73b51e", "#f9d713", "#f4a72c", "#e87b66"];
    let col = 0;
    document.getElementById("learning_paths").innerHTML = "";

    if (paths.length == 0) {
        document.getElementById("lp_error_message").className = "row d-block";
    } else {
        document.getElementById("lp_error_message").className = "row d-none";

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

}

function loadLearningPaths(filter = "", lang = "") {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let learning_paths = JSON.parse(this.response);
            visualizeLearningPaths(learning_paths);
        }
    };
    xhttp.open("GET", "http://localhost:8085/api/learningPath/search?all=" + filter + "&language=" + lang, true);
    xhttp.send();
}

function loadObjectContent(hruid, language, version) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // Must be with the jquery .html() function! 
            // => This function evaluates the javascript in the <script> tags, normal JS (document.getElementbyId) does not.
            $("#lo_content").html(this.response);
        }
    };
    xhttp.open("GET", `http://localhost:8085/api/learningObject/getContent?hruid=${hruid}&version=${version}&language=${language}`, true);
    xhttp.send();
}

function objectButtonClicked(hruid, language, version, path) {
    document.getElementById("lp_visualisation").childNodes.forEach((item) => {
        item.className = "list-group-item list-group-item-action" + (item.id == "btn_obj_" + hruid + language + version ? " active" : "");
    })
    let node = path.nodes.find((n) => n.learningobject_hruid == hruid && n.language == language && n.version == version)

    if (node.transitions && node.transitions.length > 0) {
        document.getElementById("btn_next_lo").className = "btn btn-outline-primary col m-3"
        document.getElementById("btn_next_lo").onclick = (ev) => {
            let next = node.transitions[0].next
            objectButtonClicked(next.hruid, next.language, next.version, path);
        }
    } else {
        document.getElementById("btn_next_lo").className = "btn btn-outline-primary col m-3 invisible"
    }

    let prev = path.nodes.find((n) => {
        return n.transitions && n.transitions.length > 0 && n.transitions[0].next.hruid == hruid && n.transitions[0].next.language == language && n.transitions[0].next.version == version;
    })
    if (prev) {
        document.getElementById("btn_previous_lo").className = "btn btn-outline-secondary col m-3"
        document.getElementById("btn_previous_lo").onclick = (ev) => {
            objectButtonClicked(prev.learningobject_hruid, prev.language, prev.version, path);
        }
    } else {
        document.getElementById("btn_previous_lo").className = "btn btn-outline-secondary col m-3 invisible"

    }

    loadObjectContent(hruid, language, version);

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
            let next = nodeCopy.transitions[0].next
            objectButtonClicked(next.hruid, next.language, next.version, path);
        }
    } else {
        document.getElementById("btn_next_lo").className += " invisible";
    }


    loadObjectContent(node.learningobject_hruid, node.language, node.version)

    while (counter < path.nodes.length) {
        const next = node.transitions && node.transitions.length > 0 ? nodes.find((n) => n.learningobject_hruid == node.transitions[0].next.hruid && n.version == node.transitions[0].next.version && n.language == node.transitions[0].next.language) : undefined;

        let item = document.createElement("button")
        item.id = "btn_obj_" + node.learningobject_hruid + node.language + node.version
        item.type = "button"
        item.className = "list-group-item list-group-item-action" + (node.start_node ? " active" : "");

        document.getElementById("lp_visualisation").appendChild(item);

        var xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                try {
                    let metadata = JSON.parse(this.response);
                    let item = document.getElementById("btn_obj_" + metadata.hruid + metadata.language + metadata.version);
                    item.innerHTML = metadata.title;
                    item.onclick = (ev) => {
                        objectButtonClicked(metadata.hruid, metadata.language, metadata.version, path);
                    }
                } catch (e) {
                    console.error(this.response);
                }

            }
        };
        xhttp.open("GET", `http://localhost:8085/api/learningObject/getMetadata?hruid=${node.learningobject_hruid}&version=${node.version}&language=${node.language}`, true);
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

function showLanguageSelection() {
    document.getElementById("nav-language-selection").className.replace(" invisible", "");
}

function hideLanguageSelection() {
    document.getElementById("nav-language-selection").className += " invisible";
}

if (document.getElementById("learning_paths")) {

    let filter_input = document.getElementById("filter_input")
    let lang_select = document.getElementById("language_select")
    let languages = { "aa": "Qafaraf", "ab": "Аԥсуа бызшәа", "af": "Afrikaans", "ak": "Akan", "sq": "yângâ tî sängö", "am": "አማርኛ Amârıñâ", "ar": "العَرَبِيَّة al'Arabiyyeẗ", "an": "aragonés", "hy": "Հայերէն Hayerèn", "as": "অসমীয়া", "av": "Магӏарул мацӏ", "ae": "Avestan", "ay": "Aymar aru", "az": "Azərbaycan dili", "ba": "Башҡорт теле", "bm": "ߓߊߡߊߣߊߣߞߊߣ", "eu": "euskara", "be": "Беларуская мова", "bn": "বাংলা Bāŋlā", "bh": "Bihari", "bi": "Bislama", "bs": "bosanski", "br": "Brezhoneg", "bg": "български език", "my": "မြန်မာစာ Mrãmācā", "ca": "català", "ch": "Finu' Chamoru", "ce": "Нохчийн мотт", "zh": "中文 Zhōngwén", "cu": "Славе́нскїй ѧ҆зы́къ", "cv": "Чӑвашла", "kw": "Kernowek", "co": "Corsu", "cr": "Cree", "cs": "čeština", "da": "dansk", "dv": "ދިވެހިބަސް", "nl": "Nederlands", "dz": "རྫོང་ཁ་ Ĵoŋkha", "en": "English", "eo": "Esperanto", "et": "eesti keel", "ee": "Èʋegbe", "fo": "føroyskt", "fj": "Na Vosa Vakaviti", "fi": "suomen kieli", "fr": "français", "fy": "Frysk", "ff": "Fulfulde", "ka": "ქართული Kharthuli", "de": "Deutsch", "gd": "Gàidhlig", "ga": "Gaeilge", "gl": "galego", "gv": "Gaelg", "el": "Νέα Ελληνικά Néa", "gn": "Avañe'ẽ", "gu": "ગુજરાતી Gujarātī", "ht": "kreyòl ayisyen", "ha": "Harshen Hausa", "he": "עברית 'Ivriyþ", "hz": "Otjiherero", "hi": "हिन्दी Hindī", "ho": "Hiri Motu", "hr": "hrvatski", "hu": "magyar nyelv", "ig": "Asụsụ Igbo", "is": "íslenska", "io": "Ido", "ii": "ꆈꌠꉙ Nuosuhxop", "iu": "ᐃᓄᒃᑎᑐᑦ Inuktitut", "ie": "Interlingue", "ia": "	Interlingua", "id": "bahasa Indonesia", "ik": "Iñupiaq", "it": "italiano", "jv": "ꦧꦱꦗꦮ", "ja": "日本語 Nihongo", "kl": "Kalaallisut", "kn": "ಕನ್ನಡ Kannađa", "ks": "कॉशुर / كأشُر", "kr": "Kanuri", "kk": "қазақ тілі qazaq tili", "km": "ភាសាខ្មែរ", "ki": "Gĩkũyũ", "rw": "Ikinyarwanda", "ky": "кыргызча kırgızça", "kv": "Коми кыв", "kg": "Kongo", "ko": "한국어 Han'gug'ô", "kj": "Kuanyama", "ku": "کوردی", "lo": "ພາສາລາວ Phasalaw", "la": "Lingua latīna", "lv": "Latviešu valoda", "li": "Lèmburgs", "ln": "Lingala", "lt": "lietuvių kalba", "lb": "Lëtzebuergesch", "lu": "Kiluba", "lg": "Luganda", "mk": "македонски јазик", "mh": "Kajin M̧ajeļ", "ml": "മലയാളം Malayāļã", "mi": "Te Reo Māori", "mr": "मराठी Marāţhī", "ms": "Bahasa Melayu", "mg": "Malagasy", "mt": "Malti", "mn": "монгол хэл", "na": "dorerin Naoero", "nv": "Diné bizaad", "nr": "isiNdebele seSewula", "nd": "siNdebele saseNyakatho", "ng": "ndonga", "ne": "नेपाली भाषा", "nn": "norsk nynorsk", "nb": "norsk bokmål", "no": "norsk", "ny": "Chichewa", "oc": "occitan", "oj": "Ojibwa", "or": "ଓଡ଼ିଆ", "om": "Afaan Oromoo", "os": "Ирон æвзаг", "pa": "ਪੰਜਾਬੀ", "fa": "فارسی", "pi": "Pāli", "pl": "polski", "pt": "português", "ps": "پښتو", "qu": "Runa simi", "rm": "Rumantsch", "ro": "limba română", "rn": "Ikirundi", "ru": "русский язык", "sg": "yângâ tî sängö", "sa": "संस्कृतम्", "si": "සිංහල", "sk": "slovenčina", "sl": "slovenski jezik", "se": "davvisámegiella", "sm": "Gagana faʻa Sāmoa", "sn": "chiShona", "sd": "سنڌي", "so": "af Soomaali", "st": "Sesotho", "es": "español", "sc": "sardu", "sr": "српски", "ss": "siSwati", "su": "ᮘᮞ ᮞᮥᮔ᮪ᮓ", "sw": "Kiswahili", "sv": "svenska", "ty": "Reo Tahiti", "ta": "தமிழ்", "tt": "татар теле", "te": "తెలుగు", "tg": "тоҷикӣ", "tl": "Wikang Tagalog", "th": "ภาษาไทย", "bo": "བོད་སྐད་", "ti": "ትግርኛ", "to": "lea faka-Tonga", "tn": "Setswana", "ts": "Xitsonga", "tk": "Türkmençe", "tr": "Türkçe", "tw": "Twi", "ug": "ئۇيغۇر تىلى", "uk": "Українська мова", "ur": "اُردُو", "uz": "Oʻzbekcha", "ve": "Tshivenḓa", "vi": "Tiếng Việt", "vo": "Volapük", "cy": "Cymraeg", "wa": "Walon", "wo": "Wolof", "xh": "isiXhosa", "yi": "אידיש", "yo": "èdè Yorùbá", "za": "話僮", "zu": "isiZulu" };

    Object.entries(languages).forEach(([key, value]) => {
        let option = document.createElement("option")
        if (document.querySelector("html").lang == key) {
            option.selected = true;
        }
        option.value = key;
        option.text = value;
        lang_select.appendChild(option);
    });

    filter_input.onchange = (ev) => {
        loadLearningPaths(ev.target.value, lang_select.value)
    }

    lang_select.onchange = (ev) => {
        loadLearningPaths(filter_input.value, ev.target.value)
    }

    showLanguageSelection();
    loadLearningPaths("", document.querySelector("html").lang);
} else if (document.getElementById("learning_path")) {
    hideLanguageSelection();
    loadLearningPath();
} else {
    showLanguageSelection();
}