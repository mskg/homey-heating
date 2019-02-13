const fs = require('fs');

var version = process.argv[2];
if (version.startsWith("v")) version = version.substring(1);

var fn = __dirname + "/../package.json";
const package = require(fn);
package.version = version;

fs.writeFileSync(fn, JSON.stringify(package, null, 4));
