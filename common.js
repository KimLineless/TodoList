// 유저가 값을 입력한다
//  +버튼을 클릭하면 할일 추가
// check버튼 누르면 할일 끝나면서 밑줄
// 1.체크버튼 클릭하면 트루 펄스 바꿈
// 2.트루이면 끝난거로 간주 밑줄
// 3.펄스이면 안끝난걸로 간주 그대로

// delete버튼을 누르면 할일 삭제
// 진행중 끝남 탭을 누르면, 언더바 이동
// 끝남탭은 끝난 아이템만, 진행중탭은 진행중 아이템만 나옴
// 전체탭 누르면 다시 전체아이템

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div");
let taskList = []; /* 리스트 배열 */
let mode = "all";
let fillterList = [];


addButton.addEventListener("click", addTask);

for (let i = 1; i < tabs.length; i++) {
    tabs[i].addEventListener("click", function (event) {
        fillter(event)
    });
}

function addTask() {
    let task = {
        id: randomIDGenerate(),
        taskContent: taskInput.value,
        isComplete: false
    }
    taskList.push(task);
    console.log(taskList);
    render();
}

function render() {
    let list = [];
    if(mode == "all"){
        list = taskList;
    } else if(mode == "ongoing" || mode == "done"){
        list = fillterList;
    } 

    let resultHTML = '';
    for (let i = 0; i < list.length; i++) {
        if (list[i].isComplete == true) {
            resultHTML += `<div class="task">
            <div class="task-done">${list[i].taskContent}</div>
            <div class="btn">
                <button onclick="toggleComplete('${list[i].id}')">Check</button>
                <button onclick="deleteTask('${list[i].id}')">Delete</button>
            </div>
        </div>`;
        } else {
            resultHTML += `<div class="task">
        <div>${list[i].taskContent}</div>
        <div class="btn">
            <button onclick="toggleComplete('${list[i].id}')">Check</button>
            <button onclick="deleteTask('${list[i].id}')">Delete</button>
        </div>
    </div>`;
        }

    }

    document.getElementById("task-borad").innerHTML = resultHTML;
}

function toggleComplete(id) {
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id == id) {
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    render();
}

function deleteTask(id) {
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id == id) {
            taskList.splice(i, 1);
            break;
        }
    }
    render();
}

function fillter(event) {
    mode = event.target.id;
    fillterList = [];

    document.getElementById("under-line").style.width =
        event.target.offsetWidth + "px";
    document.getElementById("under-line").style.top =
        event.target.offsetTop + event.target.offsetHeight + "px";
        document.getElementById("under-line").style.left =
        event.target.offsetLeft + "px";
    if (mode == "all"){
        render()
    } else if(mode == "ongoing") {
        for (let i=0;i<taskList.length;i++){
            if(taskList[i].isComplete == false){
                fillterList.push(taskList[i]);
            }
        }
        render();

    } else if(mode == "done") {
        for(let i=0; i<taskList.length;i++){
            if(taskList[i].isComplete == true){
                fillterList.push(taskList[i])
            }
        }
    }
    render();
}

function randomIDGenerate() {
    return (performance.now().toString(36) + Math.random().toString(36)).replace(/\./g, "");
}