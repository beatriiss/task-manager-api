// esse é o arquivo principal do seu backend
const express = require("express");
const app = express();
const body_parser = require("body-parser");

//importa as rotas da pasta routes
const user_routes = require("./routes/user")

// middleware para fazer o parsing do corpo da requisição como JSON
app.use(body_parser.json());

// endpoint raiz para verificar se o servidor está rodando
app.get("/", (req, res) => {
    res.send("Servidor rodando...");
});

// possibilita o app usar as rotas do usuário
app.use("/user", user_routes);

//configura a porta em que o servidor esta rodando
const PORT = process.env.PORT || 3000;

// coloca o servidor para "escutar"
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
