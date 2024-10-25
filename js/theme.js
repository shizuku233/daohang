function changeTheme() {
    document.documentElement.classList.toggle("dark")
}

let theme = window.matchMedia("(prefers-color-scheme: dark)")
if (theme.matches) {
    changeTheme()
}
theme.addEventListener("change", (e) => {
    if (e.matches) {
        document.documentElement.classList.add("dark")
    } else {
        document.documentElement.classList.remove("dark")
    }
})
