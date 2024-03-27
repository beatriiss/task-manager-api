const express = require("express");
const router = express.Router();

// importando o nosso banco de dados
const db = require("../database/database_config");

// endpoint de criar tarefa
router.post("/tarefa", (req, res) => {
    const { user_id, description } = req.body;

    db.query(
        "INSERT INTO tasks (user_id, description, completed) VALUES (?, ?, ?)",
        [user_id, description, 0], // 0 significa que a tarefa não está concluída
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({ message: "Erro ao criar tarefa" });
            } else {
                res.status(201).json({ message: "Tarefa criada com sucesso" });
            }
        }
    );
});

// endpoint de listar todas as tarefas de um usuário
router.get("/tarefas/:user_id", (req, res) => {
    const { user_id } = req.params;

    db.query(
        "SELECT * FROM tasks WHERE user_id = ?",
        [user_id],
        (err, results) => {
            if (err) {
                console.log(err);
                res.status(500).json({ message: "Erro ao buscar tarefas" });
            } else {
                res.status(200).json(results);
            }
        }
    );
});

// endpoint de atualizar uma tarefa (marcar como concluída ou não)
router.put("/tarefa/:task_id", (req, res) => {
    const { task_id } = req.params;
    const { completed } = req.body;

    // atualizando o status
    db.query(
        "UPDATE tasks SET completed = ? WHERE id = ?",
        [completed, task_id],
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({ message: "Erro ao atualizar tarefa" });
            } else {
                res.status(200).json({ message: "Tarefa atualizada com sucesso" });
            }
        }
    );
});

// endpoint de deletar uma tarefa
router.delete("/tarefa/:task_id", (req, res) => {
    const { task_id } = req.params;

    db.query(
        "DELETE FROM tasks WHERE id = ?",
        [task_id],
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({ message: "Erro ao deletar tarefa" });
            } else {
                res.status(200).json({ message: "Tarefa deletada com sucesso" });
            }
        }
    );
});

// endpoint de editar uma tarefa
router.put("/editar-tarefa/:task_id", (req, res) => {
    const { task_id } = req.params;
    const { description } = req.body;

    // Atualiza a descrição da tarefa
    db.query(
        "UPDATE tasks SET description = ? WHERE id = ?",
        [description, task_id],
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({ message: "Erro ao editar tarefa" });
            } else {
                res.status(200).json({ message: "Tarefa editada com sucesso" });
            }
        }
    );
});

module.exports = router;
