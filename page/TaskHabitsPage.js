import Page from "node/Page.js"
import Loading from "node/Loading.js"
import Tabs from "node/Tabs.js"
import TaskHabit from "node/task/TaskHabit.js"
import TaskNew from "node/task/TaskNew.js"
import TaskRefreshButton from "node/task/TaskRefreshButton.js"

const TASK_TYPE = 'habit';

export default Ractive.extend({
  components: {
    Page,
    Loading,
    Tabs,
    TaskNew,
    TaskHabit,
    TaskRefreshButton,
  },
  data: function() {
    return {
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
      return tasks && tasks.filter(x => x.type == TASK_TYPE)
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
            <TaskNew type="${TASK_TYPE}" />
          {{/partial}}
        </Tabs>
        {{#if tasks}}
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
  `
});
