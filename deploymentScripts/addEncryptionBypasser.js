/**
 *
 */

const fs = require("fs");
const baseDir = process.cwd();
const deploymentDir = `${baseDir}/deploymentScripts`;
const buildDir = `${baseDir}/build`;
let encryptionBypasser = "";

fs.readFile(`${deploymentDir}/encryptionBypass.js`, "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  encryptionBypasser = data;
});

fs.readFile(`${buildDir}/index.html`, "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  // Insert before </body>
  data = data.replace("</body>", `<script>${encryptionBypasser}</script></body>`);

  fs.writeFile(`${buildDir}/index.html`, data, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("Added encryption bypasser");
  });
});
