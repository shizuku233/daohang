// ==UserScript==
// @name         2DFan / 绯月 / 南+ / Sukebei / VNDB / 终点
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://vndb.org/*
// @match        https://bbs.9shenmi.com/kf_growup.php
// @match        https://bbs.zdfx.net/k_misign-sign.html
// @match        https://galge.fun/*
// @match        https://sukebei.nyaa.si/*
// @match        https://www.east-plus.net/*
// @match        https://yun.zdfx.org/home/galgame/*
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    var url = location.origin;
    var href = location.href;
    console.log(url + "\n" + href);
    // 2DFan去广告
    if (url == "https://galge.fun") {
        document.querySelector("#index_bg_box").remove();
        document.querySelectorAll(".banner").forEach(function(item) {
            item.remove();
        });
        document.querySelector("#show_sidebar > div:nth-child(2)").remove();
        document.querySelector("#popadv-container").remove();
    };
    // 绯月自动签到
    if (url == "https://bbs.9shenmi.com") {
        let href = document.querySelector("#alldiv > div:nth-child(3) > div:nth-child(2) > div:nth-child(2) > div:nth-child(3) > table > tbody > tr > td > div:nth-child(6) > a");
        console.log(href)
        if (href != "javascript:;") {
            $.get(href);
        };
    };
    // 南+去广告
    if (url == "https://www.east-plus.net") {
        document.querySelector("#header > table > tbody > tr:nth-child(1) > td:nth-child(1) > a:nth-child(2)").remove();
        document.querySelector("#header > div:nth-child(13)").remove();
    }
    // 南+自动完成日常与周常任务
    if (href == "https://www.east-plus.net/") {
        const idList = [14, 15];
        idList.forEach(function(item) {
            $.post('plugin.php?H_name=tasks&action=ajax&actions=job&cid=' + item, '', function(data, status, xhr) {
                console.log(data.querySelector("ajax").textContent);
                //let str = ajax.request.responseText.split("\t");
                //if(str[0] == 'success'){
                //    console.log(str[0],str[1],2);
                //}else{
                //    console.log(str[0],str[1],2);
                //}
            });
            $.post('plugin.php?H_name=tasks&action=ajax&actions=job2&cid=' + item, '', function(data, status, xhr) {
                console.log(data.querySelector("ajax").textContent);
                //let str = ajax.request.responseText.split("\t");
                //if(str[0] == 'success'){
                //    console.log(str[0],str[1],2);
                //}else{
                //    console.log(str[0],str[1],2);
                //}
            });
        });
    };
    // Sukebei去广告
    if (url == "https://sukebei.nyaa.si") {
        document.querySelector("#dd4ce992-766a-4df0-a01d-86f13e43fd61").remove();
        document.querySelector("#e7a3ddb6-efae-4f74-a719-607fdf4fa1a1").remove();
    }
    // VNDB名称还原为日文
    if (url == "https://vndb.org") {
        changeLanguage();
        const BUTTON = "<button id='changeLanguage' style='position:fixed;top:800px;left:70px;'>切换语言</button>"
        $("body").append(BUTTON);
        document.querySelector("#changeLanguage").onclick = function() {
            changeLanguage()
        };
        function changeLanguage() {
            document.querySelectorAll("a[title]").forEach(function(item) {
                let title = item.title;
                item.title = item.text;
                item.text = title;
            });
            document.querySelectorAll("td[title]").forEach(function(item) {
                let title = item.title;
                item.title = item.textContent;
                item.textContent = title;
            });
        };
    };
    // 终点自动签到+摇一摇
    if (url =="https://bbs.zdfx.net") {
        var formhash = document.querySelector("input[name='formhash']").value;
        grecaptcha.ready(function() {
            grecaptcha.execute('6Lfl9bwZAAAAADZ5gAwWyb7U2UynEMHR52oS8d9V').then(function(token) {
                $.get('plugin.php?id=k_misign:sign&operation=qiandao&formhash=' + formhash + '&format=empty&token=' + token, "JD_sign");
                $.post("plugin.php?id=yinxingfei_zzza:yaoyao", {token: token}, function(result) {
                    console.log("状态：" + result.success + "，积分：" + result.jifen);
                });
            });
        });
    };
    // 终点OneDrive密码自动填充
    if (url == "https://yun.zdfx.org" && document.querySelector("button[type='submit']")){
        document.querySelector("input").value = "zdfx";
    };
})();