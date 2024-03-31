import TaskService from "services/TaskService.js";
import TodoItem from "modules/TodoItem.js";

const taskService = new TaskService();

const HomePage = Ractive.extend({
  components: {
    TodoItem,
  },
  template: `
    <h1>Todos</h1>
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
  `,
  data: function () {
    return {
      todos: [],
    };
  },
  oninit: function () {
    taskService
      .getUserTasks({ type: "todos" })
      .then(todos => this.set({ todos }))
  },
});

export default HomePage;
