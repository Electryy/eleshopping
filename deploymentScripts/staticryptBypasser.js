/**
 *
 */

const fs = require("fs");
const baseDir = process.cwd();
const deploymentDir = `${baseDir}/deploymentScripts`;
const buildDir = `${baseDir}/build`;

const bypasser = `
<script>
  let input = document.getElementById("staticrypt-password");

  const password = atob(localStorage.getItem("staticryptPW"));

  if (password) {
    input.value = password;
    setTimeout(() => {
      document.getElementsByClassName("staticrypt-decrypt-button")[0].click();
    }, 1);
  }
</script>
`;

fs.readFile(`${buildDir}/index.html`, "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  // Insert before </body>
  data = data.replace("</body>", `${bypasser}</body>`);

  fs.writeFile(`${buildDir}/index.html`, data, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("Added staticrypt bypasser");
  });
});
