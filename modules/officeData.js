const fs = require("fs");

class Data {
  constructor(employees, classes) {
    this.employees = employees;
    this.classes = classes;
  }
}

let dataCollection = null;

module.exports.initialize = function () {
  return new Promise((resolve, reject) => {
    fs.readFile("./data/classes.json", "utf8", (err, classesData) => {
      if (err) {
        reject("Unable to load classes");
        return;
      }

      fs.readFile("./data/employees.json", "utf8", (err, employeeData) => {
        if (err) {
          reject("Unable to load employees");
          return;
        }

        dataCollection = new Data(
          JSON.parse(employeeData),
          JSON.parse(classesData)
        );
        resolve();
      });
    });
  });
};

module.exports.getAllEmployees = function () {
  return new Promise((resolve, reject) => {
    if (dataCollection.employees.length === 0) {
      reject("Query returned 0 results");
      return;
    }

    resolve(dataCollection.employees);
  });
};

module.exports.getEAs = function () {
  return new Promise((resolve, reject) => {
    const filteredEmployees = dataCollection.employees.filter(
      (employee) => employee.EA === true
    );

    if (filteredEmployees.length === 0) {
      reject("Query returned 0 results");
      return;
    }

    resolve(filteredEmployees);
  });
};

module.exports.getPartTimers = function () {
  return new Promise((resolve, reject) => {
    const filteredEmployees = dataCollection.employees.filter(
      (employee) => employee.status === "Part Time"
    );

    if (filteredEmployees.length === 0) {
      reject("Query returned 0 results");
      return;
    }

    resolve(filteredEmployees);
  });
};

module.exports.getEmployeesByNum = function (num) {
  return new Promise((resolve, reject) => {
    const employee = dataCollection.employees.find(
      (employee) => employee.employeeNum === num
    );

    if (!employee) {
      reject("No results returned");
      return;
    }

    resolve(employee);
  });
};

module.exports.getClasses = function () {
  return new Promise((resolve, reject) => {
    if (dataCollection.classes.length === 0) {
      reject("Query returned 0 results");
      return;
    }

    resolve(dataCollection.classes);
  });
};
