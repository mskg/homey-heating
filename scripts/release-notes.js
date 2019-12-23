const fs = require('fs');
const path = require('path');
const _ = require("lodash");

const docsDir = __dirname + "/../docs/releasenotes";
const outDir = __dirname + "/../tmp";

const releaseNotes = {};

function getNotes(file) {
    console.log('Processing', file);

    const data = fs.readFileSync(file, 'utf8');

    const lines = data.split('\n');
    const version = lines[2].substring(lines[2].lastIndexOf(' v') + 2);

    lines.splice(0, 5);
    releaseNotes[version] = {
        'en': lines.join('\n')
    };
}

fs.readdir(docsDir, (err, files) => {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }

    //listing all files using forEach
    files.filter(f => f !== 'template.md').forEach(function (file) {
        // Do whatever you want to do with the file
        getNotes(`${docsDir}/${file}`);
    });

    fs.writeFileSync(
        `${outDir}/.homeychangelog.json`,
        JSON.stringify(releaseNotes),
    );
});
