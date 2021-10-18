let api_base_path = window.location.origin + "/backend" // For deploy
//let api_base_path = "http://localhost:8085"   // For debug


let allLanguages = { "aa": "Qafaraf", "ab": "Аԥсуа бызшәа", "af": "Afrikaans", "ak": "Akan", "sq": "yângâ tî sängö", "am": "አማርኛ Amârıñâ", "ar": "العَرَبِيَّة al'Arabiyyeẗ", "an": "aragonés", "hy": "Հայերէն Hayerèn", "as": "অসমীয়া", "av": "Магӏарул мацӏ", "ae": "Avestan", "ay": "Aymar aru", "az": "Azərbaycan dili", "ba": "Башҡорт теле", "bm": "ߓߊߡߊߣߊߣߞߊߣ", "eu": "euskara", "be": "Беларуская мова", "bn": "বাংলা Bāŋlā", "bh": "Bihari", "bi": "Bislama", "bs": "bosanski", "br": "Brezhoneg", "bg": "български език", "my": "မြန်မာစာ Mrãmācā", "ca": "català", "ch": "Finu' Chamoru", "ce": "Нохчийн мотт", "zh": "中文 Zhōngwén", "cu": "Славе́нскїй ѧ҆зы́къ", "cv": "Чӑвашла", "kw": "Kernowek", "co": "Corsu", "cr": "Cree", "cs": "čeština", "da": "dansk", "dv": "ދިވެހިބަސް", "nl": "Nederlands", "dz": "རྫོང་ཁ་ Ĵoŋkha", "en": "English", "eo": "Esperanto", "et": "eesti keel", "ee": "Èʋegbe", "fo": "føroyskt", "fj": "Na Vosa Vakaviti", "fi": "suomen kieli", "fr": "français", "fy": "Frysk", "ff": "Fulfulde", "ka": "ქართული Kharthuli", "de": "Deutsch", "gd": "Gàidhlig", "ga": "Gaeilge", "gl": "galego", "gv": "Gaelg", "el": "Νέα Ελληνικά Néa", "gn": "Avañe'ẽ", "gu": "ગુજરાતી Gujarātī", "ht": "kreyòl ayisyen", "ha": "Harshen Hausa", "he": "עברית 'Ivriyþ", "hz": "Otjiherero", "hi": "हिन्दी Hindī", "ho": "Hiri Motu", "hr": "hrvatski", "hu": "magyar nyelv", "ig": "Asụsụ Igbo", "is": "íslenska", "io": "Ido", "ii": "ꆈꌠꉙ Nuosuhxop", "iu": "ᐃᓄᒃᑎᑐᑦ Inuktitut", "ie": "Interlingue", "ia": "	Interlingua", "id": "bahasa Indonesia", "ik": "Iñupiaq", "it": "italiano", "jv": "ꦧꦱꦗꦮ", "ja": "日本語 Nihongo", "kl": "Kalaallisut", "kn": "ಕನ್ನಡ Kannađa", "ks": "कॉशुर / كأشُر", "kr": "Kanuri", "kk": "қазақ тілі qazaq tili", "km": "ភាសាខ្មែរ", "ki": "Gĩkũyũ", "rw": "Ikinyarwanda", "ky": "кыргызча kırgızça", "kv": "Коми кыв", "kg": "Kongo", "ko": "한국어 Han'gug'ô", "kj": "Kuanyama", "ku": "کوردی", "lo": "ພາສາລາວ Phasalaw", "la": "Lingua latīna", "lv": "Latviešu valoda", "li": "Lèmburgs", "ln": "Lingala", "lt": "lietuvių kalba", "lb": "Lëtzebuergesch", "lu": "Kiluba", "lg": "Luganda", "mk": "македонски јазик", "mh": "Kajin M̧ajeļ", "ml": "മലയാളം Malayāļã", "mi": "Te Reo Māori", "mr": "मराठी Marāţhī", "ms": "Bahasa Melayu", "mg": "Malagasy", "mt": "Malti", "mn": "монгол хэл", "na": "dorerin Naoero", "nv": "Diné bizaad", "nr": "isiNdebele seSewula", "nd": "siNdebele saseNyakatho", "ng": "ndonga", "ne": "नेपाली भाषा", "nn": "norsk nynorsk", "nb": "norsk bokmål", "no": "norsk", "ny": "Chichewa", "oc": "occitan", "oj": "Ojibwa", "or": "ଓଡ଼ିଆ", "om": "Afaan Oromoo", "os": "Ирон æвзаг", "pa": "ਪੰਜਾਬੀ", "fa": "فارسی", "pi": "Pāli", "pl": "polski", "pt": "português", "ps": "پښتو", "qu": "Runa simi", "rm": "Rumantsch", "ro": "limba română", "rn": "Ikirundi", "ru": "русский язык", "sg": "yângâ tî sängö", "sa": "संस्कृतम्", "si": "සිංහල", "sk": "slovenčina", "sl": "slovenski jezik", "se": "davvisámegiella", "sm": "Gagana faʻa Sāmoa", "sn": "chiShona", "sd": "سنڌي", "so": "af Soomaali", "st": "Sesotho", "es": "español", "sc": "sardu", "sr": "српски", "ss": "siSwati", "su": "ᮘᮞ ᮞᮥᮔ᮪ᮓ", "sw": "Kiswahili", "sv": "svenska", "ty": "Reo Tahiti", "ta": "தமிழ்", "tt": "татар теле", "te": "తెలుగు", "tg": "тоҷикӣ", "tl": "Wikang Tagalog", "th": "ภาษาไทย", "bo": "བོད་སྐད་", "ti": "ትግርኛ", "to": "lea faka-Tonga", "tn": "Setswana", "ts": "Xitsonga", "tk": "Türkmençe", "tr": "Türkçe", "tw": "Twi", "ug": "ئۇيغۇر تىلى", "uk": "Українська мова", "ur": "اُردُو", "uz": "Oʻzbekcha", "ve": "Tshivenḓa", "vi": "Tiếng Việt", "vo": "Volapük", "cy": "Cymraeg", "wa": "Walon", "wo": "Wolof", "xh": "isiXhosa", "yi": "אידיש", "yo": "èdè Yorùbá", "za": "話僮", "zu": "isiZulu" };
let siteLanguages = ["nl", "en", "fr", "de"]

