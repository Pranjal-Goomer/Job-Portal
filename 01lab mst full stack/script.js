function addTask(){

    let taskInput = document.getElementById("taskInput");
    let priority = document.getElementById("priority").value;
    let taskList = document.getElementById("taskList");

    if(taskInput.value === ""){
        alert("Please enter a task");
        return;
    }

    let li = document.createElement("li");

    let taskText = document.createElement("span");
    taskText.innerText = taskInput.value + " (" + priority + ") ";

    let completeBtn = document.createElement("button");
    completeBtn.innerText = "Complete";

    let deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";

    completeBtn.onclick = function(){
        li.classList.toggle("completed");
    }

    deleteBtn.onclick = function(){
        li.remove();
    }

    li.appendChild(taskText);
    li.appendChild(completeBtn);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);

    taskInput.value = "";
}


function filterTasks(type){

    let tasks = document.querySelectorAll("#taskList li");

    tasks.forEach(function(task){

        if(type === "all"){
            task.style.display = "list-item";
        }

        else if(type === "completed"){
            if(task.classList.contains("completed")){
                task.style.display = "list-item";
            }else{
                task.style.display = "none";
            }
        }

        else if(type === "pending"){
            if(!task.classList.contains("completed")){
                task.style.display = "list-item";
            }else{
                task.style.display = "none";
            }
        }

    });

}