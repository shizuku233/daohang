// ==UserScript==
// @name         自用脚本
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://vndb.org/*
// @match        https://bbs.kfpromax.com/kf_growup.php
// @match        https://bbs.zdfx.net/*
// @match        https://2dfan.org/*
// @match        https://ggb.dlgal.com/*
// @match        https://kouknymj-my.sharepoint.com/*
// @match        https://seiya-saiga.com/*
// @match        https://sukebei.nyaa.si/*
// @match        https://www.blue-plus.net/*
// @match        https://www.ggbases.com/*
// @match        https://www.lzacg.net/*
// @match        https://www.sayhuahuo.xyz/dsu_paulsign-sign.html
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM_addStyle
// @grant        GM_setClipboard
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_xmlhttpRequest
// ==/UserScript==


let href = location.href
let origin = location.origin
let pathname = location.pathname
let xhr = new XMLHttpRequest();
console.log(origin + "\n" + href);

// 2DFan去广告 + 攻略可复制
if (origin === "https://2dfan.org") {
    let text = ""
    let topicContent = document.querySelector("#topic-content")
    if (topicContent) {
        topicContent.innerHTML = "<button id=\"copy\" style=\"width: 100%\">复制攻略内容</button>" + topicContent.innerHTML
        document.querySelector("#copy").addEventListener("click", () => {
            topicContent.querySelectorAll("p").forEach((p) => {
                text += p.innerHTML.replaceAll("<br>", "\n") + "\n"
            })
            console.log(text)
            GM_setClipboard(text)
        })
    }
    document.querySelector("#index_bg_box").remove()
    // 移除顶栏广告和右下角广告
    document.querySelectorAll(".banner").forEach((div) => {
        div.remove()
    })
    document.querySelector("#adv-fixed-square").remove()
    // 移除侧边栏广告
    let sidebar = document.querySelector("#sidebar")
    if (sidebar) {
        sidebar.querySelectorAll("div").forEach((div) => {
            if (div.querySelector("img")) {
                div.remove()
            }
        })
    }
    let show_sidebar = document.querySelector("#show_sidebar")
    if (show_sidebar) {
        show_sidebar.children[1].remove()
    }
    // 移除评论区广告
    let comments = document.querySelector("#comments")
    if (comments) {
        comments.querySelectorAll(".media").forEach((div) => {
            if (!div.hasAttribute("id")) {
                div.remove()
            }
        })
    }
}

// 誠也の部屋添加暗色模式
if (origin === "https://seiya-saiga.com") {
    function changeTheme() {
        let darkTheme = document.documentElement.classList.toggle("dark")
    }

    function moveToLeft() {
        let style = document.querySelector("body > div").style
        if (style.position === "absolute") {
            style.position = ""
            style.left = ""
        } else {
            style.position = "absolute"
            style.left = "0"
        }
    }

    function moveAd() {
        document.querySelector("body > div > table > tbody > tr > th > a").remove()
        document.querySelector("body > div > table > tbody > tr > th > iframe").remove()
    }

    changeTheme()
    document.querySelector("head").innerHTML += `
<style>
section {
    background: rgba(242 242 242 / 1);
    border-radius: .5rem;
    position: fixed;
    right : .5rem;
    top: .5rem;
}
section > button {
    background: transparent;
    border: 1px solid aqua;
    border-radius: .5rem;
    display: block;
    margin: 1rem;
    padding: .5rem;
    line-height: 1.5rem;
    font-size: 1rem;
    transition: background .5s, border .2s, color .2s;
}
section > button:hover {
    background: aqua;
}
.dark section {
    background: rgba(51 51 51 / 1);
}
.dark section > button {
    border-color: darkorange;
    color: whitesmoke;
}
.dark section > button:hover {
    background: darkorange;
}
.dark a, .dark font[color="#0000ff"]{
    color: aqua;
}
.dark a:hover {
    color: darkorange;
}
.dark body {
    background: black;
}
.dark hr {
    border-color: rgba(128 128 128 / 1);
}
.dark input {
    /*background: transparent;*/
    /*border: 1px solid aqua;*/
}
.dark table {
    border: 1px solid rgba(128 128 128 / 1); 
}
.dark table, .dark td[bgcolor="#333333"], .dark th[bgcolor="#ffffff"] {
    background: transparent;
}
.dark td {
    color: whitesmoke;
}
.dark td[bgcolor="#ccffff"], .dark th[bgcolor="#6666ff"] {
    background: rgba(51 51 51 / 1);
}
</style>`
    let body = document.body
    body.setAttribute("oncontextmenu", "")
    body.setAttribute("onselectstart", "")
    body.innerHTML += `
    <section>
        <button>切换主题</button>
        <button>表格左移</button>
        <button>移除广告</button>
    </section>`
    document.querySelector("section > button:nth-of-type(1)").addEventListener("click", changeTheme)
    document.querySelector("section > button:nth-of-type(2)").addEventListener("click", moveToLeft)
    document.querySelector("section > button:nth-of-type(3)").addEventListener("click", moveAd)
}