/**
 * visualises all learning paths (on home screen), currently alphabetically ordered by title
 * @param {array} paths array of learning-paths
 */
function visualizeLearningPaths(paths) {
    hideLoadingMessage();
    let dwengoColors = ["#0f5faa", "#0f5d6d", "#115b4e", "#115933", "#3c8227", "#73b51e", "#f9d713", "#f4a72c", "#e87b66"];
    let col = 0;
    document.getElementById("learning_paths").innerHTML = "";

    if (paths.length == 0) {
        document.getElementById("lp_error_message").className = "row d-block";
    } else {
        document.getElementById("lp_error_message").className = "row d-none";

        sortResults(paths, 'title', true);
        paths.forEach(path => {
            let div = document.createElement("div");
            div.className = "col-lg-3 col-md-4 col-sm-6 col-xs-12 py-3";
            let a = document.createElement("a");
            a.href = `learning-path.html?id=${path._id}`
            a.style.textDecoration = "none"

            let card = document.createElement("div");
            card.className = "card h-100 position-relative";

            let img = document.createElement("img");
            img.className = "card-img-top"
            img.src = "data:image/jpeg;base64, " + path.image;
            img.style.filter = "grayscale(100%)";

            let cardBodyContainer = document.createElement("div");
            cardBodyContainer.className = "card-body-container"

            let info = document.createElement("div");
            info.className = "card-body"
            info.style.backgroundColor = dwengoColors[col];
            info.style.color = "white";

            let age_range_container = document.createElement("span");
            age_range_container.className = "age_group_label"
            let age_range = document.createElement("span");
            let icon = document.createElement("img");
            icon.className = "age_range_icon"
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
            document.getElementById("learning_paths").appendChild(div);

            col = (col + 1) % dwengoColors.length;
        });
    }
}

