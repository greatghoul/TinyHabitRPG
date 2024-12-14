import TaskService from "services/TaskService.js"
import Page from "node/Page.js"
import Loading from "node/Loading.js"
import Tabs from "node/Tabs.js"
import TaskDaily from "node/task/TaskDaily.js"
import TodoFormNew from "node/task/TodoFormNew.js"
import TaskRefreshButton from "node/task/TaskRefreshButton.js"

const TASK_TYPE = 'daily'

const TaskDailiesPage = Page.extend({
  components: {
    Page,
    Loading,
    Tabs,
    TodoFormNew,
    TaskDaily,
    TaskRefreshButton,
  },
  data: function() {
    return {
      fetching: false,
      tasks: null,
      tabs: [
        { title: 'New', key: 'taskNew' },
        // { title: 'Search', key: 'taskSearch' },
      ],
    };
  },
  computed: {
    dailies () {
      return this.get("tasks")
        .filter(x => x.type == TASK_TYPE && x.isDue)
        .sort((a, b) => new Date(a.nextDue[0]) - new Date(b.nextDue[0]))
    }
  },
  template: `
    <Page title="Dailies">
      {{#partial page_action}}
        <TaskRefreshButton />
      {{/partial}}
      
      {{#partial page_body}}
        <Tabs tabs={{tabs}}>
          {{#partial taskNew}}
            <TodoFormNew />
          {{/partial}}
        </Tabs>
        {{#if tasks != null}}
          <h4 class="tasks-list-title">Due Today</h4>
          <ul class="todo-list">
            {{#each dailies as task: index}}
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
    "TodoFormNew.submit": function (ctx, text) {
      this.createTask(text);
    },
  },
  createTask: function (text) {
    const type = TASK_TYPE_CREATE;
    const taskHolder = {
      text,
      id: TaskService.randomToken(TASK_TYPE_CREATE),
      completed: false,
      holding: true
    };

    this.unshift("tasks", taskHolder);

    return TaskService
      .createUserTask({ type, text })
      .then(task => {
        const index = this.get("tasks").findIndex(x => x.id == taskHolder.id)
        this.splice("tasks", index, 1, task)
      })
  },
})

export default TaskDailiesPage