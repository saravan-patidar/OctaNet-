const inputText = document.querySelector("#input-task");
const listContainer = document.querySelector(".list-container");
const addBtn = document.querySelector("#addTask");
const countValue = document.querySelector(".count-value");
const error = document.querySelector(".error");


let taskCount = 0;

const displayCount = (taskCount) => {
    countValue.innerText = taskCount;
}

const addTask = () => {
    const taskName = inputText.value.trim();
    error.style.display = "none";
    if (!taskName) {
        setTimeout(() => {
            error.style.display = "block";
        }, 200);
        return;
    }
    const li = document.createElement("li");
    li.innerHTML = `<input type="checkbox" class="task-check">  ${taskName} <button class="edit-btn"><i class="fa-solid fa-pen-to-square"></i></button><button class="delete-btn"><i class="fa-solid fa-trash"></i></button>`
    li.classList.add("list-items");
    listContainer.appendChild(li);
    inputText.value = '';
    saveData();
}
addBtn.addEventListener('click', addTask);


listContainer.addEventListener('click', (e) => {
    if (e.target.parentElement.classList.contains("delete-btn")) {
        const isCompleted = e.target.parentElement.parentElement.classList.contains("completed");
        e.target.parentElement.parentElement.remove();
        if(isCompleted){
            taskCount--;
            displayCount(taskCount);
        }
       
    }
    else if (e.target.parentElement.classList.contains('edit-btn')) {
        const taskText = e.target.parentElement.parentElement.textContent.trim();
        const taskInput = document.createElement('input');
        taskInput.value = taskText;
        let parent = e.target.parentElement.parentElement;

        e.target.parentElement.parentElement.innerHTML = '';
        console.log(parent.parentElement);
        parent.appendChild(taskInput);
        taskInput.addEventListener('keydown', (e) => {
            console.log(e.key)
            if (e.key === 'Enter') {
                const newText = taskInput.value.trim();
                if (newText !== '') {
                    e.target.parentElement.innerHTML = `<input type="checkbox" class="task-check"> ${newText} <button class="edit-btn"><i class="fa-solid fa-pen-to-square"></i></button><button class="delete-btn"><i class="fa-solid fa-trash"></i></button>`;
                }
                saveData();
            }
        })

    }
    saveData();
});

listContainer.addEventListener('change',(e)=>{
    if(e.target.tagName === 'INPUT' && e.target.type === 'checkbox'){
        e.target.parentElement.classList.toggle("completed");
        if(e.target.checked){
            taskCount++;
        }else{
            taskCount--;
        }
        displayCount(taskCount);
        saveData();
    }
});



function saveData(){
    localStorage.setItem("data",listContainer.innerHTML)
}

function showTask(){
    listContainer.innerHTML=localStorage.getItem("data");
}

showTask();