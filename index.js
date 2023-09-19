class Todo {
  constructor(purpose, start, deadline) {
    this.purpose = purpose;
    this.start = start;
    this.deadline = deadline;
    this.key = Date.now();
  }
}

let todos = [];

const form = document.getElementById('todoForm');
const list = document.getElementById('todoList');

const startDateInput = document.getElementById('startDateInput');
const deadlineDateInput = document.getElementById('deadlineDateInput');

startDateInput.addEventListener('change', (event) => {
  if (event.target.value != null)
    deadlineDateInput.setAttribute('min', event.target.value);
});

deadlineDateInput.addEventListener('change', (event) => {
  if (event.target.value != null)
    startDateInput.setAttribute('max', event.target.value);
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(form);

  const newData = new Todo();
  for (const [key, value] of formData.entries()) newData[key] = value;
  todos.push(newData);
  todoGenerator(newData);

  form.reset();
});

const todoGenerator = (todo) => {
  const purposeBlock = document.createElement('div');
  purposeBlock.innerHTML = `${todo.purpose}`;

  const dateBlock = document.createElement('div');

  const startDateBlock = document.createElement('div');

  const startDateLabel = document.createElement('label');
  startDateLabel.setAttribute('for', 'startDate' + todo.key);
  startDateLabel.innerHTML = 'Start At';

  const startDate = document.createElement('div');
  startDate.innerHTML = todo.start;

  const deadlineDateBlock = document.createElement('div');

  const deadlineDateLabel = document.createElement('label');
  deadlineDateLabel.setAttribute('for', 'deadlineData' + todo.key);
  deadlineDateLabel.innerHTML = 'Deadline';

  const deadlineDate = document.createElement('div');
  deadlineDate.innerHTML = todo.deadline;

  const block = document.createElement('div');
  block.setAttribute('key', todo.key);

  startDateBlock.appendChild(startDateLabel);
  startDateBlock.appendChild(startDate);

  deadlineDateBlock.appendChild(deadlineDateLabel);
  deadlineDateBlock.appendChild(deadlineDate);

  dateBlock.appendChild(startDateBlock);
  dateBlock.appendChild(deadlineDateBlock);

  const deleteButton = document.createElement('button');
  deleteButton.setAttribute('class', 'deleteButton');
  deleteButton.addEventListener('click', (event) => {
    event.preventDefault();
    const selectedTodo = document.querySelector(`div[key="${todo.key}"]`);
    list.removeChild(selectedTodo);
    todos = todos.filter((v) => {
      const { key } = v;
      return key == todo.key ? false : true;
    });
  });
  deleteButton.innerHTML = 'X';

  purposeBlock.appendChild(deleteButton);

  block.appendChild(purposeBlock);
  block.appendChild(document.createElement('hr'));
  block.appendChild(dateBlock);

  list.appendChild(block);
};
