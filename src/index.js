import "./styles.css";
import { displayController  } from "./displayController";
import { projectManager } from "./projectManager";

projectManager.loadProjects();
displayController.displayProjects();
if (projectManager.projects.length > 0) {
    displayController.displayTasks();
}