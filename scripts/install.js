const https = require('https');
const fs = require('fs');
const unzipper = require("unzipper");
const rimraf = require("rimraf");
const cli = require("homey");
const _ = require("lodash");

var branchName = process.argv.length >= 4 ? process.argv[3] : null;
var action = process.argv.length >= 4 ? process.argv[2] : null;

if (action !== 'install' && action !== 'publish') {
    console.error("Unkown action", action);
    process.exit(-1);
}

const options = {
    hostname: 'api.github.com',
    path: '/repos/mskg/homey-heating/branches',
    headers: { 'User-Agent': 'console' }
};


https.get(options, (res) => {
    var body = '';

    res.on('data', function (chunk) {
        body += chunk;
    });

    res.on('end', function () {
        var branches = JSON.parse(body);
        var f = _.find(branches, b => b.name == "release/" + branchName);

        if (f == null) {
            console.log("The following versions are available:");
            _.forEach(_.filter(branches, b => b.name.match(/^release/)), b => {
                console.log(b.name.substring("release/".length));
            })
        }
        else {
            console.log("Branch", branchName, "does exist.");
            run();
        }
    });
});

function run() {
    const tempDir = __dirname + "/../tmp";
    console.log("Cleaning up temp");
    rimraf(tempDir, (rimrafError) => {
        if (rimrafError !== null) throw new Error(`Could not clean director '${rimrafError}'`);

        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir);
        }

        console.log("Requesting branch", branchName);

        const downLoadFile = tempDir + "/download.zip";
        console.log("Download goes to", downLoadFile);

        const file = fs.createWriteStream(downLoadFile);
        https.get(`https://codeload.github.com/mskg/homey-heating/zip/release/${branchName}`, (response) => {
            if (response.statusCode !== 200) throw new Error(`Could not download file '${response.statusMessage}'`);

            response.pipe(file).on('close', function () {
                console.log("Extracting download");

                const readStream = fs.createReadStream(downLoadFile);
                readStream
                    .pipe(unzipper.Parse())
                    .on('entry', function (entry) {
                        var entryName = entry.path;
                        entryName = entryName.substring(entryName.indexOf("/") + 1);

                        if (entry.path == null || entry.path.match(/\.homeybuild/)) {
                           if (entry.type == "Directory") {
                                if (entryName !== "") {
                                    fs.mkdirSync(tempDir + "/" + entryName);
                                }
                                entry.autodrain();
                            }
                            else {
                                entry.pipe(fs.createWriteStream(tempDir + "/" + entryName));
                            }
                        } else {
                            console.log('ignoring', entryName);
                            entry.autodrain();
                        }
                    })
                    .on("close", () => {
                        fs.unlinkSync(downLoadFile);
                        console.log("Installing");

                        if (action == 'publish') {
                            new cli.App(tempDir).publish()
                                .then(() => {
                                    console.log("done.");
                                })
                                .catch((e) => {
                                    console.error(e, "failed.");
                                });
                        } else {
                            cli.AthomApi.getActiveHomey().then((homey) => {
                                new cli.App(tempDir).install({ homey, debug: false, skipBuild: true })
                                    .then(() => {
                                        console.log("done.");
                                    })
                                    .catch((e) => {
                                        console.error(e, "failed.");
                                    });
                            });
                        }
                    })
            });
        })
    });
}