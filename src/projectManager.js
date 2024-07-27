const projectManager = (function () {
    let projects = [];

    function createProject(title) {
        let todos = [];

        function createTodo(title, desc, due, priority, isDone) {
            const toggleDone = () => isDone = !isDone;
            
            return { title, desc, due, priority, isDone, toggleDone };
        }
    
        const addTodo = (title, desc, due, priority, isDone) => {
            todo = createTodo(title, desc, due, priority, isDone);
            todos.push(todo);
        };
    
        const editTodo = (i, title, desc, due, priority) => {
            todos[i].title = title;
            todos[i].desc = desc;
            todos[i].due = due;
            todos[i].priority = priority;
        };
    
        const deleteTodo = (i) => todos.splice(i, 1);
    
        return { title, todos, addTodo, editTodo, deleteTodo };
    }

    function addProject(title) {
        project = createProject(title);
        projects.push(project);
    }

    function editProject(i, title) {
        projects[i].title = title;
    }

    const deleteProject = (i) => projects.splice(i, 1);

    return { projects, addProject, editProject, deleteProject };
})();