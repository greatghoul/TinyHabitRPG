import TaskService from "services/TaskService.js";
import Page from "modules/Page.js";
import Loading from "modules/Loading.js";
import Tabs from "modules/Tabs.js";
import TodoItem from "modules/TodoItem.js";
import TodoFormNew from "modules/TodoFormNew.js";

const TASK_TYPE = 'habit';

const taskService = new TaskService();

const HabitsPage = Page.extend({
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
    <Page title="Habits">
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
            {{#each tasks as task: index}}
              <TodoItem todo={{task}} position={{index}} />
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
      this.fetchTasks().then(() => this.set("loaded", true))
    },
    refresh: function (ctx) {
      this.fetchTasks();
    },
    "TodoFormNew.submit": function (ctx, text) {
      this.createTask(text);
    },
  },
  createTask: function (text) {
    const type = TASK_TYPE;
    const taskHolder = {
      text,
      id: taskService.randomToken(TASK_TYPE),
      completed: false,
      holding: true
    };

    this.unshift('tasks', taskHolder);

    return taskService
      .createUserTask({ type, text })
      .then(task => {
        const index = this.get('tasks').findIndex(x => x.id == taskHolder.id);
        this.splice('tasks', index, 1, task);
      });
  },
  fetchTasks: function () {
    this.set('fetching', true);
    return taskService
      .getUserTasks({ type: 'habits' })
      .then(tasks => this.set({ tasks }))
      .then(() => this.set('fetching', false));
  }
});

export default HabitsPage;