/**
 * Gets metadata of a learning object
 * @param {*} hruid 
 * @param {*} language 
 * @param {*} version 
 * @param {*} callback(metadata)
 */
function getObjectMetadata(hruid, language, version, success, failure){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // Must be with the jquery .html() function! 
            // => This function evaluates the javascript in the <script> tags, normal JS (document.getElementbyId) does not.
            success(JSON.parse(this.response));
        } else {
            failure("Failed to request learning object.")
        }
    };
    xhttp.open("GET", `${api_base_path}/api/learningObject/getMetadata?hruid=${hruid}&version=${version}&language=${language}`, true);
    xhttp.send();
}

function sortResults(my_array, prop, asc) {
    my_array.sort(function(a, b) {
        if (asc) {
            return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
        } else {
            return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
        }
    });
    return my_array;
}

/**
 * requests all learning-paths based on filter and language from backend
 * @param {string} filter 
 * @param {string} lang language
 */
function loadLearningPaths(filter = "", lang = "", min_age = 0, max_age = 25) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let learning_paths = JSON.parse(this.response);
            visualizeLearningPaths(learning_paths);
        }
    };
    xhttp.open("GET", api_base_path + "/api/learningPath/search?all=" + filter + "&language=" + lang + "&min_age=" + min_age + "&max_age=" + max_age, true);
    xhttp.send();
}

/**
 * requests content learning-object based on hruid, language and version from backend
 * @param {string} hruid 
 * @param {string} language 
 * @param {integer} version 
 */
function loadObjectContent(hruid, language, version) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // Must be with the jquery .html() function! 
            // => This function evaluates the javascript in the <script> tags, normal JS (document.getElementbyId) does not.
            $("#lo_content").html(this.response);
        }
    };
    xhttp.open("GET", `${api_base_path}/api/learningObject/getRaw?hruid=${hruid}&version=${version}&language=${language}`, true);
    xhttp.send();
}

/**
 * fires when next/previous-button or button for specific object is clicked
 * makes sure the new content is shown and the buttons are updated
 * @param {string} hruid 
 * @param {string} language 
 * @param {string} version 
 * @param {object} path learning-path
 */
