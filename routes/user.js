
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

                // Após a edição, busque o usuário atualizado
               db.query(
                "SELECT * FROM user WHERE email= ?",
                [email],
                (err, results) => {
                    if (err) {
                        console.log(err);
                        res.status(500).json({ message: "Erro ao buscar usuário cadastrado" });
                    } else if (results.length === 0) {
                        res.status(404).json({ message: "Usuário não encontrado " });
                    } else {
              
                        const user = results[0];
                        res.status(201).json({ message: "Usuário editado com sucesso", user });
                    }
                }
            );
                
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
                console.log("Usuário encontrado")
                const user = results[0]; 
                res.status(200).json({ message: "login realizado", user });
            }
        }
    );
});

// endpoint de edição de usuário
router.put("/editar/:id", (req, res) => {
    const userId = req.params.id;
    const { username, email, password } = req.body;

    // atualiza os dados do usuário no banco 
    db.query( 
        "UPDATE user SET username = ?, email = ?, password = ? WHERE id = ?",
        [username, email, password, userId],
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({ message: "Erro ao editar usuário" });
            } else {
                // Após a edição, busque o usuário atualizado
                db.query(
                    "SELECT * FROM user WHERE id = ?",
                    [userId],
                    (err, results) => {
                        if (err) {
                            console.log(err);
                            res.status(500).json({ message: "Erro ao buscar usuário atualizado" });
                        } else if (results.length === 0) {
                            res.status(404).json({ message: "Usuário não encontrado após edição" });
                        } else {
                  
                            const user = results[0];
                            res.status(200).json({ message: "Usuário editado com sucesso", user });
                        }
                    }
                );
            }
        }
    );
});


//exportando as rotas de usuário, vamos importa-las no server.js
module.exports = router;
