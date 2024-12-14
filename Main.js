import TaskService from "services/TaskService.js"

import Loading from "node/Loading.js"
import NavItem from "node/NavItem.js"
import TaskTodosPage from "page/TaskTodosPage.js"
import TaskDailiesPage from "page/TaskDailiesPage.js"
import TaskHabitsPage from "page/TaskHabitsPage.js"

export default Ractive.extend({
  components: {
    Loading,
    NavItem,
    TaskTodosPage,
    TaskDailiesPage,
    TaskHabitsPage,
  },
  data () {
    return {
      pages: [
        { key: "#/todos", title: "Todos" },
        { key: "#/dailies", title: "Dailies" },
        { key: "#/habits", title: "Habits" },
      ],
      page: null,
      tasks: null,
    };
  },
  on: {
    init () {
      this.loadPage()
      this.listenPage()
      this.loadTasks()
    },
    "*.refreshTasks" () {
      this.loadTasks()
    }
  },
  loadPage () {
    const pages = this.get('pages');
    const page = pages.find(x => x.key == window.location.hash) || pages[0];
    this.set({ page });
  },
  listenPage () {
    window.addEventListener("hashchange", () => this.loadPage(), false);
  },
  loadTasks () {
    Ractive.sharedSet("fetchingTasks", true)
    this.set("fetching", true)
    TaskService.getUserTasks({})
      .then(tasks => this.set({ tasks }))
      .finally(() => Ractive.sharedSet("fetchingTasks", false))
  },
  template: `
    <div class="main">
      <div class="side">
        <div class="head">Tiny Habit RPG</div>
        <div class="body">
          {{#each pages}}
            <NavItem title="{{title}}" key="{{key}}" active="{{key == page.key}}" />
          {{/each}}
        </div>
      </div>
      <div class="body">
        {{#if page.key == "#/todos"}}
          <TaskTodosPage tasks={{tasks}} />
        {{elseif page.key == "#/dailies"}}
          <TaskDailiesPage tasks={{tasks}} />
        {{elseif page.key == "#/habits"}}
          <TaskHabitsPage tasks={{tasks}} />
        {{/if}}
      </div>
    </div>
  `,
  css: `
    .main {
      display: flex;
      height: 100vh;
    }

    .side {
      width: 120px;
      background-color: #FEFAE0;
    }

    .body {
      flex: 1;
      overflow-y: hidden;
    }

    .head {
      font-size: 12px;
      font-weight: bold;
      height: 30px;
      line-height: 30px;
      padding-left: 10px;
      padding-right: 10px;
    }

    .todo-list {
      padding: 0;
      margin: 0;
    }
  `,
});
