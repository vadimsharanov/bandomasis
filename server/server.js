import express from "express"
import mysql from "mysql"
import cors from "cors"


const app = express()
const PORT = 3002
app.use(cors())
app.use(express.urlencoded( {
  extended:true
}))
app.use(express.json());
const connection = mysql.createConnection( {
    host: "localhost",
    user: "bandomasis",
    database: "bandomasis",
    password: "bandomasis_crud",
}) 

connection.connect(err => {
    if (err) {
        throw err
    }
    console.log("PAVYKO!!!!!!!");
})





app.get("/paspirtukai", (req, res) => {
    connection.query("SELECT * FROM bandomasis.paspirtukai order by id desc", (err, result)=> {
        if (err) {
            throw err
        }
        res.json(result);
    })
})




app.post('/paspirtukai/', (req, res) => {
    console.log(req.body);
  let sql = `
  INSERT INTO bandomasis.paspirtukai
  (registration_code, is_busy, last_use_time, total_ride_kilometres)
   VALUES (?,?,?,?);
  `
  connection.query(sql,[req.body.data.registrationCode,
     req.body.data.isBusy,
     req.body.data.lastUseTime,
     req.body.data.totalRide,
    ], (err,result) => {
    if (err) {throw err}
    res.send(result)
  })
})

app.delete('/paspirtukai/:id', (req, res) => {
  let sql = `
    delete from paspirtukai
    where id = ?
  `
  connection.query(sql,[req.params.id], (err,result) => {
    if (err) {throw err}
    res.send(result)
    console.log("Deleted");
  })
})

// UPDATE table_name
// SET column1 = value1, column2 = value2, ...
// WHERE condition;

app.put('/paspirtukai/:id', (req, res) => {
    console.log(req.body);
  let sql = `
    update paspirtukai
    set registration_code = ?, is_busy = ?, last_use_time = ?, total_ride_kilometres=?
    where id = ?
  `
  connection.query(sql,[
    req.body.data.registrationCode,
    req.body.data.isBusy,
    req.body.data.lastUseTime,
    req.body.data.totalRide,
    req.params.id,
    ], (err,result) => {
    if (err) {throw err}
    res.send(result)
    console.log("updated!");
  })
})


app.listen(PORT, () => {
  console.log(`App is listening at http://localhost:${PORT}`)
})