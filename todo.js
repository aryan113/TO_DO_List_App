(function(){
    let tasks = [];
    const taskList = document.getElementById('list');
    const addTaskInput = document.getElementById('add');
    const tasksCounter = document.getElementById('tasks-counter');

    //API call
    async function fetchTodos(){
        //GET request
        // fetch('https://jsonplaceholder.typicode.com/todos')
        // .then(function(response){
        //     return response.json();
        // }).then(function(data){
        //     tasks=data.slice(0,10);
        //     renderList();
        // })
        // .catch(function(error){
        //     console.log("Error",error);
        // })
        try{
            const response = await fetch('https://jsonplaceholder.typicode.com/todos');
            const data = await response.json();
            tasks = data.slice(0,100);
            renderList();
        } catch(error) {
            console.log(error);
        }
    }

    function addTaskToDOM(task){

        const li=document.createElement('li');
        li.innerHTML = `  
            <input type="checkbox" id="${task.id}" ${task.completed ? 'checked' : ''} class="custom-checkbox">
            <label for="${task.id}">${task.title}</label>
            <img src="delete.png" class="delete" data-id="${task.id}" />
    `;
        taskList.append(li);
    }
    function renderList () {
        taskList.innerHTML='';
        for(let i=0;i<tasks.length;i++){
            addTaskToDOM(tasks[i]);
        }
        tasksCounter.innerHTML=tasks.length;
    }

    function toggledTask (taskId) {
        const task = tasks.filter(task=> task.id===Number(taskId));
        if(task.length>0){
            task[0].completed=!task[0].completed;
        }
        renderList();
        showNotification('Task toggled successfully');
    }

    function deleteTask (taskId) {
        const newTasks = tasks.filter(task => task.id!==Number(taskId));
        tasks = newTasks;
        renderList();
        showNotification('Task deleted successfully');
    }

    function addTask (task) {
        if(task){
            tasks.push(task);
            renderList();
            showNotification('Task added successfully');
            return;
        }
        showNotification('Task can not be added');
    }

    function showNotification(text) {
        alert(text);
    }

    function handlerInputKeypress(e) {
        if(e.key ==='Enter'){
            const text = e.target.value;

            console.log(text);

            if(!text){
                showNotification('Tast text can not be empty');
                return;
            }

            const task= {
                title: text,
                id: Date.now(),
                completed: false
            }

            e.target.value = '';
            addTask(task);
        }

    }

    function handleClickListener(e){
        const target = e.target;
        console.log(target);

        if(target.className === 'delete') {
            const taskId = target.dataset.id;
            deleteTask(taskId);
            return;
        } else if(target.className === 'custom-checkbox'){
            const taskId= target.id;
            toggledTask(taskId);
            return;
        }
    }



    function initializeApp(){
        fetchTodos();
        addTaskInput.addEventListener('keyup',handlerInputKeypress);
        document.addEventListener('click', handleClickListener);
    }

    initializeApp();
})();