// 绯月自动签到
if (origin === "https://bbs.kfpromax.com") {
    let href = document.querySelector("#alldiv > div:nth-child(3) > div:nth-child(2) > div:nth-child(2) > div:nth-child(3) > table > tbody > tr > td > div:nth-child(6) > a").href
    console.log(href)
    if (href !== "javascript:;") {
        $.get(href)
    }
}

//GGBases去广告
if (origin === "https://www.ggbases.com") {
    document.querySelector(".ad").remove()
}
if (origin === "https://ggb.dlgal.com") {
    document.querySelectorAll("center").forEach((center) => {
        center.remove()
    })
}

// 花火学园自动签到
if (origin === "https://www.sayhuahuo.xyz" && document.querySelector("#qiandao")) {
    document.querySelector("#kx_s").checked = true
    document.querySelector("#todaysay").value = "签到"
    document.querySelector("#qiandao").submit()
}

// 量子ACG去广告
if (origin === "https://www.lzacg.net") {
    let divList = document.querySelectorAll(".widget_custom_html")
    for (let div of divList) {
        div.remove()
    }
}

// 南+自动完成日常与周常任务和去广告
if (origin === "https://www.blue-plus.net") {
    document.querySelector("#header > table > tbody > tr:nth-child(1) > td:nth-child(1) > a:nth-child(2)").remove()
    document.querySelector("#header > div:nth-child(13)").remove()
    // 保存樱花大佬解压密码
    // let blockQuote = document.querySelector("#read_tpc > blockquote")
    // if (blockQuote) {
    //     let yhPassword = blockQuote.textContent.match(/yhsxsx\d+月/)
    //     if (yhPassword) {
    //         GM_setValue("yhPassword", yhPassword[0])
    //     }
    // }
    if (href === "https://www.blue-plus.net/") {
        const idList = [14, 15];
        idList.forEach(function (item) {
            $.get('plugin.php?H_name=tasks&action=ajax&actions=job&cid=' + item, function (data) {
                console.log(data.querySelector("ajax").textContent)
                //let str = ajax.request.responseText.split("\t");
                //if(str[0] == 'success'){
                //    console.log(str[0],str[1],2);
                //}else{
                //    console.log(str[0],str[1],2);
                //}
            })
            setTimeout(function () {
                $.get('plugin.php?H_name=tasks&action=ajax&actions=job2&cid=' + item, function (data) {
                    console.log(data.querySelector("ajax").textContent)
                    //let str = ajax.request.responseText.split("\t");
                    //if(str[0] == 'success'){
                    //    console.log(str[0],str[1],2);
                    //}else{
                    //    console.log(str[0],str[1],2);
                    //}
                })
            }, 1000)
        })
    }
}

// Sukebei去广告
if (origin === "https://sukebei.nyaa.si") {
    document.querySelector("#e71bf691-4eb4-453f-8f11-6f40280c18f6").remove();
    document.querySelector("#ec01fd54-016b-41b4-bec9-b9b93f9b3b77").remove();
}

