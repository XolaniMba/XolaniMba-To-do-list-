const addBtn = document.querySelector("#add-btn");
const newTaskInput = document.querySelector("#wrapper input");
const tasksContainer = document.querySelector("#tasks");
const error = document.getElementById("error");
const countValue = document.querySelector(".count-value");
let taskCount = 0;

const displayCount = (taskCount) => {
    countValue.innerText = taskCount;
};

const addTask = () => {
    const taskName = newTaskInput.value.trim();
    error.style.display = "none";

    if (!taskName) {
        setTimeout(() => {
            error.style.display = "block";
        }, 200);
        return;
    }

    const task = `
        <div class="task">
            <input type="checkbox" class="task-check">
            <span class="taskName">${taskName}</span>
            <button class="edit">
                <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button class="delete">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>`;

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = task;
    const taskElement = tempDiv.firstElementChild;

    tasksContainer.insertAdjacentElement("beforeend", taskElement);
    taskCount++; 
    displayCount(taskCount);
    newTaskInput.value = "";
};

// Event delegation for delete, edit, and checkbox actions
tasksContainer.addEventListener("click", (event) => {
    // Delete button
    if (event.target.classList.contains("delete") || event.target.closest(".delete")) {
        const taskElement = event.target.closest(".task");
        taskElement.remove();
        taskCount--;
        displayCount(taskCount);
    }

    // Edit button
    if (event.target.classList.contains("edit") || event.target.closest(".edit")) {
        const taskElement = event.target.closest(".task");
        newTaskInput.value = taskElement.querySelector(".taskName").innerText;
        taskElement.remove();
        taskCount--;
        displayCount(taskCount);
    }
});

// Event delegation for checkbox
tasksContainer.addEventListener("change", (event) => {
    if (event.target.classList.contains("task-check")) {
        const taskElement = event.target.closest(".task");
        taskElement.querySelector(".taskName").classList.toggle("completed");

        // Update task count based on checkbox state
        if (event.target.checked) {
            taskCount--;
        } else {
            taskCount++;
        }
        displayCount(taskCount);
    }
});

addBtn.addEventListener("click", addTask);
