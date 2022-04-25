let input = document.getElementById("staticrypt-password");

const password = localStorage.getItem("encryptionPassword");

if (password) {
  input.value = password;
  setTimeout(() => {
    document.getElementsByClassName("staticrypt-decrypt-button")[0].click();
  }, 1);
}
