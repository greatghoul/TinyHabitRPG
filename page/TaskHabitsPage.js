import TaskService from "services/TaskService.js"
import Page from "node/Page.js"
import Loading from "node/Loading.js"
import Tabs from "node/Tabs.js"
import TaskHabit from "node/task/TaskHabit.js"
import TodoFormNew from "node/task/TodoFormNew.js"
import TaskRefreshButton from "node/task/TaskRefreshButton.js"

const TASK_TYPE = 'habit';

export default Ractive.extend({
  components: {
    Page,
    Loading,
    Tabs,
    TodoFormNew,
    TaskHabit,
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
    habits () {
      const tasks = this.get("tasks")
      return tasks.filter(x => x.type == TASK_TYPE)
    }
  },
  template: `
    <Page title="Habits">
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
          <ul class="todo-list">
            {{#each habits as task: index}}
              <TaskHabit task={{task}} position={{index}} />
            {{/each}}
          </ul>
        {{else}}
          <Loading />
        {{/if}}
      {{/partial}}
    </Page>
  `,
  on: {
    "TodoFormNew.submit": function (ctx, text) {
      this.createTask(text);
    },
  },
  createTask: function (text) {
    const type = TASK_TYPE;
    const taskHolder = {
      text,
      id: TaskService.randomToken(TASK_TYPE),
      completed: false,
      holding: true
    };

    this.unshift('tasks', taskHolder);

    return TaskService
      .createUserTask({ type, text })
      .then(task => {
        const index = this.get('tasks').findIndex(x => x.id == taskHolder.id);
        this.splice('tasks', index, 1, task);
      });
  },
});