function objectButtonClicked(hruid, language, version, path) {
    scrollToTop();
    document.getElementById("lp_visualisation").childNodes.forEach((item) => {
        //item.className = "list-group-item list-group-item-action" + (item.id == "btn_obj_" + hruid + language + version ? " active" : "");
        // remove active classname
        item.classList.remove("active")  
    })
    // Add back active class to clicked item
    document.getElementById("btn_group_obj_" + hruid + language + version).classList.add("active");
    let node = path.nodes.find((n) => n.learningobject_hruid == hruid && n.language == language && n.version == version);

    if (node.transitions && node.transitions.length > 0) {
        document.getElementById("btn_next_lo").style.display = "inline-block";
        document.getElementById("btn_to_lp").style.display = "none";
        document.getElementById("btn_next_lo").className = "btn btn-outline-primary col m-3";
        document.getElementById("btn_next_lo").onclick = (ev) => {
            let next = node.transitions[0].next;
            objectButtonClicked(next.hruid, next.language, next.version, path);
        }
    } else {
        document.getElementById("btn_next_lo").style.display = "none";
        document.getElementById("btn_to_lp").style.display = "inline-block";
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

    window.location.hash = `${hruid};${language};${version}`;   // Add anchor to the page url to identify this step in the learning path
    loadObjectContent(hruid, language, version);

}

/**
 * Thanks to https://stackoverflow.com/a/50200383/13057688
 */
async function printDiv(path, mywindow) {  
    mywindow.document.write(`<html><head><title>${path.title}</title>`);
    mywindow.document.write(`<link rel="stylesheet" href="/assets/main.css">`);
    mywindow.document.write(`<link rel="shortcut icon" type="image/png" href="/images/favicon.ico"></link>`);
    mywindow.document.write(`<link rel="stylesheet" href="/css/bootstrap/bootstrap.min.css"">`);
    mywindow.document.write('</head><body>');
    
    let stub_wrapper = $("<div>");
    let containerdiv = $("<div>").attr("class", "wrapper")

    let nav = $(`<nav class="navbar navbar-expand-md navbar-light bg-light">
    <a class ="navbar-brand" href="https://dwengo.org/">
      <img id="dwengo_logo" src="/images/logos/dwengo-groen-zwart.svg" alt="Dwengo Logo" title="Dwengo">
    </a>
  </nav>`)

    containerdiv.append(nav);

    let nodes = path.nodes.slice();
    for (const node of nodes){
        let section = $('<section></section>').attr("class", "lp-section mt-5 mb-5");
        let sectionhtml = await loadRawContent(node.learningobject_hruid, node.language, node.version);
        section.html(sectionhtml)
        containerdiv.append(section)
    }

    stub_wrapper.append(containerdiv);
    mywindow.document.write(stub_wrapper.html());

    mywindow.document.write('</body></html>');
  
    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/
  
    mywindow.print();
    //mywindow.close();
  
    return true;
  }

/**
 * requests content learning-object based on hruid, language and version from backend
 * @param {string} hruid 
 * @param {string} language 
 * @param {integer} version 
 */
 function loadRawContent(hruid, language, version) {
    return new Promise((resolve, reject) => {
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", `${api_base_path}/api/learningObject/getRaw?hruid=${hruid}&version=${version}&language=${language}`, false);
        xhttp.send();
        if (xhttp.status == 200){
            console.log(xhttp.responseText);
            resolve(xhttp.responseText)
        }
        reject("error loading content")
    })
    
}

/*function loadRawContent(hruid, language, version){
    //return new Promise((reject, resolve) => {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                // Must be with the jquery .html() function! 
                // => This function evaluates the javascript in the <script> tags, normal JS (document.getElementbyId) does not.
                //resolve(this.response)
            } else {
                //reject("an error occured loading content from server")
            }
        };
        xhttp.open("GET", `${api_base_path}/api/learningObject/getRaw?hruid=${hruid}&version=${version}&language=${language}`, true);
        xhttp.send();
    //})
    
}

/**
 * visualizes the learning path by adding buttons for all learning-objects in the correct order
 * and displaying the first object
 * @param {object} path learing-path
 */
function visualizeLearningPath(path) {
    $('#lo_content').empty();
    document.querySelectorAll('.lp_title').forEach((element) => {
        element.innerHTML = path.title;
    })
    let nodes = path.nodes.slice();
    let counter = 0;
    let node = nodes.find((n) => n.start_node);

    /**
     * Print learning path handler
     */
    let entirePath = Object.assign(path);
    document.getElementById("print_lp").onclick = (ev) => {
        let mywindow = window.open('', 'PRINT', 'height=650,width=900,top=100,left=150');
        printDiv(entirePath, mywindow);
    }


    /**
     *  Display previous and next buttons
     */
    if (node.transitions && node.transitions.length > 0) {
        let nodeCopy = Object.assign(node);
        document.getElementById("btn_next_lo").onclick = (ev) => {
            let next = nodeCopy.transitions[0].next;
            objectButtonClicked(next.hruid, next.language, next.version, path);
        }
    } else {
        document.getElementById("btn_next_lo").style.display += " none";
        document.getElementById("btn_to_lp").style.display = "inline-block";
    }

    /** 
     * Load content of the first learning object
     */
    loadObjectContent(node.learningobject_hruid, node.language, node.version)

    

    /**
     * Display list of learning objects in this learning path on the left side of the page
     */
     let loaded_counter = path.nodes.length;
    while (counter < path.nodes.length) {
        const next = node.transitions && node.transitions.length > 0 ? nodes.find((n) => n.learningobject_hruid == node.transitions[0].next.hruid && n.version == node.transitions[0].next.version && n.language == node.transitions[0].next.language) : undefined;

        let btnGroup = document.createElement("div");
        btnGroup.id = "btn_group_obj_" + node.learningobject_hruid + node.language + node.version;
        btnGroup.className = "lo-button btn-group list-group-item list-group-item-action d-flex justify-content-between align-items-center "  + (node.start_node ? " active" : "");
        btnGroup.role = "group";

        let btn1 = document.createElement("span");
        btn1.id = "btn_obj_" + node.learningobject_hruid + node.language + node.version
        btn1.type = "button"

        let btn2 = document.createElement("span");
        btn2.id = "btn_obj_time_" + node.learningobject_hruid + node.language + node.version
        btn2.type = "button"
        btn2.className = "text-right"; // + (node.start_node ? " active" : "");

        document.getElementById("lp_visualisation").appendChild(btnGroup);
        document.getElementById("btn_group_obj_" + node.learningobject_hruid + node.language + node.version).appendChild(btn1);
        document.getElementById("btn_group_obj_" + node.learningobject_hruid + node.language + node.version).appendChild(btn2);

        var xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                try {
                    loaded_counter--;
                    let metadata = JSON.parse(this.response);
                    let btnGroup = document.getElementById("btn_group_obj_" + metadata.hruid + metadata.language + metadata.version);
                    // Add class to item if teacher only
                    if (metadata.teacher_exclusive){
                        btnGroup.classList.add('teacher_exclusive')
                    }
                    btnGroup.onclick = (ev) => {
                        objectButtonClicked(metadata.hruid, metadata.language, metadata.version, path);
                    }

                    let item = document.getElementById("btn_obj_" + metadata.hruid + metadata.language + metadata.version);
                    item.innerHTML = `${metadata.title}`

                    let timeLabel = document.getElementById("btn_obj_time_" + metadata.hruid + metadata.language + metadata.version);
                    // Add class to item if teacher only
                    if (metadata.teacher_exclusive){
                        timeLabel.classList.add('teacher_exclusive')
                    }
                    timeLabel.innerHTML = `${metadata.estimated_time}\'`;

                    // All noded are loaded
                    if (loaded_counter == 0){
                        // Select learning object based on hash in the url
                        let hash = window.location.hash;
                        if (hash) {
                            let [hruid_hash, language_hash, version_hash] = hash.slice(1).split(";");
                            objectButtonClicked(hruid_hash, language_hash, version_hash, path)
                        }
                    }
                    
                } catch (e) {
                    console.error(this.response);
                }

            }
        };
        xhttp.open("GET", `${api_base_path}/api/learningObject/getMetadata?hruid=${node.learningobject_hruid}&version=${node.version}&language=${node.language}`, true);
        xhttp.send();
        const index = nodes.indexOf(node);
        if (index > -1) {
            nodes.splice(index, 1);
        }
        node = next ? next : nodes[0];
        counter++;
    }

    
    

}

