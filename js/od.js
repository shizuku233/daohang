let xhr = new XMLHttpRequest
let hash = decodeURI(location.hash.replace("#", ""))
let hasSpecialCode = hash.search(/[$+]/)
console.log(hash)
let baseUrl = "https://1373190393535200.cn-hangzhou.fc.aliyuncs.com/2016-08-15/proxy/OneDrive/OneDrive/list"
let downloadUrl = "https://1373190393535200.cn-hangzhou.fc.aliyuncs.com/2016-08-15/proxy/OneDrive/OneDrive/download?id="
let section = document.querySelector("section")
getData()
onhashchange = function () {
    hash = decodeURI(location.hash.replace(/#/, ""))
    console.log(hash)
    document.onscroll = undefined
    getData()
}

function getData(next) {
    if (next) {
        section.innerHTML += "<div><img src='images/icon.png'><span>加载中...</span></div>"
        xhr.open("POST", baseUrl)
        xhr.send(JSON.stringify({next: next}))
        xhr.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                let json = JSON.parse(xhr.responseText)
                console.log(json)
                section.querySelector("div").remove()
                setFileList(json)
            }
        }
    } else {
        setNavList()
        section.innerHTML = "<div><img src='images/icon.png'><span>加载中...</span></div>"
        let h
        if (hasSpecialCode) {
            h = hash.replace("&", "%26").replace("+", "%2B")
        }
        xhr.open("GET", baseUrl + "?path=" + h)
        xhr.send()
        xhr.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                let json = JSON.parse(xhr.responseText)
                console.log(json)
                section.innerHTML = ""
                setFileList(json)
            }
        }
    }
}

function setNavList() {
    let nav = document.querySelector("nav")
    nav.innerHTML = "<a href='' class='house'>主页</a>"
    if (hash) {
        let n = ""
        hash.split("/").forEach(function (name) {
            n += name
            nav.innerHTML += "<span>></span><a href='#" + n + "'>" + name + "</a>"
            n += "/"
        })
    }
}

function setFileList(json) {
    if (json["next"]) {
        document.onscroll = function () {
            let html = document.documentElement
            // let scrollTop = document.documentElement.scrollTop
            // let windowHeight = document.documentElement.clientHeight
            // let documentScrollHeight = document.documentElement.scrollHeight
            // console.log(scrollTop, windowHeight, documentScrollHeight)
            if (html.scrollTop + html.clientHeight * 1.2 >= html.scrollHeight) {
                getData(json["next"])
                document.onscroll = undefined
            }
        }
    }
    if (json.data.length === 0) {
        section.innerHTML = "<div><span>文件夹为空。</span></div>"
    } else {
        for (let data of json.data) {
            // let time = data.time.replace(/(.*)T(.*)Z/, "$1 $2")
            let date = new Date(data.time)
            date.setHours(date.getHours() + 8)
            let time = date.toISOString().replace(/(.*)T(.*)\.000Z/, "$1 $2")
            let size
            if (data.size < 1024) {
                size = data.size.toPrecision(4) + " B"
            } else if (data.size > 1024 && data.size < 1024 * 1024) {
                size = (data.size / 1024).toPrecision(4) + " KB"
            } else if (data.size > 1024 * 1024 && data.size < 1024 * 1024 * 1024) {
                size = (data.size / 1024 / 1024).toPrecision(4) + " MB"
            } else if (data.size > 1024 * 1024 * 1024 && data.size < 1024 * 1024 * 1024 * 1024) {
                size = (data.size / 1024 / 1024 / 1024).toPrecision(4) + " GB"
            } else {
                size = (data.size / 1024 / 1024 / 1024 / 1024).toPrecision(4) + " TB"
            }
            if (hash) {
                if (data.type === "folder") {
                    section.innerHTML += "<li class=\"" + data.type + "\"><a href=\"#" + hash + "/" + data.name + "\">" + data.name + "</a><span>" + time + " · " + size + "</span></li>"
                } else {
                    section.innerHTML += "<li class='" + data.type + "'><a href=\'" + downloadUrl + data.id + "\'>" + data.name + "</a><span>" + time + " · " + size + "</span></li>"
                }
            } else {
                if (data.type === "folder") {
                    section.innerHTML += "<li class='" + data.type + "'><a href='#" + data.name + "'>" + data.name + "</a><span>" + time + " · " + size + "</span></li>"
                } else {
                    section.innerHTML += "<li class='" + data.type + "'><a href='" + downloadUrl + data.id + "'>" + data.name + "</a><span>" + time + " · " + size + "</span></li>"
                }
            }
        }
    }
}