const { Employee, Department, Designation } = require("../models");

// ✅ CREATE a New Employee
exports.createEmployee = async (req, res) => {
  try {
    const { FName, LName, DeptId, DesigId, Salary } = req.body;
    const employee = await Employee.create({ FName, LName, DeptId, DesigId, Salary });
    res.status(201).json({ message: "Employee added successfully", employee });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ GET All Employees
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.findAll({ include: [Department, Designation] });
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ UPDATE Employee Details
exports.updateEmployee = async (req, res) => {
  try {
    const { FName, LName, DeptId, DesigId, Salary } = req.body;
    const { id } = req.params;

    const employee = await Employee.findByPk(id);
    if (!employee) return res.status(404).json({ message: "Employee not found" });

    await employee.update({ FName, LName, DeptId, DesigId, Salary });
    res.json({ message: "Employee updated successfully", employee });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ DELETE an Employee
exports.deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findByPk(id);
    if (!employee) return res.status(404).json({ message: "Employee not found" });

    await employee.destroy();
    res.json({ message: "Employee deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
