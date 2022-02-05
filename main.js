// 유저가 값을 입력한다
// +버튼을 하면 아이템이 추가된다.
// 유저가 delete 버튼을 누르면 할일이 삭제된다
// check 버튼을 누르면 할일이 끝나면서 밑줄이 그어진다
// 진행중 끝남, 언더바가 이동한다
// 끝난 탭은, 끝난 아이탭만, 진행중인 아이템만, 전체는 전체아이템으로 돌아옴

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div")
let mode = "all"
let filterList = []
let taskList = []


addButton.addEventListener("click", addTask);

for (let i=1; i<tabs.length; i++){
    tabs[i].addEventListener("click", function(event){filter(event)})
}

console.log(tabs)


function addTask(){
    let task = {
        id:randomIDgenerate(),
        taskContent: taskInput.value,
        isComplete: false
    }
    taskList.push(task);
    render()
    console.log(taskList)
}

function render(){
    let list = []
    if(mode == "all"){
        list = taskList
    }else if(mode == "ongoing" || mode == "done"){
        list = filterList
    }

    let resultHTML = '';
    for(let i=0;i<list.length;i++){
        if(list[i].isComplete == true){
            resultHTML += `<div class="task">
            <div class="task-done" > ${list[i].taskContent} </div> 
            <div>
                <button onclick="toggleComplete('${list[i].id}')">Check</button>
                <button onclick="deleteTask('${list[i].id}')">Delete</button>
            </div> 
        </div>`
        } else{
        resultHTML += `<div class="task">
            <div> ${list[i].taskContent} </div> 
            <div>
                <button onclick="toggleComplete('${list[i].id}')">Check</button>
                <button onclick="deleteTask('${list[i].id}')">Delete</button>
            </div> 
        </div>`;
        }
    }

    document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id){
    for(let i=0;i<taskList.length;i++){
        if(taskList[i].id == id){
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    render()
    console.log(taskList)
}

function deleteTask(id){
    for(let i=0; i<taskList.length;i++){
        if(taskList[i].id == id){
            taskList.splice(i,1)
            break;
        }
    }
    render()
}

function filter(event){
    mode = event.target.id
    filterList = []
    console.log("filter 클릭됨!", event.target.id);
    if(mode == "all"){
        render();
    }else if(mode == "ongoing"){
        for(let i=0; i<taskList.length; i++){
            if(taskList[i].isComplete == false){
                filterList.push(taskList[i]);
            }
        }
        render()
    } else if(mode == "done"){
        for(let i=0; i<taskList.length; i++){
            if(taskList[i].isComplete == true){
                filterList.push(taskList[i])
            }
        }
        render();
    }
} 

function randomIDgenerate(){
    return '_' + Math.random().toString(36).substr(2, 16);
}

console.log(randomIDgenerate)