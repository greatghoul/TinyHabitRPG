import TaskService from "services/TaskService.js"
import Page from "node/Page.js"
import Loading from "node/Loading.js"
import Tabs from "node/Tabs.js"
import TaskTodo from "node/task/TaskTodo.js"
import TodoFormNew from "node/task/TodoFormNew.js"

const taskService = new TaskService()

const TaskTodosPage = Ractive.extend({
  components: {
    Page,
    Loading,
    Tabs,
    TodoFormNew,
    TaskTodo,
  },
  data: function() {
    return {
      fetching: false,
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
        <button on-click="refresh" disabled="{{fetching}}">Refresh</button>
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
    refresh: function (ctx) {
      this.fetchTasks()
    },
    "TodoFormNew.submit": function (ctx, text) {
      this.createTask(text)
    },
  },
  createTask: function (text) {
    const type = "todo"
    const taskHolder = {
      text,
      id: taskService.randomToken("todo"),
      completed: false,
      holding: true
    };

    this.unshift("tasks", taskHolder)

    return taskService
      .createUserTask({ type, text })
      .then(todo => {
        const index = this.get("tasks").findIndex(x => x.id == taskHolder.id)
        this.splice("tasks", index, 1, todo)
      });
  },
})

export default TaskTodosPage
