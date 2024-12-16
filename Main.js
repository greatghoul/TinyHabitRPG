import { endOfDay, formatISO } from "date-fns"
import TaskService from "services/TaskService.js"

import Loading from "node/Loading.js"
import NavItem from "node/NavItem.js"
import TaskTodosPage from "page/TaskTodosPage.js"
import TaskDailiesPage from "page/TaskDailiesPage.js"
import TaskHabitsPage from "page/TaskHabitsPage.js"
import FeedbackPage from "page/FeedbackPage.js"

export default Ractive.extend({
  components: {
    Loading,
    NavItem,
    TaskTodosPage,
    TaskDailiesPage,
    TaskHabitsPage,
    FeedbackPage,
  },
  data () {
    return {
      pages: [
        { key: "#/todos", title: "Todos" },
        { key: "#/dailies", title: "Dailies" },
        { key: "#/habits", title: "Habits" },
        { key: '#/feedback', title: 'Feedback' },
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
    },
    "*.createTask" (ctx, params) {
      this.createTask(params)
    },
    "*.deleteTask" (ctx, task) {
      this.deleteTask(task)
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
  createTask(params) {
    const taskHolder = {
      id: TaskService.randomToken(params.type),
      type: params.type,
      text: params.text,
      holding: true,
      // for todo
      completed: false,
      // for habit
      up: false,
      down: false,
      counterUp: 0,
      counterDown: 0,
      // for daily
      isDue: true,
      nextDue: [formatISO(endOfDay(new Date()))],
    }
    console.log(taskHolder)
    this.unshift("tasks", taskHolder)

    return TaskService
      .createUserTask(params)
      .then(task => {
        const index = this.get("tasks").findIndex(x => x.id == taskHolder.id)
        this.splice("tasks", index, 1, task)
      })
  },
  deleteTask (task) {
    const tasks = this.get("tasks")
    const index = tasks.findIndex(x => x.id == task.id)
    this.splice("tasks", index, 1)
    TaskService.deleteTask({ taskId: task.id })
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
        <FeedbackPage visible="{{page.key == "/#/feedback"}}" />
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
