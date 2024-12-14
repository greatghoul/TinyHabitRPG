import Page from "node/Page.js"
import Loading from "node/Loading.js"
import Tabs from "node/Tabs.js"
import TaskTodo from "node/task/TaskTodo.js"
import TaskRefreshButton from "node/task/TaskRefreshButton.js"
import TaskNew from "node/task/TaskNew.js"

const TASK_TYPE = "todo"

const TaskTodosPage = Ractive.extend({
  components: {
    Page,
    Loading,
    Tabs,
    TaskNew,
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
      return tasks && tasks.filter(x => x.type == TASK_TYPE)
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
            <TaskNew type="${TASK_TYPE}"/>
          {{/partial}}
        </Tabs>
        {{#if tasks}}
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
  `
})

export default TaskTodosPage
