const form= document.querySelector("#todo-form");
const todoInput= document.querySelector("#todo");
const todoList=document.querySelector(".list-group");
const firstCardBody=document.querySelectorAll(".card-body")[0];
const secondCardBody=document.querySelectorAll(".card-body")[1];
const filter =document.querySelector("#filter");
const clearButton=document.querySelector("#clear-todos");

eventListeners()

function eventListeners(){
form.addEventListener("submit",addTodo);
document.addEventListener("DOMContentLoaded",loadAllTodosToUI);
secondCardBody.addEventListener("click",deleteTodo);
filter.addEventListener("keyup",filterTodos);
clearButton.addEventListener("click",clearAllTodos);


}

function clearAllTodos(e){
    
    while(todoList.firstElementChild !=null){
        todoList.removeChild(todoList.firstElementChild);
        console.log(todoList.firstElementChild);
    }
    localStorage.removeItem("todos");
    
}


function filterTodos(e){
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");
    listItems.forEach(function(lisItem){
        const text = lisItem.textContent.toLowerCase();
        if(text.indexOf(filterValue) === -1){
            lisItem.setAttribute("style","display : none !important");
        }
        else{
            lisItem.setAttribute("style","display : block");
        }
    })

}


function deleteTodo(e){
    if(e.target.className === "fa fa-remove"){
        e.target.parentElement.parentElement.remove();
        deleteTodofromStorage(e.target.parentElement.parentElement.textContent);
    showAlert("success","Todo başarıyla silindi...");
}    


}

function deleteTodofromStorage(deletetodo){
    let todos=gettodosfromStorage();

    todos.forEach(function(todo,index){
        if(todo === deletetodo){
            todos.splice(index,1);
        }
    });
    localStorage.setItem("todos",JSON.stringify(todos));
}
function loadAllTodosToUI(){
   let todos= gettodosfromStorage();
   todos.forEach(function(todo){
    addTodoToUı(todo);

   })
}
function addTodo(e){
    

   const newTodo=todoInput.value.trim();
   if(newTodo === ""){

    showAlert("danger","Lütfen bit todo girin..");
   }
   else{
   addTodoToUı(newTodo)
   addTodoToStorage(newTodo)
   showAlert("success","todo başarıyla eklendi.");

}
   
    e.preventDefault();

}
function gettodosfromStorage(){
    let todos;
    if(localStorage.getItem("todos")===null){
        todos=[];
    }
    else{
        todos=JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}
function addTodoToStorage(newTodo){
let todos=gettodosfromStorage();
todos.push(newTodo);
localStorage.setItem("todos",JSON.stringify(todos));

}
function showAlert(type,message){
    const alert=document.createElement("div");
    alert.className=`alert alert-${type}`;
    alert.textContent=message;
    firstCardBody.appendChild(alert);
    setTimeout(function(){
        alert.remove();
    },1000);

}
function addTodoToUı(newTodo){
//     <!-- <li class="list-group-item d-flex justify-content-between">
//     Todo 1
//     <a href = "#" class ="delete-item">
//         <i class = "fa fa-remove"></i>
//     </a>

// </li>-->
const listitem=document.createElement("li");
const link=document.createElement("a");
link.href="#";
link.className="delete-item";
link.innerHTML="<i class = 'fa fa-remove'></i>";

listitem.className = "list-group-item d-flex justify-content-between";

listitem.appendChild(document.createTextNode(newTodo));
listitem.appendChild(link);

todoList.appendChild(listitem); 
todoInput.value= "";

}


