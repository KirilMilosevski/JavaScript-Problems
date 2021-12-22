
import { DataError } from "./data-error.js";
import { Student } from"../classes/student.js";

export class FleetDataService {
  constructor() {

    this.student=[];
    this.errors = [];
  }

  loadData(fleet) {
    for (let data of fleet) {
      switch (data.type) {
        case "Student":
          if (this.validateStudentData(data)) {
            let student = this.loadStudent(data);
            if (student) this.student.push(student);
          } else {
            let e = new DataError("Invalid data type", data);
            this.errors.push(e);
          }
          break;
        }
    }
  }

  loadStudent(data) {
    try {
      let student = new Student(data.id, data.firstName, data.lastName);
      student.email = data.email;
      return student;
    } catch (e) {
      this.errors.push(new DataError("error loading student", data));
    }
    return null;
  }

  validateStudentData(data) {
    let requiredProps = "id firstName lastName email".split(" ");
    let hasErrors = false;
    for (let field of requiredProps) {
      if (!data[field]) {
        this.errors.push(new DataError(`Invalid field ${field}`, data));
        hasErrors = true;
      }
    }
    if (Number.isNaN(Number.parseFloat(data.id))){
      this.errors.push(new DataError(`Invalid Id`, data));
      hasErrors = true;


    if (this.stringNullOrEmpty(data.firstName)) {
      this.errors.push(new DataError(`Invalid Name`, data));
      hasErrors = true;
    }
    if (this.stringNullOrEmpty(data.lastName)) {
      this.errors.push(new DataError(`Invalid Last Name`, data));
      hasErrors = true;
    }
    if (this.stringNullOrEmpty(data.email)) {
      this.errors.push(new DataError(`Invalid email`, data));
      hasErrors = true;
    }
    return !hasErrors;
  }

  
  }
  stringNullOrEmpty(str) {
    return (
      typeof str == "undefined" ||
      !str ||
      str.length === 0 ||
      str === "" ||
      !/[^\s]/.test(str) ||
      /^\s*$/.test(str) ||
      str.replace(/\s/g, "") === ""
    );
  }

}

