import { projectManager } from "./projectManager";
import pencil from "./icons/pencil.svg";
import trash from "./icons/delete.svg";

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

    const displayProjects = () => {
        projects.innerHTML = "";

        projectManager.projects.forEach(project => {

            const div = document.createElement("div");
            div.classList.add("project");

            const button = document.createElement("button");

            const h2 = document.createElement("h2");
            h2.textContent = project.title;
            button.appendChild(h2);

            const icons = document.createElement("div");
            icons.classList.add("icons");
            const editButton = document.createElement("button");
            const deleteButton = document.createElement("button");

            const edit = new Image();
            edit.src = pencil;
            edit.width = 20;
            editButton.appendChild(edit);

            const remove = new Image();
            remove.src = trash;
            remove.width = 20;
            deleteButton.appendChild(remove);

            icons.appendChild(editButton);
            icons.appendChild(deleteButton);

            div.appendChild(button);
            div.appendChild(icons);

            projects.appendChild(div);
        });
    };

    projectManager.addProject("Project");
    displayProjects();

    addProjectButton.addEventListener("click", () => {
        projectDialog.showModal();
    });

    submitProject.addEventListener("click", () => {
        const title = projectTitle.value;
        projectManager.addProject(title);
        displayProjects();
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

    return { displayProjects };
})();