import TaskService from "services/TaskService.js";
import TodoItem from "modules/TodoItem.js";

const taskService = new TaskService();

const HomePage = Ractive.extend({
  components: {
    TodoItem,
  },
  template: `
    <h1>Todos</h1>
    <input type="text" class="input-new" on-keydown='handleInput' value={{inputValue}} />
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
    this.fetchTodos();
  },
  on: {
    handleInput: function (ctx) {
      if (ctx.event.key != "Enter") return;

      const text = this.get("inputValue").trim();
      if (!text) return;

      this.createTodo(text)
        .then(() => this.set("inputValue", ""))
    },
  },
  createTodo: function (text) {
    const type = "todo";
    return taskService
      .createUserTask({ type, text })
      .then(todo => this.unshift("todos", todo));
  },
  fetchTodos: function () {
    return taskService
      .getUserTasks({ type: "todos" })
      .then(todos => this.set({ todos }))
  }
});

export default HomePage;
