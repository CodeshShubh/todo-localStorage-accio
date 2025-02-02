document.addEventListener('DOMContentLoaded', ()=>{
    let todayTasks = JSON.parse(localStorage.getItem('todayTasks'))||[]
    let futureTasks = JSON.parse(localStorage.getItem('futureTasks'))||[]
    console.log('global task arr',todayTasks);

function getTaskInputs(){
return{
     taskName: document.getElementById('task_name').value.trim(),
     selectedDate: document.getElementById('selected_date').value,
     selectedOption: document.getElementById('selected_option').value,
}

}
let addBtn = document.getElementById('add_btn');


addBtn.addEventListener('click', AddTask);

function AddTask(){
    
      let {taskName, selectedDate , selectedOption} = getTaskInputs();
    // console.log(taskName, selectedDate , selectedOption);
    if(taskName=='' || selectedDate=='' || selectedOption=='Priority'){
        alert('Please Enter Task first with all Details  😡')
    }else if(new Date(selectedDate).setHours(0,0,0,0) < new Date().setHours(0,0,0,0)){
        alert('you can not Enter Past Date 😡')

    }else if(new Date(selectedDate).setHours(0,0,0,0) === new Date().setHours(0,0,0,0)){
        // alert('you Task is added 😡')
        let task = {
            taskName: taskName,
            selectedDate: selectedDate,
            selectedOption: selectedOption
         }
         todayTasks.push(task);
         PushOnPriorityBasis(todayTasks , 'todayTasks') // sending parameter to the function
        //  localStorage.setItem('todayTasks', JSON.stringify(todayTasks))

    }else if(new Date(selectedDate).setHours(0,0,0,0) > new Date().setHours(0,0,0,0)){

        let task = {
            taskName: taskName,
            selectedDate: selectedDate,
            selectedOption: selectedOption
         }
         futureTasks.push(task);
         PushOnPriorityBasis(futureTasks , 'futureTasks') // sending parameter to the function
        //  localStorage.setItem('futureTasks', JSON.stringify(futureTasks))
             
    }
    renderTodayTasks();
    renderFutureTasks();   
}

// this is for store tasks on prority basis 


function PushOnPriorityBasis(tasks , key){

    const prority = {
        High:1,
        Medium:2,
        Low:3,
    };

    tasks.sort((a,b)=> prority[a.selectedOption] - prority[b.selectedOption]);

    localStorage.setItem(key, JSON.stringify(tasks));

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
  let todayList = document.getElementById('today_list')
  todayList.innerHTML = ``
  todayTasks.forEach((task, index)=>{
    if(task.selectedDate == today){
       todayList.innerHTML +=`
          <div class="list_card">
                <p>${index +1}. ${task.taskName}</p>
                <p>${task.selectedDate}</p>
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





function renderFutureTasks(){
    // let {today} = nowDate();
  let futureList = document.getElementById('future_list')
  futureList.innerHTML = ``
  futureTasks.forEach((task, index)=>{
    // if(task.selectedDate == today){
        futureList.innerHTML +=`
          <div class="list_card">
                <p>${index +1}. ${task.taskName}</p>
                <p>${task.selectedDate}</p>
                <p>Priority: ${task.selectedOption}</p>
                <div class="delete_check_icons">
                    <img src="./icons8-check.gif" alt="check"/>
                    <img src="./icons8-delete.gif" alt="delete"/>
                </div>
            </div>
       `
    // }
     
  })
  
}
renderFutureTasks();




// function 

















})