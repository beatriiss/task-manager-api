
const express = require("express");
const router = express.Router();

//aqui estamos importando o nosso banco de dados 
const db = require("../database/database_config"); 

// endpoint de registro de usuario
router.post("/register", (req, res) => {
    const { username, email, password } = req.body;

    // insere o novo usuário no banco 
    db.query(
        "INSERT INTO user (username, email, password) VALUES (?, ?, ?)",
        [username, email, password],
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({ message: "Erro ao registrar usuário" });
            } else {
                res.status(201).json({ message: "Usuário registrado com sucesso" });
            }
        }
    );
});

// endpoint de login
router.post("/login", (req, res) => {
    const { email, password } = req.body;

    // busca o usuário pelo e-mail e senha
    db.query(
        "SELECT * FROM user WHERE email = ? AND password = ?",
        [email, password],
        (err, results) => {
            if (err) {
                console.log(err);
                res.status(500).json({ message: "erro ao fazer login" });
            } else if (results.length === 0) {
                res.status(401).json({ message: "usuário não encontrado" });
            } else {
                res.status(200).json({ message: "login realizado" });
            }
        }
    );
});

//exportando as rotas de usuário, vamos importa-las no server.js
module.exports = router;
