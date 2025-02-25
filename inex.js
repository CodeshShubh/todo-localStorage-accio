document.addEventListener("DOMContentLoaded", () => {
  let todayTasks = JSON.parse(localStorage.getItem("todayTasks")) || [];
  let futureTasks = JSON.parse(localStorage.getItem("futureTasks")) || [];
  let completedTasks = JSON.parse(localStorage.getItem("completedTasks")) || [];

//   console.log("global todayTasks arr", todayTasks);
//   console.log("globel future task", futureTasks);
//   console.log("global completed arr", completedTasks);

  function getTaskInputs() {
    return {
      taskName: document.getElementById("task_name").value.trim(),
      selectedDate: document.getElementById("selected_date").value,
      selectedOption: document.getElementById("selected_option").value,
    };
  }
  let addBtn = document.getElementById("add_btn");

  addBtn.addEventListener("click", AddTask);

  function AddTask() {
    let { taskName, selectedDate, selectedOption } = getTaskInputs();
    // console.log(taskName, selectedDate , selectedOption);
    if (taskName == "" || selectedDate == "" || selectedOption == "Priority") {
      alert("Please Enter Task first with all Details  😡");
    } else if (
      new Date(selectedDate).setHours(0, 0, 0, 0) <
      new Date().setHours(0, 0, 0, 0)
    ) {
      alert("you can not Enter Past Date 😡");
    } else if (
      new Date(selectedDate).setHours(0, 0, 0, 0) ===
      new Date().setHours(0, 0, 0, 0)
    ) {
      // alert('you Task is added 😡')
      let task = {
        taskName: taskName,
        selectedDate: selectedDate,
        selectedOption: selectedOption,
      };
      todayTasks.push(task);
      PushOnPriorityBasis(todayTasks, "todayTasks"); // sending parameter to the function
      //  localStorage.setItem('todayTasks', JSON.stringify(todayTasks))
    } else if (
      new Date(selectedDate).setHours(0, 0, 0, 0) >
      new Date().setHours(0, 0, 0, 0)
    ) {
      let task = {
        taskName: taskName,
        selectedDate: selectedDate,
        selectedOption: selectedOption,
      };
      futureTasks.push(task);
      PushOnPriorityBasis(futureTasks, "futureTasks"); // sending parameter to the function
      //  localStorage.setItem('futureTasks', JSON.stringify(futureTasks))
    }
    renderTodayTasks();
    renderFutureTasks();
  }

  // this is for store tasks on prority basis
  function PushOnPriorityBasis(tasks, key) {
    const prority = {
      High: 1,
      Medium: 2,
      Low: 3,
    };

    tasks.sort((a, b) => prority[a.selectedOption] - prority[b.selectedOption]);

    localStorage.setItem(key, JSON.stringify(tasks));
  }

  // setting today date object
  function nowDate() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = String(now.getFullYear());
    const today = `${year}-${month}-${day}`;
    return { today: today };
  }

  function renderTodayTasks() {
    let { today } = nowDate();
    let todayList = document.getElementById("today_list");
    todayList.innerHTML = ``;
    todayTasks.forEach((task, index) => {
      if (task.selectedDate == today) {
        todayList.innerHTML += `
          <div class="list_card">
                <p>${index + 1}. ${task.taskName}</p>
                <p>${task.selectedDate}</p>
                <p>Priority: ${task.selectedOption}</p>
                <div class="delete_check_icons ">
                    <img src="./icons8-check.gif" alt="check" class='check_icon' data_set="${index}" />
                    <img src="./icons8-delete.gif" alt="delete" class='delete_icon' data_set= "${index}" />
                </div>
            </div>
       `;
      }
    });
    deleteTodayTask();
  }

  function renderFutureTasks() {
    // let {today} = nowDate();
    let futureList = document.getElementById("future_list");
    futureList.innerHTML = ``;
    futureTasks.forEach((task, index) => {
      // if(task.selectedDate == today){
      futureList.innerHTML += `
          <div class="list_card">
                <p>${index + 1}. ${task.taskName}</p>
                <p>${task.selectedDate}</p>
                <p>Priority: ${task.selectedOption}</p>
                <div class="delete_check_icons">
                    <img src="./icons8-check.gif" alt="check" class='future_check_icon' data_set="${index}" />
                    <img src="./icons8-delete.gif" alt="delete" class='future_delete_icon' data_set="${index}" />
                </div>
            </div>
       `;
      // }
    });
    deleteFutureTask();
  }

  // delete Today Tasks and also her we are adding completed taks into completed Task localStorage only for today array
  function deleteTodayTask() {
    document.querySelectorAll(".delete_icon").forEach((icon) => {
      icon.addEventListener("click", () => {
        let dataSet = icon.getAttribute("data_set");
        let filterDeletedTodayTask = todayTasks.filter(
          (_, index) => !(index == dataSet)
        );
        // console.log(filterDeletedTodayTask);
        PushOnPriorityBasis(filterDeletedTodayTask, "todayTasks");
        todayTasks = filterDeletedTodayTask;
        renderTodayTasks();
      });
    });

    document.querySelectorAll(".check_icon").forEach((icon) => {
      icon.addEventListener("click", () => {
        let dataSet = icon.getAttribute("data_set");
        // push todayTask which is clicked into completedTask localstorage
        let completedTask = todayTasks[dataSet];
        completedTasks.push(completedTask);
        PushOnPriorityBasis(completedTasks, "completedTasks");

        // remove completed item from the todayTasks array
        let filterCompletedTodayTask = todayTasks.filter(
          (_, index) => !(index == dataSet)
        );
        // console.log(filterCompletedTodayTask);
        PushOnPriorityBasis(filterCompletedTodayTask, "todayTasks");
        todayTasks = filterCompletedTodayTask;
        renderTodayTasks();
        rederCompletedTasks();
      });
    });
  }

  // delete future Tasks and also her we are adding completed taks into completed Task localStorage only for future array

  function deleteFutureTask() {
    document.querySelectorAll(".future_delete_icon").forEach((icon) => {
      icon.addEventListener("click", () => {
        let dataSet = icon.getAttribute("data_set");
        let filterDeletedFutureTask = futureTasks.filter(
          (_, index) => !(index == dataSet)
        );
        // console.log(filterDeletedFutureTask);
        PushOnPriorityBasis(filterDeletedFutureTask, "futureTasks");
        futureTasks = filterDeletedFutureTask;
        //   renderTodayTasks();
        renderFutureTasks();
      });
      
    });

    document.querySelectorAll(".future_check_icon").forEach((icon) => {
      icon.addEventListener("click", () => {
        let dataSet = icon.getAttribute("data_set");
        // push todayTask which is clicked into completedTask localstorage
        let completedTask = futureTasks[dataSet];
        completedTasks.push(completedTask);
        PushOnPriorityBasis(completedTasks, "completedTasks");

        // remove completed item from the todayTasks array
        let filterCompletedFutureTask = futureTasks.filter(
          (_, index) => !(index == dataSet)
        );
        // console.log(filterCompletedFutureTask);
        PushOnPriorityBasis(filterCompletedFutureTask, "futureTasks");
        futureTasks = filterCompletedFutureTask;
        //   renderTodayTasks();
        renderFutureTasks();
        rederCompletedTasks();
      });
    });
  }

  // render complete tasks
  function rederCompletedTasks() {
    let completedList = document.getElementById("completed_list");
    completedList.innerHTML = ``;
    completedTasks.forEach((tasks, index) => {
      completedList.innerHTML += `

        <div
          class="list_card"
          style="background-color: white; color: black; border: 1px solid black"
        >
          <p>${index + 1}. ${tasks.taskName}</p>
          <p>${tasks.selectedDate}</p>
          <p>Priority:${tasks.selectedOption}</p>
          <div class="delete_check_icons">
            <img src="./icons8-delete.gif" alt="delete" class='completed_delete_icon' data_set="${index}" />
          </div>
        </div>
        
        `;
    });
    deleteCompletedTasks()
  }



// deleted completed Tasks

function deleteCompletedTasks(){
    document.querySelectorAll('.completed_delete_icon').forEach((icon)=>{
           icon.addEventListener('click',()=>{
             let data_set = icon.getAttribute('data_set');
            //  console.log(data_set)
            let filterDeletedCompletedTasks =  completedTasks.filter((_,index)=> !(index==data_set))
            // console.log('deleted completed task',filterDeletedCompletedTasks);
            PushOnPriorityBasis(filterDeletedCompletedTasks, "completedTasks");
            completedTasks = filterDeletedCompletedTasks;
            rederCompletedTasks();
           })

    })
    
}


  renderTodayTasks();
  renderFutureTasks();
  rederCompletedTasks();
});



