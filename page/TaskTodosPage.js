import TaskService from "services/TaskService.js"
import Page from "node/Page.js"
import Loading from "node/Loading.js"
import Tabs from "node/Tabs.js"
import TaskTodo from "node/task/TaskTodo.js"
import TaskRefreshButton from "node/task/TaskRefreshButton.js"
import TodoFormNew from "node/task/TodoFormNew.js"

const TaskTodosPage = Ractive.extend({
  components: {
    Page,
    Loading,
    Tabs,
    TodoFormNew,
    TaskTodo,
    TaskRefreshButton,
  },
  data: function() {
    return {
      tasks: null,
      tabs: [
        { title: "New", key: "taskNew" },
        // { title: "Search", key: "taskSearch" },
      ],
    };
  },
  computed: {
    todos () {
      const tasks = this.get("tasks")
      return tasks.filter(x => x.type == "todo")
    }
  },
  template: `
    <Page title="Todos">
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
          <ul class="todo-list" style="vertical-scroll: auto;">
            {{#each todos as task: index}}
              <TaskTodo task={{task}} position={{index}} />
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
    "TodoFormNew.submit": function (ctx, text) {
      this.createTask(text)
    },
  },
  createTask: function (text) {
    const type = "todo"
    const taskHolder = {
      text,
      id: TaskService.randomToken("todo"),
      completed: false,
      holding: true
    };

    this.unshift("tasks", taskHolder)

    return TaskService
      .createUserTask({ type, text })
      .then(todo => {
        const index = this.get("tasks").findIndex(x => x.id == taskHolder.id)
        this.splice("tasks", index, 1, todo)
      });
  },
})

export default TaskTodosPage
