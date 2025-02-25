function setClock() {
    let div = document.querySelector("#clock")
    let date = new Date()
    div.innerHTML = date.toLocaleTimeString()
    setTimeout( () => {
        setClock()
    }, 1000)
}

setClock()

function openGameUrl() {
    let site = document.querySelector("#site")
    site = site.options[site.selectedIndex].value
    let alpha = document.querySelector("#alpha")
    alpha = alpha.options[alpha.selectedIndex].value
    // let title = document.querySelector("#title").value
    // window.open(site + alpha + "/" + title + "/")
    window.open(site + alpha + "/")
}

let search = document.querySelector("#search")
let action
let dropdownMenu = ""
for (let category in FORM) {
    let div = "<div><span>" + category + "</span>"
    for (let site in FORM[category]) {
        div += "<div><img src='" + FORM[category][site].image + "'><span>" + site + "</span></div>"
    }
    dropdownMenu += div + "</div>"
}
search.querySelector(".dropdown-menu").innerHTML = dropdownMenu
search.querySelectorAll(".dropdown-menu > div").forEach(function (div) {
    let category = div.querySelector("span").textContent
    div.querySelectorAll("div").forEach(function (div) {
        div.addEventListener("click", function () {
            let name = div.querySelector("span").textContent
            search.setAttribute("action", FORM[category][name].action)
            search.setAttribute("method", FORM[category][name].method)
            search.querySelector("div > img").src = FORM[category][name].image
            search.querySelector("input").name = FORM[category][name].name
            action = search.getAttribute("action")
        })
    })
})

function setSuggestionList(suggestionList) {
    let div = ""
    for (let suggestion of suggestionList) {
        div += "<li>" + "<span>" + suggestion + "</span><span></span>" + "</li>"
        search.querySelector(".suggestion > div").innerHTML = div
    }
    search.querySelectorAll(".suggestion > div > li").forEach((li) => {
        li.children[0].addEventListener("click", () => {
            input.value = li.textContent
            search.submit()
        })
        li.children[1].addEventListener("click", () => {
            window.open("https://fanyi.baidu.com/#en/zh/" + li.textContent)
        })
    })
    $(".suggestion > div").slideDown()
}

let input = search.querySelector("input")
input.addEventListener("input", () => {
    let keyword = input.value
    if (keyword) {
        if (action === "https://yandex.com/search/") {
            $.ajax({
                type: "GET",
                url: "https://yandex.com/suggest/suggest-ya.cgi?v=4",
                async: true,
                data: {part: keyword},
                dataType: "jsonp",
                jsonp: "callback",
                success: function (result) {
                    setSuggestionList(result[1])
                },
                error: function (result) {
                    console.log(result)
                }
            })
        } else if (action === "https://www.google.com/search") {
            $.ajax({
                type: "GET",
                url: "https://suggestqueries.google.com/complete/search?client=firefox&callback=iowenHot",
                async: true,
                data: {q: keyword},
                dataType: "jsonp",
                jsonp: "callback",
                success: function (result) {
                    setSuggestionList(result[1])
                },
                error: function (result) {
                    console.log(result)
                }
            })
        } else {
            $.ajax({
                type: "GET",
                url: "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su",
                async: true,
                data: {wd: keyword},
                dataType: "jsonp",
                jsonp: "cb",
                success: function (result) {
                    setSuggestionList(result["s"])
                },
                error: function (result) {
                    console.log(result)
                }
            })
            // $.ajax({
            //     type: "GET",
            //     url: "https://www.baidu.com/sugrec",
            //     async: true,
            //     data: {wd: keyword, prod: "pc"},
            //     dataType: "jsonp",
            //     jsonp: "cb",
            //     success: function (result) {
            //         console.log(result)
            //         if (result["g"]) {
            //             let sugs = []
            //             for (let sug of result["g"]) {
            //                 sugs.push(sug["q"])
            //             }
            //             setSuggestionList(sugs)
            //         }
            //     },
            //     error: function (result) {
            //         console.log(result)
            //     }
            // })
        }
    } else {
        $(".suggestion > div").slideUp()
        search.querySelector(".suggestion > div").innerHTML = ""
    }
})
input.addEventListener("blur", () => {
    setTimeout(() => {
        $(".suggestion > div").slideUp()
    }, 200)
})
input.addEventListener("focus", () => {
    if (search.querySelector(".suggestion > div").hasChildNodes()) {
        $(".suggestion > div").slideDown()
    }
})

function creatNav1() {
    let section = document.querySelector("section")
    for (let category in NAVSITE) {
        let nav_site_bar = document.createElement("div")
        nav_site_bar.setAttribute("class", "nav-site")
        let nav_site_title = "<div class=\"nav-site-title\">" + category + "</div>"
        let nav_site_content = "<div class=\"nav-site-content\">"
        if (category.match(/no-\d/)) {
            nav_site_title = ""
        }
        for (let site of NAVSITE[category]) {
            nav_site_content += "<a href=\"" + site.href + "\"><img src=\"" + site.image + "\"><span>" + site.title + "</span></a>"
        }
        nav_site_bar.innerHTML = nav_site_title + nav_site_content + "</div>"
        section.appendChild(nav_site_bar)
    }
}

function creatNav2() {
    let section = document.querySelector("section")
    section.setAttribute("class", "nav-box")
    for (let category in NAVSITE) {
        let nav = document.createElement("div")
        nav.setAttribute("class", "nav-site")
        let nav_title = "<div class=\"nav-site-title\">" + category + "</div>"
        let nav_item = "<div class=\"nav-site-content\">"
        for (let site of NAVSITE[category]) {
            nav_item += "<a href=\"" + site.href + "\"><img src=\"" + site.image + "\"><span>" + site.title + "</span></a>"
        }
        nav.innerHTML = nav_title + nav_item + "</div>"
        section.appendChild(nav)
    }
}

function changeNavStyle() {
    let section = document.querySelector("section")
    section.innerHTML = ""
    if (section.className === "nav-box") {
        creatNav1()
        section.classList.remove("nav-box")
    } else {
        creatNav2()
    }
}

creatNav1()
