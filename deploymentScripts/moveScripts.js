/**
 * Script will modify index.html file.
 * Move <script defer="defer" src="/static/js/main.XXXXX.js"></script> from <head>
 * to body end </body>
 *
 * This is because gulp will inline js files in place and react won't run if it's in
 * head and inlined
 */

const fs = require("fs");
const baseDir = process.cwd();
const buildDir = `${baseDir}/build`;

fs.readFile(`${buildDir}/index.html`, "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  // Get indexes where to cut
  const scriptIndexStart = data.indexOf("<script");
  const scriptIndexEnd = data.indexOf("</script>") + 9;
  const scriptTag = data.substring(scriptIndexStart, scriptIndexEnd);

  // Remove script from head
  data = data.replace(scriptTag, "");

  // Insert before </body>
  data = data.replace("</body>", `${scriptTag}</body>`);

  fs.writeFile(`${buildDir}/index.html`, data, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("Moved scripts to body end");
  });
});
