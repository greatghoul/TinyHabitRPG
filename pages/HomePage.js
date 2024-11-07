import TaskService from "services/TaskService.js";
import TodoItem from "modules/TodoItem.js";
import Loading from "modules/Loading.js";
import NavItem from "modules/NavItem.js";
import Tabs from "modules/Tabs.js";

const taskService = new TaskService();

const HomePage = Ractive.extend({
  components: {
    TodoItem,
    Loading,
    NavItem,
    Tabs,
  },
  template: `
    <div class="home-page">
      <div class="side">
        <div class="head">Tiny Habit RPG</div>
        <div class="body">
          <NavItem title="Todos" />
          <NavItem title="Dailies" />
        </div>
      </div>
      <div class="main">
        <div class="head">
          <span>Todos</span>
          <div class="pull-right">
            <button on-click="handleRefresh" disabled="{{fetching}}">Refresh</button>
          </div>
        </div>
        <div class="body">
          <Tabs tabs={{tabs}}>
            {{#partial taskNew}}
              <input type="text" class="input-new" on-keydown='handleInput' value={{inputValue}} />
            {{/partial}}
          </Tabs>
          {{#if loaded}}
            <ul class="todo-list">
              {{#each todos as todo: index}}
                <TodoItem todo={{todo}} position={{index}} />
              {{/each}}
            </ul>
          {{else}}
            <Loading />
          {{/if}}
        </div>
      </div>
    </div>
  `,
  css: `
    .home-page {
      display: flex;
    }

    .side {
      width: 120px;
      background-color: #FEFAE0;
    }

    .main {
      flex: 1;
    }

    .pull-right {
      float: right;
    }

    .head {
      font-size: 12px;
      font-weight: bold;
      height: 30px;
      line-height: 30px;
      padding-left: 10px;
      padding-right: 10px;
    }

    .body {
      padding: 10px;
    }

    .main > .head {
      background-color: #E9EDC9;
    }

    .todo-list {
      padding: 0;
      margin: 0;
    }
    .input-new {
      width: 100%;
      box-sizing: border-box;
      max-width: 100%;
    }
  `,
  data: function () {
    return {
      todos: [],
      inputValue: "",
      fetching: false,
      loaded: false,
      tabs: [
        { title: 'New', key: 'taskNew' },
        // { title: 'Search', key: 'taskSearch' },
      ],
    };
  },
  oninit: function () {
    this.fetchTodos().then(() => this.set("loaded", true))
  },
  on: {
    handleInput: function (ctx) {
      if (ctx.event.key != "Enter") return;

      const text = this.get("inputValue").trim();
      if (!text) return;

      this.createTodo(text);
    },
    handleRefresh: function (ctx) {
      this.fetchTodos();
    }
  },
  createTodo: function (text) {
    const type = "todo";
    const todoHolder = {
      text,
      id: taskService.randomToken('todo'),
      completed: false,
      holding: true
    };

    this.unshift("todos", todoHolder);
    this.set("inputValue", "");

    return taskService
      .createUserTask({ type, text })
      .then(todo => {
        const index = this.get("todos").findIndex(x => x.id == todoHolder.id);
        this.splice("todos", index, 1, todo);
      });
  },
  fetchTodos: function () {
    this.set('fetching', true);
    return taskService
      .getUserTasks({ type: "todos" })
      .then(todos => this.set({ todos }))
      .then(() => this.set('fetching', false));
  }
});

export default HomePage;
