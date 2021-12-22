import { application } from "../app.js";
import { Page } from "../framework/page.js";
import { Button } from "../ui/button.js";
import { DataTable } from "../ui/data-table.js";

export class StudentsPage extends Page {
  constructor() {
    super("Student");
  }

  createElement() {
    super.createElement();

    let headers = [];
    headers.push("Id");
    headers.push("First Name");
    headers.push("Last Name");
    headers.push("Email");

    let dt = new DataTable(headers, application.dataService.student);
    dt.appendToElement(this.element);

    let styleString = "margin: 10px;";
    let b = new Button("Add New Student");
    b.setStyleString(styleString);
    b.appendToElement(this.element);
    application.addRoute;
    b.element.click(() => application.activateRoute("AddStudent"));
  }
  getElementString() {
    return '<div style="margin: 20px;"><h3>Students</h3></div>';
  }
}
