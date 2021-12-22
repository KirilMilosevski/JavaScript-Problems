import { application } from "../app.js";
import { Student } from "../classes/student.js";
import { Page } from "../framework/page.js";
import { Button } from "../ui/button.js";
import { Number } from "../ui/number.js";
import { Text } from "../ui/text.js";

export class AddStudentPage extends Page {
  constructor() {
    super("Add New Student");
  }

  createElement() {
    super.createElement();

    let id = new Number("txtId", "Id");
    id.appendToElement(this.element);

    let firstName = new  Text("txtFirstName", "FirstName");
    firstName.appendToElement(this.element);

    let lastName = new  Text("txtLastName", "LastName");
    lastName.appendToElement(this.element);

    let email = new Text("txtEmail", "Email");
    email.appendToElement(this.element);

   

    let btn = new Button("Save");
    btn.appendToElement(this.element);
    btn.element.click(() =>
      this.saveStudent(
        id.getValue(),
        firstName.getValue(),
        lastName.getValue(),
        email.getValue()
      )
    );
  }

  getElementString() {
    return '<div style="margin:20px;"><h3>New Student</h3></div>';
  }

  saveStudent(id, firstName, lastName, email) {
    let student = new Student(id, firstName, lastName, email);
    console.log(student);
    application
      .postData("https://ip-uacs.herokuapp.com/api/student", student)
      .then((result) => {
        console.log(result);
      });
  }
}
