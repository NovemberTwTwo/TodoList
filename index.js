class Todo {
  constructor(purpose, start, deadline) {
    this.purpose = purpose;
    this.start = start;
    this.deadline = deadline;
    this.key = Date.now();
  }
}

const todos = [];
const todosBefore = [];

const form = document.getElementById('todoForm');
const list = document.getElementById('todoList');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const newData = new Todo();
  for (const [key, value] of formData.entries()) newData[key] = value;
  todos.push(newData);
  todoGenerator(newData);
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

  block.appendChild(purposeBlock);
  block.appendChild(document.createElement('hr'));
  block.appendChild(dateBlock);

  list.appendChild(block);
};
