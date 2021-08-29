const employees = require('../models/employees')

module.exports.getEmployees = async (req, res) => {
    try {
        const employeeItem = await employees.find()
        res.status(200).json(employeeItem)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports.createEmployee = async (req, res) => {
    try {
        const newEmployeeItem = new employees(req.body)
        const employeeItem = await newEmployeeItem.save()
        if (!employeeItem) throw new Error('Something went wrong')
        res.status(200).json(employeeItem)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports.editEmployee = async (req, res) => {
    const { id } = req.params

    try {
        const response = await employees.findByIdAndUpdate(id, req.body)
        if (!response) throw Error('Something went wrong ')
        const updated = { ...response._doc, ...req.body }
        res.status(200).json(updated)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports.deleteEmployee = async (req, res) => {
    const { id } = req.params
    try {
        const removed = await employees.findByIdAndDelete(id)
        if (!removed) throw Error('Something went wrong ')
        res.status(200).json(removed)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}