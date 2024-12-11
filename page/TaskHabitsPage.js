import TaskService from "services/TaskService.js";
import Page from "node/Page.js";
import Loading from "node/Loading.js";
import Tabs from "node/Tabs.js";
import TaskHabit from "node/task/TaskHabit.js";
import TodoFormNew from "node/task/TodoFormNew.js";

const TASK_TYPE = 'habit';

const taskService = new TaskService();

export default Ractive.extend({
  components: {
    Page,
    Loading,
    Tabs,
    TodoFormNew,
    TaskHabit,
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
              <TaskHabit task={{task}} position={{index}} />
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
