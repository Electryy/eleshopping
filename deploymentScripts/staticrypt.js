/**
 * Use staticrypt to encrypt index.html which contains all the code inlined
 * This way we can upload it to netlify and have the whole app password protected
 */

const { exec } = require("child_process");
require("dotenv").config();

const pw = process.env.STATICRYPT_PW;

exec(`staticrypt build/index.html ${pw} -o build/index.html -r`, (error, stdout, stderr) => {
  if (error) {
    console.log(`error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.log(`stderr: ${stderr}`);
    return;
  }
  console.log(`index.html encrypted`);
});
