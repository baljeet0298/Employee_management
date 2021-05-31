const Pool = require('pg').Pool

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'nodeapp',
  password: 'Baljeet@123.',
  port: 5432,
})

const getAllEmp = (request, response) => {
    pool.query('SELECT * FROM employee ORDER BY name ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

const getAllDept = (request, response) => {
    pool.query('SELECT * FROM department ORDER BY deptname ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

const getEmployee = (request, response) => {
    const name = request.params.name

    pool.query('SELECT * FROM employee WHERE name = $1', [name], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}

const createEmployee = (request, response) => {
    const name  = request.params.name
  
    pool.query('INSERT INTO employee (name, department) VALUES ($1, $2)', [name, 'null'], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`employee added`)
    })
  }

const createDepartment = (request, response) => {
    const name  = request.params.deptname
  
    pool.query('INSERT INTO department (deptname) VALUES ($1)', [name], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`department added`)
    })
  }

const updateEmployee = (request, response) => {
    const name = request.query.name
    const department= request.query.department
    pool.query('UPDATE employee SET department = $1 WHERE name = $2',[department, name],(error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`employee ${name} linked with dept ${department}`)
      }
    )
  }

const deleteEmployee = (request, response) => {
    const name = request.params.name
  
    pool.query('DELETE FROM employee WHERE name = $1', [name], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Employee deleted ${name}`)
    })
  }

const deleteDept = (request, response) => {
    const name = request.params.name
  
    pool.query('DELETE FROM department WHERE deptname = $1', [name], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Department deleted ${name}`)
    })
  }

module.exports = {
    getAllEmp,
    getAllDept,
    getEmployee,
    createEmployee,
    createDepartment,
    updateEmployee,
    deleteDept,
    deleteEmployee
}