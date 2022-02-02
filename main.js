// 유저가 값을 입력한다
// +버튼을 하면 아이템이 추가된다.
// 유저가 delete 버튼을 누르면 할일이 삭제된다
// check 버튼을 누르면 할일이 끝나면서 밑줄이 그어진다
// 진행중 끝남, 언더바가 이동한다
// 끝난 탭은, 끝난 아이탭만, 진행중인 아이템만, 전체는 전체아이템으로 돌아옴

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let taskList = []


addButton.addEventListener("click", addTask);


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
    let resultHTML = '';
    for(let i=0;i<taskList.length;i++){
        if(taskList[i].isComplete == true){
            resultHTML += `<div class="task">
            <div class="task-done" > ${taskList[i].taskContent} </div> 
            <div>
                <button onclick="toggleComplete('${taskList[i].id}')">Check</button>
                <button onclick="deleteTask()">Delete</button>
            </div> 
        </div>`
        } else{
        resultHTML += `<div class="task">
            <div> ${taskList[i].taskContent} </div> 
            <div>
                <button onclick="toggleComplete('${taskList[i].id}')">Check</button>
                <button onclick="deleteTask()">Delete</button>
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

function deleteTask(){
    console.log("삭제하다")
}

function randomIDgenerate(){
    return '_' + Math.random().toString(36).substr(2, 16);
}

