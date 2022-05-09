// ==UserScript==
// @name         终点自动签到+摇一摇
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://bbs.zdfx.net/*
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// @require      https://recaptcha.net/recaptcha/api.js
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    // Your code here...
    //var url = location.href
    //if (url =="https://bbs.zdfx.net/k_misign-sign.html") {
    //    var btn = $("[class='btn btnvisted']");
    //    console.log(btn);
    //    if (!btn) {
    //        tokenurl("154598c9", "JD_sign");
    //        console.log("自动签到完成。");
    //    }
    //    else {
    //        console.log("今日已签到。");
    //    };
    //};
    grecaptcha.ready(function() {
        grecaptcha.execute('6Lfl9bwZAAAAADZ5gAwWyb7U2UynEMHR52oS8d9V').then(function(token) {
            $.post("plugin.php?id=yinxingfei_zzza:yaoyao",{token: token}, function(result) {
                console.log(result);
                console.log("状态：" + result.success + "，积分：" + result.jifen);
            });
            //ajaxget('plugin.php?id=k_misign:sign&operation=qiandao&formhash=' + formhash + '&format=empty&token=' + token, "JD_sign", '', '', '', 'window.location.reload();')
            if (location.href == "https://bbs.zdfx.net/k_misign-sign.html") {
                var formhash=$("input[name='formhash']").attr("value");
                $.get('plugin.php?id=k_misign:sign&operation=qiandao&formhash=' + formhash + '&format=empty&token=' + token, "JD_sign");
            };
        });
    });
})();