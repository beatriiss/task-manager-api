// esse arquivo contém a conexão entre seu banco local e a sua api
// ps: vc precisa alterar as variaveis (host, senha, user, e database) com os dados do seu banco de dados

const express = require("express")
const app = express()
const mysql = require("mysql2")
const db = mysql.createPool({
   host: "localhost", //endereço do seu host, tipo onde ele mora mesmo
   user: "root", // seu usuario
   password: "@2368921", // sua senha
   database: "task_manager_api" // nome do seu banco de dados
})

//exportando nosso banco, vamos importa-lo dentro dos arquivos de rota, na pasta routes
module.exports = db; 