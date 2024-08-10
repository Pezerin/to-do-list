export const projectManager = (function () {
    let projects = [];
    let activeProject = 0;

    const saveProjects = () => {
        localStorage.setItem("projects", JSON.stringify(projects));
        localStorage.setItem("activeProject", JSON.stringify(activeProject));
    };

    const loadProjects = () => {
        const savedProjects = JSON.parse(localStorage.getItem("projects"));
        const savedActiveProject = JSON.parse(localStorage.getItem("activeProject"));
    
        if (savedProjects) {
            for (let i = 0; i < savedProjects.length; i++) {
                const project = createProject(savedProjects[i].title);
    
                for (let j = 0; j < savedProjects[i].todos.length; j++) {
                    const todo = savedProjects[i].todos[j];
                    project.addTodo(
                        todo.title,
                        todo.desc,
                        todo.due,
                        todo.priority,
                        todo.isDone
                    );
                }
    
                projects.push(project);
            }
        } 
        
        if (savedProjects.length < 1) {
            addProject("Project");
        }
    
        if (savedActiveProject !== null) {
            activeProject = savedActiveProject;
        }
    };

    function createProject(title) {
        let todos = [];

        function createTodo(title, desc, due, priority, isDone) {
            const toggleDone = () => isDone = !isDone;
            
            return { title, desc, due, priority, isDone, toggleDone };
        }
    
        const addTodo = (title, desc, due, priority, isDone) => {
            const todo = createTodo(title, desc, due, priority, isDone);
            todos.push(todo);
            saveProjects();
        };
    
        const editTodo = (i, title, desc, due, priority) => {
            todos[i].title = title;
            todos[i].desc = desc;
            todos[i].due = due;
            todos[i].priority = priority;
            saveProjects();
        };
    
        const deleteTodo = (i) => {
            todos.splice(i, 1);
            saveProjects();
        }
    
        return { title, todos, addTodo, editTodo, deleteTodo };
    }

    function addProject(title) {
        const project = createProject(title);
        projects.push(project);
        saveProjects();
    }

    function editProject(i, title) {
        projects[i].title = title;
        saveProjects();
    }

    const deleteProject = (i) => {
        projects.splice(i, 1);
        saveProjects();
    }

    return { projects, activeProject, saveProjects, loadProjects, addProject, editProject, deleteProject };
})();