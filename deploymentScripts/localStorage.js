/**
 *
 */

const fs = require("fs");
const baseDir = process.cwd();
const buildDir = `${baseDir}/build`;
let stuff = "";

fs.readFile(`${baseDir}/deploymentScripts/setBypassphrase.js`, "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  stuff = data;
});

fs.readFile(`${buildDir}/index.html`, "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  // Insert before </body>
  data = data.replace("</body>", `<script>${stuff}</script></body>`);

  fs.writeFile(`${buildDir}/index.html`, data, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("Moved scripts to body end");
  });
});
