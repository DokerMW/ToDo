const toDoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const toDoList = document.querySelector('.todo-list');
const toDoCompleted = document.querySelector('.todo-completed');
const getStorage = localStorage.getItem('data');

let toDoData = JSON.parse(getStorage) || [];

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
			setStorage();
			render();
		 });
	});
}

const setStorage = () => {
	let stringifyData = JSON.stringify(toDoData);
	localStorage.setItem('data', stringifyData)
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

	setStorage();
	render();
});

document.addEventListener('click', e => {
	if(e.target.classList.contains('todo-remove')){
		let parentLi = e.target.closest('.todo-item');
		let toDoValue = parentLi.querySelector('.text-todo').textContent;
		toDoData = toDoData.filter(item => item.text != toDoValue);
		setStorage();
		render();
	}
});


render();

