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
        "2DFan": {action: "https://galge.fun/subjects/search", name: "keyword", method: ""},
        "百度": {action: "https://www.baidu.com/s", name: "wd", method: ""},
        "Bangumi": {action: "https://bangumi.tv/subject_search", name: "search_text", method: "post"},
        "Google": {action: "https://www.google.com/search", name: "q", method: ""},
        "MyGalgame": {action: "https://www.okloli.com", name: "s", method: ""},
        "VNDB": {action: "https://vndb.org/v", name: "sq", method: ""},
    };

window.onload = function () {
    let searchForm = document.querySelector("#search");
    searchForm.querySelectorAll(".dropdown-menu > span").forEach(function (span) {
        span.addEventListener("click", function () {
            let img = span.querySelector("img");
            let name = span.querySelector("span").textContent;
            searchForm.setAttribute("action", FORMSET[name].action);
            searchForm.setAttribute("method", FORMSET[name].method);
            searchForm.querySelector("div > img").src = img.src;
            searchForm.querySelector("input").name = FORMSET[name].name;
        })
    })
}