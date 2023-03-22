   
   const todoInput=document.querySelector('.add-task');
   const todoButton=document.querySelector('.todo-button');
   const todoList=document.querySelector('.todo-list');
   const taskCounter= document.getElementById('tasks-counter');


   document.addEventListener('DOMContentLoaded', renderList);
   todoButton.addEventListener('click', addToDo);
   todoList.addEventListener('click', deleteCheck);  


  function addToDo(event){
     //prevent form from submitting
    event.preventDefault();
    console.log("Add To Do Function Call")
    const todoDiv=document.createElement("div");
    todoDiv.classList.add("todo");
    const li=document.createElement('li');
     li.innerHTML=`<input type="checkbox" class="task-checked">
      <label for="6878">${todoInput.value}</label>
      <img src="trash-solid.svg" class="delete" data-id="test" />`;
      // Save to Local Storage
     saveLocalTodos(todoInput.value);
     todoDiv.appendChild(li); 
     todoList.appendChild(todoDiv);  
     //clear todo Input value
    todoInput.value="";
    renderTaskCount(getTodos());
   
  }
  

  function renderTaskCount(todos){
    taskCounter.innerHTML=todos.length;

  }

   
  function renderList(){
        let todos=getTodos();
       console.log('Render Todos ...', todos)
       console.log(todos.length);
       todos.forEach(function(todo){
       const todoDiv=document.createElement("div");
      todoDiv.classList.add("todo");
      const li=document.createElement('li');
      li.innerHTML=`<input type="checkbox" class="task-checked">
      <label for="6878">${todo}</label>
      <img src="trash-solid.svg" class="delete" data-id="test" />`;
      todoDiv.appendChild(li); 
      todoList.appendChild(todoDiv);  
     //clear todo Input value
      todoInput.value="";
     

  })

  
     renderTaskCount(todos);
       
 }


function deleteCheck(e){
    console.log(e.target);
    const item=e.target;

    if(item.classList[0]=="delete"){
        const todo=item.parentElement;
        removeFromLocalStorage(todo);
        todo.remove();
        
        
    }

    if(item.classList[0]=="task-checked"){
        const todo=item.parentElement;
        todo.parentElement.classList.toggle("completed");

    }
}


function selectFilter(){
    var filterList = document.getElementById("filterTodo");
  var selFilter = filterList.options[filterList.selectedIndex].value;
  console.log(selFilter);
 
  const todos=todoList.childNodes;
  console.log(todos);
  todos.forEach(function(todo){
      switch(selFilter){
          case "all":
               todo.style.display="flex";
               break;
          case "completed":
              if(todo.classList.contains("completed")){
                  console.log("completed selected");
                  todo.style.display="flex";
              } else {
                  todo.style.display="none";
              }
              break;
           case "uncompleted": 
           if(!todo.classList.contains("completed")){
              todo.style.display="flex";
          } else {
              todo.style.display="none";
          }
          break;
      }
  });
}


function saveLocalTodos(todo){

    //checl already there 
    let todos;
    if(localStorage.getItem('todos')==null){
        todos=[];
    } else {
        console.log(JSON.parse(localStorage.getItem('todos')));
        todos=JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));


}
 
function getTodos(){
    let todos;
    if(localStorage.getItem('todos')==null){
        todos=[];
    } else {
        todos=JSON.parse(localStorage.getItem('todos'));
    }
    return todos;
}

function removeFromLocalStorage(todo){
    let todos=getTodos();
    console.log(todos);
    console.log(todo.children[0].innerText); 
    const todoIndex=todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
    renderTaskCount(todos);

} 