const express = require('express')
const bodyParser = require('body-parser')
const db = require('./dbconfig/queries')

const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
    response.json({ info: 'Welcome to Emp-Dept Management Console' })
  })

app.get('/emp/all', db.getAllEmp)
app.get('/dept/all', db.getAllDept)
app.get('/emp/get/:name', db.getEmployee)
app.post('/emp/create/:name', db.createEmployee)
app.post('/dept/create/:deptname', db.createDepartment)
app.put('/emp/update', db.updateEmployee)
app.delete('/emp/delete/:name', db.deleteEmployee)
app.delete('/dept/delete/:name', db.deleteDept)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })