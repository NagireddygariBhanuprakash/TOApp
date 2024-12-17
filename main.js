document.getElementById("taskForm").addEventListener("submit", addTask);

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let completedTasks = JSON.parse(localStorage.getItem("completedTasks")) || [];

displayTasks();
displayCompletedTasks();

function addTask(event) {
	event.preventDefault();

	const title = document.getElementById("title").value;
	const description = document.getElementById("description").value;
	const deadline = document.getElementById("deadline").value;
	const priority = document.getElementById("priority").value;
	const category = document.getElementById("category").value;

	const task = {
		id: Date.now(),
		title,
		description,
		deadline,
		priority,
		category,
		completed: false,
	};

	tasks.push(task);
	localStorage.setItem("tasks", JSON.stringify(tasks));

	displayTasks();
	document.getElementById("taskForm").reset();
}

function displayTasks() {
	const taskList = document.getElementById("tasks");
	taskList.innerHTML = "";

	tasks.forEach((task) => {
		const taskItem = document.createElement("li");
		taskItem.classList.add("task", task.priority);
		taskItem.setAttribute("data-id", task.id);
		taskItem.innerHTML = `
      <h3>${task.title}</h3>
      <p>${task.description}</p>
      <p>Deadline: ${new Date(task.deadline).toLocaleString()}</p>
      <p>Category: ${task.category}</p>
      <button onclick="completeTask(${task.id})">Complete</button>
    `;
		taskList.appendChild(taskItem);

		checkDeadline(task, taskItem);
	});
}

function completeTask(taskId) {
	tasks = tasks.filter((task) => {
		if (task.id === taskId) {
			completedTasks.push(task);
			localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
			return false;
		}
		return true;
	});
	localStorage.setItem("tasks", JSON.stringify(tasks));
	displayTasks();
	displayCompletedTasks();
}

function displayCompletedTasks() {
	const completedTaskList = document.getElementById("completedTasks");
	completedTaskList.innerHTML = "";

	completedTasks.forEach((task) => {
		const taskItem = document.createElement("li");
		taskItem.classList.add("task", "completed-task");
		taskItem.innerHTML = `
      <h3>${task.title}</h3>
      <p>${task.description}</p>
      <p>Deadline: ${new Date(task.deadline).toLocaleString()}</p>
      <p>Category: ${task.category}</p>
    `;
		completedTaskList.appendChild(taskItem);
	});
}

function checkDeadline(task, taskItem) {
	const deadlineDate = new Date(task.deadline).getTime();
	const now = new Date().getTime();
	const timeDiff = deadlineDate - now;

	if (timeDiff < 24 * 60 * 60 * 1000) {
		taskItem.style.backgroundColor = "#ffcccb";
	}
}
document.querySelector(".cleartasks").addEventListener("click", function () {
	completedTasks = [];
	localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
	displayCompletedTasks();
});
