const express = require('express')
const crypto = require('crypto');
const { strict } = require('assert');

const app = express()
app.use(express.json())
const port = 3000

function encrypt(text, algorithm, key){
  console.log(text)
  console.log(key)
  let cipher = crypto.Cipher(algorithm, String(key))
  cipher.update(text, 'utf8', 'hex')
  encrypted_text = cipher.final('hex')
  
  console.log(encrypted_text)
  return encrypted_text;
}

function decrypt(text, algorithm, key){
  console.log(text)
  console.log(key)
  let decipher = crypto.Decipher(algorithm, String(key))
  decipher.update(text, 'hex', 'utf8')
  decrypted_text = decipher.final('utf8')
  
  console.log(decrypted_text)
  return decrypted_text;
}


app.get('/encryption', (req, res) => {
  text = req.query.text
  key = req.query.key
  encryption_type = req.query.type
  if (encryption_type  == "aes256" || encryption_type == "des") {
    res.send(encrypt(text,encryption_type,key))
  }
  else {
    res.send("Данное шифрование не поддерживается")
  }
})

app.get('/decryption', (req, res) => {
  text = req.query.text
  key = req.query.key
  encryption_type = req.query.type
    
  if (encryption_type  == "aes256" || encryption_type == "des") {
    res.send(decrypt(text,encryption_type,key))
  }
  else {
    res.send("Данное шифрование не поддерживается")
  }
})

app.listen(port, function(){
  console.log("Сервер запущен.");
});