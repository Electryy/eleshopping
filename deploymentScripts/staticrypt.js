/**
 * Use staticrypt to encrypt index.html which contains all the code inlined
 * This way we can upload it to netlify and have the whole app password protected
 */

const { exec } = require("child_process");
require("dotenv").config();

const pw = process.env.STATICRYPT_PW;

if (pw.length === 0) {
  console.log("No STATICRYPT_PW set for staticrypt. Please set your password in .env");
  console.log("Skipping encryption.");
  process.exit();
}

exec(`staticrypt build/index.html "${pw}" -o build/index.html -r`, (error, stdout, stderr) => {
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
