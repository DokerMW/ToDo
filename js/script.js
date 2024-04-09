const toDoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const toDoList = document.querySelector('.todo-list');
const toDoCompleted = document.querySelector('.todo-completed');

const toDoData = [];

const render = () => {
	toDoList.innerHTML = '';
	toDoCompleted.innerHTML = '';

	toDoData.forEach(e => {
		const li = document.createElement('li');

		li.classList.add('todo-item');

		li.innerHTML = 
		`<span class="text-todo">${e.text}</span>
		 <div class="todo-buttons">
			 <button class="todo-remove"></button>
			 <button class="todo-complete"></button>
		 </div>`;

		 if (e.completed){
			toDoCompleted.append(li);
		 } else {
			toDoList.append(li);
		 }

		 li.querySelector('.todo-complete').addEventListener('click', () => {
			e.completed = !e.completed;
			render();
		 });
	});
}

toDoControl.addEventListener('submit', e => {
	e.preventDefault();

	const newToDo = {
		text: headerInput.value,
		completed: false
	}

	if(headerInput.value){
		toDoData.push(newToDo);
	}
	
	headerInput.value = '';

	render();
});