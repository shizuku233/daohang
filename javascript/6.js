function setSearchForm() {
    const SITE = {
        "2DFan": {action: "https://galge.fun/subjects/search", name: "keyword", method: ""},
        "百度": {action: "https://www.baidu.com/s", name: "wd", method: ""},
        "Bangumi": {action: "https://bangumi.tv/subject_search", name: "search_text", method: "post"},
        "Google": {action: "https://www.google.com/search", name: "q", method: ""},
        "MyGalgame": {action: "https://www.okloli.com", name: "s", method: ""},
        "VNDB": {action: "https://vndb.org/v", name: "sq", method: ""},
    };
    var s = document.querySelector("#s");
    var site = s.options[s.selectedIndex].value;
    s.nextElementSibling.setAttribute("name", SITE[site].name);
    s.nextElementSibling.setAttribute("method", SITE[site].method);
    s.parentNode.setAttribute("action", SITE[site].action);
}

function openurl() {
    var site = document.querySelector("#site");
    site = site.options[site.selectedIndex].value;
    var alpha = document.querySelector("#alpha");
    alpha = alpha.options[alpha.selectedIndex].value;
    var title = document.querySelector("#title").value;
    var url = site + alpha + "/" + title + "/"
    window.open(url);
}

const FORMSET = {
    "2DFan": {action: "https://galge.fun/subjects/search", name: "keyword", method: "", image: "https://galge.fun/favicon.ico"},
    "百度": {action: "https://www.baidu.com/s", name: "wd", method: "", image: "https://www.baidu.com/favicon.ico"},
    "Bangumi": {action: "https://bangumi.tv/subject_search", name: "search_text", method: "post", image: "https://bangumi.tv/img/favicon.ico"},
    "必应": {action: "https://www.bing.com/search", name: "q", method: "", image: "https://www.bing.com/sa/simg/favicon-trans-bg-blue-mg.ico"},
    "Google": {action: "https://www.google.com/search", name: "q", method: "", image: "https://www.google.com/favicon.ico"},
    "MyGalgame": {action: "https://www.okloli.com", name: "s", method: "", image: "https://www.okloli.com/favicon.ico"},
    "VNDB": {action: "https://vndb.org/v", name: "sq", method: "", image: "https://vndb.org/favicon.ico"},
};

window.onload = function () {
    let search = document.querySelector("#search");
    //let dropdown_menu = "";
    //for (let form in FORMSET) {
    //    dropdown_menu += "<span><img src='" + FORMSET[form].image + "'><span>" + form + "</span></span>";
    //}
    //search.querySelector(".dropdown-menu").innerHTML = dropdown_menu;
    search.querySelectorAll(".dropdown-menu > span").forEach(function (span) {
        span.addEventListener("click", function () {
            let name = span.querySelector("span").textContent;
            search.setAttribute("action", FORMSET[name].action);
            search.setAttribute("method", FORMSET[name].method);
            search.querySelector("div > img").src = FORMSET[name].image;
            search.querySelector("input").name = FORMSET[name].name;
        })
    })
}