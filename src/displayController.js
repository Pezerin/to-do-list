import { projectManager } from "./projectManager";
import pencil from "./icons/pencil.svg";
import trash from "./icons/delete.svg";

export const displayController = (function () {
    const projects = document.querySelector("#projects");
    const addProjectButton = document.querySelector("#add-project");

    const projectDialog = document.querySelector("#project-dialog");
    const projectForm = document.querySelector("#project-form");
    let editProject = false;
    let editProjectIndex = null;

    const projectTitle = document.querySelector("#project-title");
    const submitProject = document.querySelector("#submit-project");

    const projectHeader = document.querySelector("#project-header");
    const addTaskButton = document.querySelector("#add-task");
    
    const taskDialog = document.querySelector("#task-dialog");
    const taskForm = document.querySelector("#task-form");
    let editTask = false;
    let editTaskIndex = null;

    const taskTitle = document.querySelector("#task-title");
    const desc = document.querySelector("#desc");
    const due = document.querySelector("#due");
    const priority = document.querySelector("#priority");
    const submitTask = document.querySelector("#submit-task");

    const tasks = document.querySelector("#tasks");

    const displayProjects = () => {
        projects.innerHTML = "";

        for (let i = 0; i < projectManager.projects.length; i++) {

            const div = document.createElement("div");
            div.classList.add("project");

            const button = document.createElement("button");
            button.classList.add(`${i}`);

            button.addEventListener("click", () => {
                projectManager.activeProject = i;
                displayTasks();
            });

            const h2 = document.createElement("h2");
            h2.textContent = projectManager.projects[i].title;
            button.appendChild(h2);

            const icons = document.createElement("div");
            icons.classList.add("icons");

            const editButton = document.createElement("button");
            editButton.classList.add(`${i}`);

            editButton.addEventListener("click", () => {
                projectForm.reset();
                projectTitle.value = projectManager.projects[i].title;
                editProject = true;
                editProjectIndex = i;
                projectDialog.showModal();
            });

            const deleteButton = document.createElement("button");
            deleteButton.classList.add(`${i}`);

            deleteButton.addEventListener("click", () => {
                projectManager.deleteProject(i);
                displayProjects();

                if (projectManager.projects.length > 0) {
                    projectManager.activeProject = Math.max(0, i-1);
                    displayTasks();
                } else {
                    projectHeader.textContent = "";
                    tasks.innerHTML = "";
                }
            });

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
        }
    };

    const displayTasks = () => {
        tasks.innerHTML = "";
        const project = projectManager.projects[projectManager.activeProject];

        projectHeader.textContent = project.title;

        for (let i = 0; i < project.todos.length; i++) {
            let todo = project.todos[i];

            const div = document.createElement("div");
            div.classList.add("task");

            if (todo.priority === "Low") {
                div.classList.add("low");
            } else if (todo.priority === "Medium") {
                div.classList.add("medium");
            } else {
                div.classList.add("high");
            }    
            const title = document.createElement("h2");
            title.textContent = todo.title;

            const taskDesc = document.createElement("p");
            taskDesc.textContent = todo.desc;

            const taskDue = document.createElement("p");
            taskDue.textContent = todo.due;
            
            const taskPriority = document.createElement("p");
            taskPriority.textContent = todo.priority;

            const icons = document.createElement("div");
            icons.classList.add("icons");

            const editButton = document.createElement("button");
            editButton.classList.add(`${i}`);

            editButton.addEventListener("click", () => {
                taskForm.reset();
                taskTitle.value = todo.title;
                desc.value = todo.desc;
                due.value = todo.due;
                priority.value = todo.priority;
                editTask = true;
                editTaskIndex = i;
                taskDialog.showModal();
            });

            const deleteButton = document.createElement("button");
            deleteButton.classList.add(`${i}`);

            deleteButton.addEventListener("click", () => {
                projectManager.projects[projectManager.activeProject].deleteTodo(i);
                displayTasks();
            });

            const edit = new Image();
            edit.src = pencil;
            edit.width = 30;
            editButton.appendChild(edit);

            const remove = new Image();
            remove.src = trash;
            remove.width = 30;
            deleteButton.appendChild(remove);

            icons.appendChild(editButton);
            icons.appendChild(deleteButton);

            div.appendChild(title);
            div.appendChild(taskDesc);
            div.appendChild(taskDue);
            div.appendChild(taskPriority);
            div.appendChild(icons);

            tasks.appendChild(div);
        }
    };

    const validateProjectForm = () => {
        return projectTitle.value.trim() !== "";
    };

    const validateTaskForm = () => {
        return taskTitle.value.trim() !== "" && desc.value.trim() !== "" && due.value.trim() !== "" && priority.value.trim() !== "";
    };

    projectManager.addProject("Project");
    displayProjects();

    addProjectButton.addEventListener("click", () => {
        projectForm.reset();
        projectDialog.showModal();
    });

    submitProject.addEventListener("click", () => {
        if (!validateProjectForm()) {
            return;
        }

        if (!editProject) {
            const title = projectTitle.value;
            projectManager.addProject(title);
            displayProjects();

            projectManager.activeProject = projectManager.projects.length - 1;
            displayTasks();
        } else {
            const title = projectTitle.value;
            projectManager.editProject(editProjectIndex, title);
            projectManager.activeProject = editProjectIndex;
            editProject = false;
            displayProjects();
            displayTasks();
        }
    });

    addTaskButton.addEventListener("click", () => {
        taskForm.reset();
        taskDialog.showModal();
    });

    submitTask.addEventListener("click", () => {
        if (!validateTaskForm()) {
            return;
        }

        if (!editTask) {
            const title = taskTitle.value;
            const description = desc.value;
            const dueDate = due.value;
            const taskPriority = priority.value;

            projectManager.projects[projectManager.activeProject].addTodo(
                title, description, dueDate, taskPriority, false
            );

            displayTasks();
        } else {
            const title = taskTitle.value;
            const description = desc.value;
            const dueDate = due.value;
            const taskPriority = priority.value;

            projectManager.projects[projectManager.activeProject].editTodo(
                editTaskIndex, title, description, dueDate, taskPriority
            );

            editTask = false;

            displayTasks();
        }
    });

    return { displayProjects, displayTasks };
})();