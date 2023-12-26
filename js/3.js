function openurl() {
    let site = document.querySelector("#site")
    site = site.options[site.selectedIndex].value
    let alpha = document.querySelector("#alpha")
    alpha = alpha.options[alpha.selectedIndex].value
    let title = document.querySelector("#title").value
    let url = site + alpha + "/" + title + "/"
    window.open(url)
}

const FORMSET = {
    搜索: {
        百度: {action: "https://www.baidu.com/s", name: "wd", method: "", image: "https://www.baidu.com/favicon.ico"},
        必应: {action: "https://www.bing.com/search", name: "q", method: "", image: "https://www.bing.com/sa/simg/favicon-trans-bg-blue-mg.ico"},
        Google: {action: "https://www.google.com/search", name: "q", method: "", image: "https://www.google.com/favicon.ico"},
        搜狗: {action: "https://www.sogou.com/web", name: "query", method: "", image: "https://www.sogou.com/images/logo/new/favicon.ico"}
    },
    磁力: {
        Nyaa: {action: "https://nyaa.si/", name: "q", method: "", image: "https://nyaa.si/static/favicon.png"},
        Sukebei: {action: "https://sukebei.nyaa.si/", name: "q", method: "", image: "https://sukebei.nyaa.si/static/favicon.png"},
    },
    游戏: {
        "2DFan": {action: "https://galge.fun/subjects/search", name: "keyword", method: "", image: "https://galge.fun/favicon.ico"},
        Bangumi: {action: "https://bangumi.tv/subject_search", name: "search_text", method: "post", image: "https://bangumi.tv/img/favicon.ico"},
        MyGalgame: {action: "https://www.okloli.com", name: "s", method: "", image: "https://www.okloli.com/favicon.ico"},
        VNDB: {action: "https://vndb.org/v", name: "sq", method: "", image: "https://vndb.org/favicon.ico"},
    }
}

let search = document.querySelector("#search")
let action
let dropdownMenu = ""
for (let category in FORMSET) {
    let div = "<div><span>" + category + "</span>"
    for (let site in FORMSET[category]) {
        div += "<div><img src='" + FORMSET[category][site].image + "'><span>" + site + "</span></div>"
    }
    dropdownMenu += div + "</div>"
}
search.querySelector(".dropdown-menu").innerHTML = dropdownMenu
search.querySelectorAll(".dropdown-menu > div").forEach(function (div) {
    let category = div.querySelector("span").textContent
    div.querySelectorAll("div").forEach(function (div) {
        div.addEventListener("click", function () {
            let name = div.querySelector("span").textContent
            search.setAttribute("action", FORMSET[category][name].action)
            search.setAttribute("method", FORMSET[category][name].method)
            search.querySelector("div > img").src = FORMSET[category][name].image
            search.querySelector("input").name = FORMSET[category][name].name
            action = search.getAttribute("action")
        })
    })
})

function setHotKeyWordList(hotKeyWordList) {
    let div = ""
    for (let hotKeyWord of hotKeyWordList) {
        div += "<li>" + hotKeyWord + "</li>"
        search.querySelector(".suggestion > div").innerHTML = div
    }
    search.querySelectorAll(".suggestion > div > li").forEach(function (li) {
        li.addEventListener("click", function () {
            input.value = li.textContent
            search.submit()
        })
    })
}

let input = search.querySelector("input")
input.addEventListener("input", function () {
    let keyword = input.value
    if (!keyword) {
        keyword = " "
        search.querySelector(".suggestion > div").innerHTML = ""
    }
    if (action === "https://www.google.com/search") {
        $.ajax({
            type: "GET",
            url: "https://suggestqueries.google.com/complete/search?client=firefox&callback=iowenHot",
            async: true,
            data: {q: keyword},
            dataType: "jsonp",
            jsonp: "callback",
            success: function (result) {
                setHotKeyWordList(result[1])
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
                setHotKeyWordList(result["s"])
            },
            error: function (result) {
                console.log(result)
            }
        })
    }
})
input.addEventListener("blur", function () {
    setTimeout(function () {
        search.querySelector(".suggestion > div").style.display = "none"
    }, 200)
})
input.addEventListener("focus", function () {
    search.querySelector(".suggestion > div").style.display = "block"
})