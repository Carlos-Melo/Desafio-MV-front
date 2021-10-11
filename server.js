const express = require('express');
//const path = require('path');
const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.static(__dirname + '/dist/desafio-mv'));

app.get('/*', (req, res) => {
res.sendFile(__dirname + '/dist/desafio-mv/index.html');
});

app.listen(PORT, () => {
  console.log('Servidor iniciado com sucesso' + PORT);
})

