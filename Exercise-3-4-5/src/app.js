import $ from "jquery";
import { ApplicationBase } from "./framework/application-base.js";
import { AddStudentPage } from "./pages/add-student-page.js";
import { StudentsPage } from "./pages/student-page.js";
import { HomePage } from "./pages/home-page.js";
import { FleetDataService } from "./services/fleet-data-service.js";




export class App extends ApplicationBase {
  constructor() {
    super("Internet Programming Final");
    this.dataService = new FleetDataService();
    let url = "https://ip-uacs.herokuapp.com/api/student";
    this.getData(url).then((fleet) => {
      this.dataService.loadData(fleet);

    });

    this.addRoute("Home", new HomePage(), true);
    this.addRoute("Student", new StudentsPage());
    this.addRoute("AddStudent", new AddStudentPage(), false, false);
 

    
   
  }
}

export let application = new App();
application.show($("body"));