// VNDB名称显示为日文
if (origin === "https://vndb.org") {
    let style = "<style>span:lang(ja), .tc1, .tc4, tbody > tr > td:nth-child(6) {position: relative} .copy {display: none} span:lang(ja):hover .copy, .tc1:hover .copy, .tc4:hover .copy, tbody > tr > td:nth-child(6):hover .copy {display: block; position: absolute; top: 0; left: 1rem}</style>"
    document.querySelector("head").innerHTML += style
    changeLanguage()
    document.querySelector("nav").innerHTML += "<button style=\"position: fixed; top: 800px; left: 70px;\">切换语言</button>"
    document.querySelector("button").addEventListener("click", changeLanguage)
    // 日期添加复制按钮
    document.querySelectorAll(".tc1").forEach((tc1) => {
        addCopyButton(tc1)
    })
    document.querySelectorAll(".tc4").forEach((tc4) => {
        let copyData = tc4.children[0].textContent
        tc4.innerHTML += "<button class=\"copy\">复制</button>"
        tc4.addEventListener("click", () => {
            GM_setClipboard(copyData)
        })
    })
    // 标题添加复制按钮
    let span = document.querySelector("span:lang(ja)")
    if (span) {
        addCopyButton(span)
    }
    // 时长添加复制按钮
    let a = document.querySelector("a[href$='lengthvotes']")
    if (a) {
        let tr = a.parentElement
        let time = tr.textContent.match(/\d+h?\d*m?/)[0]
        tr.innerHTML += "<button>复制</button>"
        tr.lastChild.addEventListener("click", () => {
            GM_setClipboard(time)
        })
    }
    // 分辨率添加复制按钮
    document.querySelectorAll("tbody > tr > td:nth-child(6)").forEach((td) => {
        addCopyButton(td)
    })
    //GM_addStyle("span:lang(ja), .tc1, tbody > tr > td:nth-child(6) {position: relative} .copy {display: none} span:lang(ja):hover .copy, .tc1:hover .copy, tbody > tr > td:nth-child(6):hover .copy {display: block; position: absolute; top: 0;}")

    function changeLanguage() {
        document.querySelectorAll("a[title]").forEach((a) => {
            let title = a.title
            a.title = a.text
            a.text = title
        })
        document.querySelectorAll("td[title]").forEach((td) => {
            let title = td.title
            td.title = td.textContent
            td.textContent = title
        })
    }

    function addCopyButton(element) {
        let copyData = element.textContent
        element.innerHTML += "<button class=\"copy\">复制</button>"
        element.children[0].addEventListener("click", () => {
            GM_setClipboard(copyData)
        })
    }
}

// 终点自动签到+摇一摇
// if (origin === "https://bbs.zdfx.net") {
//     if (pathname === "/k_misign-sign.html") {
//         let formhash = document.querySelector("input[name='formhash']").value
//         grecaptcha.ready(function () {
//             grecaptcha.execute("6Lfl9bwZAAAAADZ5gAwWyb7U2UynEMHR52oS8d9V").then(function (token) {
//                 $.post("plugin.php?id=yinxingfei_zzza:yaoyao", {token: token}, function (data) {
//                     console.log("状态：" + data.success + "，积分：" + data.jifen)
//                 })
//                 setTimeout(function () {
//                     $.get("plugin.php?id=k_misign:sign&operation=qiandao&formhash=" + formhash + "&format=empty&token=" + token, "JD_sign", function (data) {
//                         console.log(data)
//                     })
//                 }, 7500)
//             })
//         })
//     } else {
//         const letterList = ["AB", "CD", "EFG", "HI", "JK", "L", "M", "N", "OPQ", "R", "S", "T", "UVW", "X", "Y", "Z"]
//         let style = "<style>#thread_subject {position: relative} #thread_subject > div {background: rgb(255 255 255 / .5); backdrop-filter: blur(4px); border-radius: .5rem; box-shadow: 0 0 8px .25rem rgba(0 0 0 / .2); display: none; padding: .25rem; position: absolute; width: 100%;} #thread_subject:hover > div {display: block} #thread_subject > div > a {display: flex; font-weight: normal; padding: .25rem; width: 100%;}</style>"
//         document.querySelector("head").innerHTML += style
//         let titleEle = document.querySelector("#thread_subject")
//         let title = titleEle.textContent.match(/【.*】(.*)/)[1]
//         let div = document.createElement("div")
//         div.innerHTML = "<a href=\"https://vndb.org/v?sq=" + title + "\" target=\"_blank\">在VNDB中搜索</a>"
//         for (let letter of letterList) {
//             div.innerHTML += "<a href=\"https://yun.zdfx.org/home/galgame/" + letter + "//\" target=\"_blank\">OneDrive: " + letter + "</a>"
//         }
//         titleEle.appendChild(div)
//     }
// }
