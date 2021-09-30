const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)
const sqlTable = `CREATE TABLE if not exists people(id int not null AUTO_INCREMENT, name varchar(255), PRIMARY KEY(id))`

connection.query(sqlTable, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  })
connection.commit()
const sql = `INSERT INTO people(name) values('Gustavo')`
connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Row inserted");
  })

app.get('/', (req,res) => {
    let html = '<h1>Full Cycle Rocks!</h1>';
    connection.query('select id, name from people', function (err, results) {
        console.log(results)
        html += '<ul>';
        for (let i = 0; i < results.length; i++) {
            html += `<li>${results[i].id} - ${results[i].name}</li>`;
        }
        html += '</ul>';
        res.send(html)
    });
})

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})