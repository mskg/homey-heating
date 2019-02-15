const translate = require('@vitalets/google-translate-api');
const fs = require('fs');

var promises = [];

/* Resources */
var en = require("../locales/en.json");
var nl = require("../locales/nl.json");

function translateWeb(source, target, path) {
    Object.keys(source).forEach(key => {
        if (typeof source[key] === "string") {
            if (target[key] == null) {
                promises.push(
                    translate(source[key], { from: 'en', to: 'nl' }).then(res => {
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
translateWeb(en, nl);

Promise.all(promises).then(() => {
    fs.writeFileSync(__dirname + "/../locales/nl.json", JSON.stringify(nl, null, 2));
});


promises=[];

/* App.json localization */
var en = require("../src/app.json");
function translateApp(source, path) {
    Object.keys(source).forEach(key => {
        if (key === "nl") return;

        if (key === "en") {
            if (source["nl"] == null) {
                console.log("Translate", path);

                promises.push(
                    translate(source[key], { from: 'en', to: 'nl' }).then(res => {
                        console.log(path, source[key], "=>", res.text);
                        source["nl"] = res.text
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

translateApp(en);

Promise.all(promises).then(() => {
    fs.writeFileSync(__dirname + "/../src/app.json", JSON.stringify(en, null, 2));
});