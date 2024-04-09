import TaskService from "services/TaskService.js";
import TodoItem from "modules/TodoItem.js";

const taskService = new TaskService();

const HomePage = Ractive.extend({
  components: {
    TodoItem,
  },
  template: `
    <h1>Todos</h1>
    <input type="text" class="input-new" on-keydown='handleInput' />
    <ul class="todo-list">
      {{#each todos as todo}}
        <TodoItem todo={{todo}} />
      {{/each}}
    </ul>
  `,
  css: `
    .todo-list {
      padding: 0;
    }
    .input-new {
      width: 100%;
      box-sizing: border-box;
      max-width: 100%;
    }
  `,
  data: function () {
    return {
      todos: [],
      inputValue: '',
    };
  },
  oninit: function () {
    taskService
      .getUserTasks({ type: "todos" })
      .then(todos => this.set({ todos }))
  },
  handleInput: function (ctx, e) {
    if (e.key === 'Enter') {
      console.log(this.get('inputValue'));
      this.set('inputValue', '');
    }
  },
});

export default HomePage;
