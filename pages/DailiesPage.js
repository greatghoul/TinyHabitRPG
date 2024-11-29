import TaskService from "services/TaskService.js";
import Page from "modules/Page.js";
import Loading from "modules/Loading.js";
import Tabs from "modules/Tabs.js";
import TodoItem from "modules/TodoItem.js";
import TodoFormNew from "modules/TodoFormNew.js";

const TASK_TYPE = 'daily';

const taskService = new TaskService();

const DailiesPage = Page.extend({
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
          <ul class="todo-list">
            {{#each dailies as daily: index}}
              <TodoItem todo={{daily}} position={{index}} />
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
      this.fetchDailies().then(() => this.set("loaded", true))
    },
    refresh: function (ctx) {
      this.fetchDailies();
    },
    "TodoFormNew.submit": function (ctx, text) {
      this.createDaily(text);
    },
  },
  createDaily: function (text) {
    const type = TASK_TYPE;
    const dailyHolder = {
      text,
      id: taskService.randomToken(TASK_TYPE),
      completed: false,
      holding: true
    };

    this.unshift("dailies", todoHolder);

    return taskService
      .createUserTask({ type, text })
      .then(todo => {
        const index = this.get("dailies").findIndex(x => x.id == dailyHolder.id);
        this.splice("dailies", index, 1, todo);
      });
  },
  fetchDailies: function () {
    this.set('fetching', true);
    return taskService
      .getUserTasks({ type: 'dailys' })
      .then(dailies => dailies.filter(daily => !daily.completed))
      .then(activeDailies => activeDailies.sort((a, b) => new Date(a.nextDue[0]) - new Date(b.nextDue[0])))
      .then(sortedActiveDailies => this.set({ dailies: sortedActiveDailies }))
      .then(() => this.set('fetching', false));
  }
});

export default DailiesPage;