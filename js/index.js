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
let dropdownMenu = document.querySelector(".dropdown-menu")
for (let category in FORM) {
    let div1 = document.createElement("div")
    div1.innerHTML += `<span>${category}</span>`
    FORM[category].forEach((site) => {
        let div2 = document.createElement("div")
        div2.innerHTML = `
            <img src="${site.image}">
            <span>${site.title}</span>
        `
        div2.addEventListener("click", () => {
            search.setAttribute("action", site.action)
            search.setAttribute("method", site.method)
            search.querySelector("div > img").src = site.image
            search.querySelector("input").name = site.name
            action = site.action
        })
        div1.append(div2)
    })
    dropdownMenu.append(div1)
}

function setSuggestionList(suggestions) {
    let div = search.querySelector(".suggestion > div")
    div.innerHTML = ""
    suggestions.forEach((suggestion) => {
        let li = document.createElement("li")
        let span1 = document.createElement("span")
        let span2 = document.createElement("span")
        span1.textContent = suggestion
        span1.addEventListener("click", () => {
            input.value = suggestion
            search.submit()
        })
        span2.addEventListener("click", () => {
            window.open(`https://fanyi.baidu.com/#en/zh/${suggestion}`)
        })
        li.append(span1, span2)
        div.append(li)
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
                success: (result) => {
                    setSuggestionList(result[1])
                },
                error: (result) => {
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
                success: (result) => {
                    setSuggestionList(result[1])
                },
                error: (result) => {
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
                success: (result) => {
                    setSuggestionList(result["s"])
                },
                error: (result) => {
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
        let navSiteBar = document.createElement("div")
        navSiteBar.className = "nav-site"
        let navSiteTitle = document.createElement("div")
        navSiteTitle.className = "nav-site-title"
        navSiteTitle.innerHTML = category
        let navSiteContent = document.createElement("div")
        navSiteContent.className = "nav-site-content"
        if (category.match(/no-\d/)) {
            navSiteTitle = ""
        }
        NAVSITE[category].forEach((site) => {
            navSiteContent.innerHTML += `
                <a href="${site.href}">
                    <img src="${site.image}">
                    <span>${site.title}</span>
                </a>
            `
        })
        navSiteBar.append(navSiteTitle, navSiteContent)
        section.appendChild(navSiteBar)
    }
}

function creatNav2() {
    let section = document.querySelector("section")
    section.className = "nav-box"
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
