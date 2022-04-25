const pw = process.env.STATICRYPT_PW;
console.log(pw);
localStorage.setItem("encryptionPassword", pw);