/**
 * Display the entire learning path on the page for printing purposes and open the printing console.
 * @param {object} path 
 */
function displayLearningPathForPrint(path){
    $("#lo_content").empty();

    document.getElementById("lp_visualisation").childNodes.forEach((item) => {
        //item.className = "list-group-item list-group-item-action" + (item.id == "btn_obj_" + hruid + language + version ? " active" : "");
        // remove active classname
        item.classList.remove("active")  
    })

    let nodes = path.nodes.slice();
    let node = nodes.find((n) => n.start_node);
    let next = null;

    $("#lo_content").append('<section id="section_'+node.learningobject_hruid+node.language+node.version+'" class="lp-section mt-5 mb-5"></section>');
    
    if(node.transitions && node.transitions.length > 0){
        displayLearningObjectForPrint(node.learningobject_hruid, node.language, node.version, false);
    } else {
        displayLearningObjectForPrint(node.learningobject_hruid, node.language, node.version, true);
    }

    while (node.transitions && node.transitions.length > 0) {
        next = node.transitions[0].next;
        node = path.nodes.find((n) => n.learningobject_hruid == next.hruid && n.language == next.language && n.version == next.version);
        $("#lo_content").append('<section id="section_'+next.hruid+next.language+next.version+'" class="lp-section mt-5 mb-5"></section>');
        if(node.transitions && node.transitions.length > 0){
            displayLearningObjectForPrint(next.hruid, next.language, next.version, false);
        } else {
            displayLearningObjectForPrint(next.hruid, next.language, next.version, true);
        }
        
    }

    
}


