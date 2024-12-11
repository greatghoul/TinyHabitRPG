import TaskService from "services/TaskService.js";
import Page from "node/Page.js";
import Loading from "node/Loading.js";
import Tabs from "node/Tabs.js";
import TodoItem from "node/task/TodoItem.js";
import TaskDaily from "node/task/TaskDaily.js";
import TodoFormNew from "node/task/TodoFormNew.js";

const TASK_TYPE_CREATE = 'daily';
const TASK_TYPE_FETCH = 'dailys';

const taskService = new TaskService();

const TaskDailiesPage = Page.extend({
  components: {
    Page,
    Loading,
    Tabs,
    TodoFormNew,
    TodoItem,
    TaskDaily,
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
    <Page title="Dailies">
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
          <h4 class="tasks-list-title">Due Today</h4>
          <ul class="todo-list">
            {{#each tasks as task: index}}
              <TaskDaily task={{task}} position={{index}} />
            {{/each}}
          </ul>
        {{else}}
          <Loading />
        {{/if}}
      {{/partial}}
    </Page>
  `,
  css: `
    h4 {
      margin: 0 0 5px 0;
      padding: 0;
    }
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
    const type = TASK_TYPE_CREATE;
    const taskHolder = {
      text,
      id: taskService.randomToken(TASK_TYPE_CREATE),
      completed: false,
      holding: true
    };

    this.unshift("tasks", taskHolder);

    return taskService
      .createUserTask({ type, text })
      .then(task => {
        const index = this.get("tasks").findIndex(x => x.id == taskHolder.id);
        this.splice("tasks", index, 1, task);
      });
  },
  fetchTasks: function () {
    this.set('fetching', true);
    return taskService
      .getUserTasks({ type: TASK_TYPE_FETCH })
      .then(tasks => tasks.filter(task => task.isDue))
      .then(tasks => tasks.sort((a, b) => new Date(a.nextDue[0]) - new Date(b.nextDue[0])))
      .then(tasks => this.set({ tasks }))
      .then(() => this.set('fetching', false));
  }
});

export default TaskDailiesPage;