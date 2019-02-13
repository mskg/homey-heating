function highlightMatchesInString(text) {
    return text.replace(/#(\d)+/ig, function (m) { 
        return '<a href="https://github.com/mskg/homey-heating/issues/' + m.substring(1) + '">' + m + '</a>'; 
    });
}

document.addEventListener("DOMContentLoaded", function (event) {
    var content = window.document.getElementById("content");

    content.innerHTML = highlightMatchesInString(
        content.innerHTML);
});