/**
 * Append the learning object to the current display learning path for printing view. If this is the last learning object
 * to append, print will be true and indicates that the printing console should open
 * @param {string} hruid 
 * @param {string} language 
 * @param {string} version 
 * @param {boolean} print 
 */
function displayLearningObjectForPrint(hruid, language, version, print, section){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // Must be with the jquery .html() function! 
            // => This function evaluates the javascript in the <script> tags, normal JS (document.getElementbyId) does not.
            section.append(this.response);

            if(print){
                Promise.all(Array.from(document.images).filter(img => !img.complete).map(img => new Promise(resolve => { img.onload = img.onerror = resolve; }))).then(() => {
                    window.print();
                });
            }
        }
    };
    xhttp.open("GET", `${api_base_path}/api/learningObject/getRaw?hruid=${hruid}&version=${version}&language=${language}`, true);
    xhttp.send();
}

/**
 * gets a certain parameter from the current url based on the name
 * for example: www.example.com/learning_path?id=34dd5fqsef4E1 
 *              => 34dd5fqsef4E1
 * @param {string} name 
 * @returns the value of the named parameter
 */
function getParameterByName(name) {
    let url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}



// Maps url name to hruid in the database
// To make a new direct link to a learing path you should:
// 1) add a new markdown document for the page (see wegostem.md)
// 2) In that file you specify the permalink and include the learning path html
// 3) Add the permalink text in the object below and specify the hruid and available languages
let urlToHruidMapping = {
    wegostem: {
        hruid: "WeGoSTEM-v1",
        languages: ["nl", "fr"],
        default_language: "nl"
    }
}
function getLastParamFromUrl(){
    let url = window.location.href;
    if (url.endsWith("/")){
        url = url.slice(0, -1);
    }
    let lastparamregex = /.*\/(.*)\/?$/
    let param = url.match(lastparamregex)[1]
    return param
}



/**
 * requests a learningpath by id from the backend and visualizes it
 */
function loadLearningPath() {
    let id = getParameterByName('id');
    let url = "";
    if (id){
        url = api_base_path + "/api/learningPath/" + id;
    }else{
        let urlparam = getLastParamFromUrl()
        let userLang = (navigator.language || navigator.userLanguage).substring(0, 2);
        if (!urlToHruidMapping[urlparam].languages.includes(userLang)){
            userLang = urlToHruidMapping[urlparam].default_language;
        }
        url = `${api_base_path}/api/learningPath/${urlToHruidMapping[urlparam].hruid}/${userLang}`
    }
    loadLearningPathFromUrl(url);
}

function loadLearningPathFromUrl(url){
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
    xhttp.open("GET", url, true);
    xhttp.send();
}

/**
 * shows language selection in navigation bar
 */
function showLanguageSelection() {
    document.getElementById("nav-language-selection").className.replace(" invisible", "");
}

/**
 * hides language selection in navigation bar
 */
function hideLanguageSelection() {
    document.getElementById("nav-language-selection").className += " invisible";
}

/** 
 * scroll to the top of the page
 */
function scrollToTop() {
    window.scrollTo(0, 0);
}

/**
 * request all available languages from backend and update the learning-path filters
 */
