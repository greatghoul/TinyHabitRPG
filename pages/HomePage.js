import NavItem from "modules/NavItem.js";
import TodosPage from "pages/TodosPage.js";

const HomePage = Ractive.extend({
  components: {
    NavItem,
    TodosPage,
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
        {{#partial todos}}<TodosPage />{{/partial}}

        {{> page}}
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

  `,
  data: function () {
    return {
      page: 'todos',
    };
  },
});

export default HomePage;
