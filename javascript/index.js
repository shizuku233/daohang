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
    搜索: {
        百度: {action: "https://www.baidu.com/s", name: "wd", method: "", image: "https://www.baidu.com/favicon.ico"},
        必应: {
            action: "https://www.bing.com/search", name: "q", method: "", image: "https://www.bing.com/sa/simg/favicon-trans-bg-blue-mg.ico"
        },
        Google: {action: "https://www.google.com/search", name: "q", method: "", image: "https://www.google.com/favicon.ico"
        },
        搜狗: {action: "https://www.sogou.com/web", name: "query", method: "", image: "https://www.sogou.com/images/logo/new/favicon.ico"
        }
    },
    磁力: {
        Nyaa: {action: "https://nyaa.si/", name: "q", method: "", image: "https://nyaa.si/static/favicon.png"},
        Sukebei: {action: "https://sukebei.nyaa.si/", name: "q", method: "", image: "https://sukebei.nyaa.si/static/favicon.png"
        },
    },
    游戏: {
        "2DFan": {action: "https://galge.fun/subjects/search", name: "keyword", method: "", image: "https://galge.fun/favicon.ico"
        },
        Bangumi: {action: "https://bangumi.tv/subject_search", name: "search_text", method: "post", image: "https://bangumi.tv/img/favicon.ico"
        },
        MyGalgame: {action: "https://www.okloli.com", name: "s", method: "", image: "https://www.okloli.com/favicon.ico"
        },
        VNDB: {action: "https://vndb.org/v", name: "sq", method: "", image: "https://vndb.org/favicon.ico"},
    }
};

window.onload = function () {
    let search = document.querySelector("#search");
    let dropdownMenu = "";
    for (let category in FORMSET) {
        let div = "<div><span>" + category + "</span>";
        for (let site in FORMSET[category]) {
            div += "<div><img src='" + FORMSET[category][site].image + "'><span>" + site + "</span></div>";
        }
        dropdownMenu += div + "</div>";
    }
    search.querySelector(".dropdown-menu").innerHTML = dropdownMenu;
    search.querySelectorAll(".dropdown-menu > div").forEach(function (div) {
        let category = div.querySelector("span").textContent;
        div.querySelectorAll("div").forEach(function (div) {
            div.addEventListener("click", function () {
                let name = div.querySelector("span").textContent;
                search.setAttribute("action", FORMSET[category][name].action);
                search.setAttribute("method", FORMSET[category][name].method);
                search.querySelector("div > img").src = FORMSET[category][name].image;
                search.querySelector("input").name = FORMSET[category][name].name;
            })
        })
    })
    let input = search.querySelector("input");
    input.addEventListener("input", function () {
        let value = input.value;
        if (!value) {
            value = " ";
            search.querySelector("span > div").innerHTML = "";
        }
        $.ajax({
            type: "GET",
            url: "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su",
            async: true,
            data: {wd: value},
            dataType: "jsonp",
            jsonp: "cb",
            success: function (res) {
                let div = "";
                for (let s of res.s) {
                    div += "<li>" + s + "</li>"
                    search.querySelector("span > div").innerHTML = div;
                }
                search.querySelectorAll("span > div > li").forEach(function (li) {
                    li.addEventListener("click", function () {
                        input.value = li.textContent;
                        search.submit();
                    })
                })
            },
            error: function (res) {
                console.log(res)
            }
        })
    })
    input.addEventListener("blur", function () {
        setTimeout(function () {
            search.querySelector("span > div").style.display = "none";
        }, 200)
    })
    input.addEventListener("focus", function () {
        search.querySelector("span > div").style.display = "";
    })
}