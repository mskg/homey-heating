const translate = require('@vitalets/google-translate-api');
const fs = require('fs');

var promises = [];

const sourceLang = "en";
const targetLang = "de";

/* Resources */
var sourceFile = require(`../locales/${sourceLang}.json`);
var targetFile = require(`../locales/${targetLang}.json`);

function translateWeb(source, target, path) {
    Object.keys(source).forEach(key => {
        if (typeof source[key] === "string") {
            if (target[key] == null) {
                promises.push(
                    translate(source[key], { from: sourceLang, to: targetLang }).then(res => {
                        console.log("Translating", path, key, source[key], "=>", res.text);
                        target[key] = res.text
                    }));
            }
            else {
                console.log("Skipping", path, key)
            }
        }
        else {
            target[key] = target[key] || {};
            translateWeb(source[key], target[key], path ? path + "." + key : key);
        }
    });
}
translateWeb(sourceFile, targetFile);

Promise.all(promises).then(() => {
    fs.writeFileSync(__dirname + `/../locales/${targetLang}.json`, JSON.stringify(targetFile, null, 2));
});


promises=[];

/* App.json localization */
var sourceFile = require("../src/app.json");
function translateApp(source, path) {
    Object.keys(source).forEach(key => {
        if (key === targetLang) return;

        if (key === sourceLang) {
            if (source[targetLang] == null) {
                console.log("Translate", path);

                promises.push(
                    translate(source[key], { from: sourceLang, to: targetLang }).then(res => {
                        console.log(path, source[key], "=>", res.text);
                        source[targetLang] = res.text
                    }));
            } else {
                console.log("Skipped", path)
            }
        }
        else if (typeof source[key] !== "string") {
            translateApp(source[key], path ? path + "." + key : key);
        }
    });
}

translateApp(sourceFile);

Promise.all(promises).then(() => {
    fs.writeFileSync(__dirname + "/../src/app.json", JSON.stringify(sourceFile, null, 2));
});