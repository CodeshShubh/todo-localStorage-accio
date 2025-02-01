document.addEventListener('DOMContentLoaded', ()=>{
    let tasksArr = JSON.parse(localStorage.getItem('Tasks'))||[]
    console.log('global task arr',tasksArr);

function getTaskInputs(){
return{
     taskName: document.getElementById('task_name').value.trim(),
     selctedDate: document.getElementById('selected_date').value,
     selectedOption: document.getElementById('selected_option').value,
}

}
let addBtn = document.getElementById('add_btn');


addBtn.addEventListener('click', todayTask);

function todayTask(){
    
      let {taskName, selctedDate , selectedOption} = getTaskInputs();
    // console.log(taskName, selctedDate , selectedOption);
    if(taskName=='' || selctedDate=='' || selectedOption=='Priority'){
        alert('Please Enter Task first with all Details  😡')
    }else if(new Date(selctedDate) < (new Date())){
        alert('you can not Enter Past Date 😡')
    }
    else{
        let task = {
            taskName: taskName,
            selctedDate: selctedDate,
            selectedOption: selectedOption
         }
         tasksArr.push(task);
         localStorage.setItem('todayTasks', JSON.stringify(tasksArr))
    }
    renderTodayTasks()      
}

 // setting today date object
function nowDate(){
    const now = new Date();
    const day = String(now.getDate()).padStart(2,'0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = String(now.getFullYear());
    const today = `${year}-${month}-${day}`
       return {today:today};
}


function renderTodayTasks(){
    let {today} = nowDate();

//   console.log(tasksArr[0].selctedDate);
  let todayList = document.getElementById('today_list')
  todayList.innerHTML = ``
  tasksArr.forEach((task, index)=>{
    if(task.selctedDate == today){
       todayList.innerHTML +=`
          <div class="list_card">
                <p>${index +1}. ${task.taskName}</p>
                <p>${task.selctedDate}</p>
                <p>Priority: ${task.selectedOption}</p>
                <div class="delete_check_icons">
                    <img src="./icons8-check.gif" alt="check"/>
                    <img src="./icons8-delete.gif" alt="delete"/>
                </div>
            </div>
       `
    }
     
  })
  
}
renderTodayTasks();




// function 

















})