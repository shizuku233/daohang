function setSite() {
    const SITE = {
        "2DFan": {action: "https://galge.fun/subjects/search", name: "keyword", method: ""},
        百度: {action: "https://www.baidu.com/s", name: "wd", method: ""},
        Bangumi: {action: "https://bangumi.tv/subject_search", name: "search_text", method: "post"},
        Google: {action: "https://www.google.com/search", name: "q", method: ""},
        MyGalgame: {action: "https://www.okloli.com", name: "s", method: ""},
        VNDB: {action: "https://vndb.org/v", name: "sq", method: ""},
    }
    var s = document.querySelector("#s")
    var site = s.options[s.selectedIndex].value
    s.nextElementSibling.setAttribute("name", SITE[site].name)
    s.nextElementSibling.setAttribute("method", SITE[site].method)
    s.parentElement.setAttribute("action", SITE[site].action)
}

function openurl() {
    var site = document.querySelector("#site")
    site = site.options[site.selectedIndex].value
    var alpha = document.querySelector("#alpha")
    alpha = alpha.options[alpha.selectedIndex].value
    var title = document.querySelector("#title").value
    var url = site + alpha + "/" + title + "/"
    window.open(url)
}

// for (let category in NAVSITE) {
//     let nav_site = document.createElement("div")
//     let nav_site_title = document.createElement("div")
//     nav_site_title.setAttribute("class", "nav_site_title")
//     nav_site_title.innerHTML = category
//     nav_site.setAttribute("class", "nav_site")
//     nav_site.appendChild(nav_site_title)
//     document.querySelector("body > div > div:nth-child(6)").appendChild(nav_site)
//     for (let site_bar of NAVSITE[category]) {
//         let nav_site_bar = document.createElement("div")
//         nav_site_bar.setAttribute("class", "nav_site_bar")
//         nav_site.appendChild(nav_site_bar)
//         for (let item of site_bar) {
//             nav_site_bar.innerHTML += "<a href='" + item.href + "'><img src='" + item.image + "'><span>" + item.title + "</span></a>"
//         }
//     }
// }

let div = document.querySelector("body > div > div:nth-child(6)")
for (let category in NAVSITE) {
    let nav_site = document.createElement("div")
    let nav_site_bar = document.createElement("div")
    nav_site.setAttribute("class", "nav_site")
    nav_site_bar.setAttribute("class", "nav_site_bar")
    let nav_site_title = "<div class=\"nav_site_title\">" + category + "</div>"
    if (category.match(/no-\d/)) {
        nav_site_title = ""
    }
    for (let site of NAVSITE[category]) {
        nav_site_bar.innerHTML += "<a href='" + site.href + "' class=\"nav_site\"><img src='" + site.image + "'><span>" + site.title + "</span></a>"
    }
    nav_site.innerHTML = nav_site_title
    nav_site.appendChild(nav_site_bar)
    div.appendChild(nav_site)
}