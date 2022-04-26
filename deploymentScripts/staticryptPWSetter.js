/**
 *
 */

const fs = require("fs");
const baseDir = process.cwd();
const buildDir = `${baseDir}/build`;

require("dotenv").config();

const pw = process.env.STATICRYPT_PW;

const staticryptPWSetter = `
<script>
    localStorage.setItem("staticryptPW", btoa("${pw}"));
</script>
`;

fs.readFile(`${buildDir}/index.html`, "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  // Insert before </body>
  data = data.replace("</body>", `${staticryptPWSetter}</body>`);

  fs.writeFile(`${buildDir}/index.html`, data, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("Added staticrypt password setter");
  });
});
