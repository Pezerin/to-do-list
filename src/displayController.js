import { projectManager } from "./projectManager";

export const displayController = (function () {
    const projects = document.querySelector("#projects");
    const addProjectButton = document.querySelector("#add-project");

    const projectDialog = document.querySelector("#project-dialog");
    const projectTitle = document.querySelector("#project-title");
    const submitProject = document.querySelector("#submit-project");

    const projectHeader = document.querySelector("#project-header");
    const addTaskButton = document.querySelector("#add-task");
    
    const taskDialog = document.querySelector("#task-dialog");
    const taskTitle = document.querySelector("#task-title");
    const desc = document.querySelector("#desc");
    const due = document.querySelector("#due");
    const priority = document.querySelector("#priority");
    const submitTask = document.querySelector("#submit-task");

    const tasks = document.querySelector("#tasks");

    projectManager.addProject("Project");

    addProjectButton.addEventListener("click", () => {
        projectDialog.showModal();
    });

    submitProject.addEventListener("click", () => {
        const title = projectTitle.value;
        projectManager.addProject(title);
    });

    addTaskButton.addEventListener("click", () => {
        taskDialog.showModal();
    });

    submitTask.addEventListener("click", () => {
        const title = taskTitle.value;
        const description = desc.value;
        const dueDate = due.value;
        const taskPriority = priority.value;

        projectManager.projects[projectManager.activeProject].addTodo(
            title, description, dueDate, taskPriority, false
        );
    });
})();