function loadFilters() {
    let filter_input = document.getElementById("filter_input")
    let lang_select = document.getElementById("language_select")

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            try {
                let availableLanguages = JSON.parse(this.response);
                // adds the 4 default languages (nl, fr, en, de), this is not necessary anymore in future if there are enough learning-paths for each language
                siteLanguages.forEach(lang => {
                    if (!availableLanguages.includes(lang)) {
                        availableLanguages.push(lang);
                    }
                });
                availableLanguages.forEach(lang => {
                    let option = document.createElement("option")
                    if (document.querySelector("html").lang == lang) {
                        option.selected = true;
                    }
                    option.value = lang;
                    option.text = allLanguages[lang];
                    lang_select.appendChild(option);
                })
            } catch (e) {
                console.log(this.response);
            }
        }
    };
    xhttp.open("GET", api_base_path + "/api/learningPath/languages", true);
    xhttp.send();

    filter_input.onchange = (ev) => {
        showLoadingMessage();
        loadLearningPaths(ev.target.value, lang_select.value)
    }

    lang_select.onchange = (ev) => {
        showLoadingMessage();
        loadLearningPaths(filter_input.value, ev.target.value)
    }
}

function showLoadingMessage(){
    document.getElementById("lp_loading_message").style.display = "inline-block";
}

function hideLoadingMessage(){
    document.getElementById("lp_loading_message").style.display = "none";
}

function setKeywordActions(){
    $(".keyword").on('click', function(){
        $("#filter_input").val($(this).text()).trigger("change");

    })
}

let defaultKeywords = ["WeGoSTEM", "AI op school", "Dwenguino", "Python", "Wiskunde", "STEM", "Klimaat"]
function visualizeKeywords(keywords){
    // Static for now
    /*keywords = defaultKeywords.concat(keywords);
    keywords = keywords.sort();
    keywords = [...new Set(keywords)] // remove dublicates
    let keywordContainer = $("#keyword-container").attr("class", "row");
    keywords.forEach((keyword) => {
        let keywordspan = $("<span>").attr("class", "keyword col");
        keywordspan.html(keyword);
        keywordContainer.append(keywordspan);
    })*/
    setKeywordActions();
}

function loadKeywords(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let learning_paths = JSON.parse(this.response);
            visualizeKeywords(learning_paths);
        }
    };
    xhttp.open("GET", api_base_path + "/api/learningObject/getFrequentKeywords", true);
    xhttp.send();
}

function setupAgeSlider() {
    $(".slider-input").jRange({
        from: 0,
        to: 25,
        step: 1,
        scale: [0, 5, 10, 15, 20, 25],
        format: '%s',
        width: 300,
        showLabels: true,
        isRange: true,
        onstatechange: function(state){
            // moved to .pointer.mouseup since this is not stable, too many calls.
        }
    });

    $("#age_input").change(function(){
        let state = $("#age_input").val();
        // Delay data load to prevent constant updates during sliding
        setTimeout(()=>{
            let newstate = $("#age_input").val();
            if (state == newstate){
                let filter_input = document.getElementById("filter_input")
                let lang_select = document.getElementById("language_select")
                console.log(state)
                let ages = state.split(",");
                loadLearningPaths(filter_input.value, lang_select.value, ages[0], ages[1])
            }
        }, 500)
        
    })
}

// if the element learning_paths is present it means the user has loaded the front page
//      load the filters, show the language selection and visualize all learning-paths
// if the element learning_path is present it means the user has loaded a learning-path page
//      hide the language selection and visualize the learning-path based on an id in the url
// otherwise show language selection
if (document.getElementById("learning_paths")) {
    showLoadingMessage();
    loadFilters();
    showLanguageSelection();
    loadLearningPaths("", document.querySelector("html").lang);
    setKeywordActions();
    setupAgeSlider();
} else if (document.getElementById("learning_path")) {
    hideLanguageSelection();
    loadLearningPath();
} else {
    showLanguageSelection();
}
