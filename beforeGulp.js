console.log("hellou");
const fs = require("fs");

const currentDir = __dirname + "\\build";

fs.readFile(`${currentDir}/index.html`, "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const scriptIndexStart = data.indexOf("<script");
  const scriptIndexEnd = data.indexOf("</script>") + 9;
  const scriptTag = data.substring(scriptIndexStart, scriptIndexEnd);

  data = data.replace(scriptTag, "");
  data = data.replace("></body>", `>${scriptTag}</body>`);

  fs.writeFile(`${currentDir}/index.html`, data, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    //file written successfully
  });
});
