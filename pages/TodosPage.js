import TaskService from "services/TaskService.js";
import Page from "modules/Page.js";
import Loading from "modules/Loading.js";
import Tabs from "modules/Tabs.js";
import TodoItem from "modules/TodoItem.js";
import TodoFormNew from "modules/TodoFormNew.js";


const taskService = new TaskService();

const TodosPage = Page.extend({
  components: {
    Page,
    Loading,
    Tabs,
    TodoFormNew,
    TodoItem,
  },
  data: function() {
    return {
      fetching: false,
      loaded: false,
      todos: [],
      tabs: [
        { title: 'New', key: 'taskNew' },
        // { title: 'Search', key: 'taskSearch' },
      ],
    };
  },
  template: `
    <Page title="Todos">
      {{#partial page_action}}
        <button on-click="refresh" disabled="{{fetching}}">Refresh</button>
      {{/partial}}
      
      {{#partial page_body}}
        <Tabs tabs={{tabs}}>
          {{#partial taskNew}}
            <TodoFormNew />
          {{/partial}}
        </Tabs>
        {{#if loaded}}
          <ul class="todo-list">
            {{#each todos as todo: index}}
              <TodoItem todo={{todo}} position={{index}} />
            {{/each}}
          </ul>
        {{else}}
          <Loading />
        {{/if}}
      {{/partial}}
    </Page>
  `,
  css: `
  `,
  on: {
    init() {
      this.fetchTodos().then(() => this.set("loaded", true))
    },
    refresh: function (ctx) {
      this.fetchTodos();
    },
    "TodoFormNew.submit": function (ctx, text) {
      this.createTodo(text);
    },
  },
  createTodo: function (text) {
    const type = "todo";
    const todoHolder = {
      text,
      id: taskService.randomToken('todo'),
      completed: false,
      holding: true
    };

    this.unshift("todos", todoHolder);

    return taskService
      .createUserTask({ type, text })
      .then(todo => {
        const index = this.get("todos").findIndex(x => x.id == todoHolder.id);
        this.splice("todos", index, 1, todo);
      });
  },
  fetchTodos: function () {
    this.set('fetching', true);
    return taskService
      .getUserTasks({ type: "todos" })
      .then(todos => this.set({ todos }))
      .then(() => this.set('fetching', false));
  }
});

export default TodosPage;