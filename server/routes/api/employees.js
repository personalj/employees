const { Router } = require('express')
const router = Router()

const { getEmployees, createEmployee, editEmployee, deleteEmployee } = require('../../controllers/employees')

router.get('/', getEmployees )

router.post('/', createEmployee )

router.put('/:id', editEmployee)

router.delete('/:id', deleteEmployee)

module.exports = router