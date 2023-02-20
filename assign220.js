const taskNameTextBox = document.getElementById('taskNameTextBox')
const addTaskButton = document.getElementById('addTaskButton')
const pendingTaskUL = document.getElementById('pendingTaskUL')
const completedTaskUL = document.getElementById('completedTaskUL')

addTaskButton.addEventListener('click',function() {

    const taskName = taskNameTextBox.value 

    let li = document.createElement('li')
    li.innerHTML = taskName
    pendingTaskUL.appendChild(li)

let checkBox = document.createElement('input')
    checkBox.setAttribute('type','checkbox')
    li.appendChild(checkBox)

let deleteButton = document.createElement('button')
li.appendChild(deleteButton)
deleteButton.innerHTML = 'Delete'

deleteButton.addEventListener('click', function() {
    // pendingTaskUL.removeChild(this.parentElement)
    this.parentElement.parentElement.removeChild(this.parentElement)
})

checkBox.addEventListener('change',function() {
    if (this.checked) {
        completedTaskUL.appendChild(li)
    } else {
        pendingTaskUL.appendChild(li)
    }
})

})
