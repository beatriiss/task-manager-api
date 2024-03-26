
const express = require("express");
const router = express.Router();

//aqui estamos importando o nosso banco de dados 
const db = require("../database/database_config"); 

// endpoint de registro de usuario
router.post("/cadastro", (req, res) => {
    console.log("chegou no cadastro")
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
    const { username, password } = req.body;

    // busca o usuário pelo e-mail e senha
    db.query(
        "SELECT * FROM user WHERE username = ? AND password = ?",
        [username, password],
        (err, results) => {
            if (err) {
                console.log(err);
                res.status(500).json({ message: "erro ao fazer login" });
            } else if (results.length === 0) {
                res.status(401).json({ message: "usuário não encontrado" });
            } else {
                // retorna o usuário encontrado
                const user = results[0]; 
                res.status(200).json({ message: "login realizado", user });
            }
        }
    );
});


//exportando as rotas de usuário, vamos importa-las no server.js
module.exports = router;
