import TaskService from "services/TaskService.js"; 

const taskService = new TaskService();
const TodoItem = Ractive.extend({
  template: `
    {{#with todo}}
      <li class="todo" class-done="completed">
        <div class="columns">
          <label class="checkbox-column">
            <input
              type="checkbox"
              checked="{{completed}}"
              disabled="{{holding}}"
              on-change="handleChange"
            />
          </label>
          <div class="text-column">
            <span>{{{todoText}}}</span>
          </div>
        </div>
      </li>
    {{/with}}
  `,
  css: `
    .todo {
      list-style-type: none;
      margin-bottom: 2px;
      background-color: #e5f9ff;
      transition: background-color 0.3s ease;
    }

    .todo.done {
      background-color: #e2e2e2;
    }

    .todo:hover {
      background-color: #d0ebff;
    }

    .todo.done:hover {
      background-color: #d2d2d2;
    }

    .columns {
      display: flex;
      align-items: left;
      gap: 0.3rem;
    }

    .checkbox-column {
      width: 40px;
      min-width: 40px;
      background-color: lightblue;
      text-align: center;
      padding: 5px 3px;
    }

    .todo.done .checkbox-column {
      background-color: lightgray;
    }

    .checkbox-column input {
      width: 14px;
      height: 14px;
    }

    .text-column {
      flex-grow: 1;
      padding: 5px 3px;
    }

    .text-column span {
      word-wrap: break-word;
      white-space: pre-wrap;
      overflow-wrap: break-word;
    }

    .todo.done .text-column {
      text-decoration: line-through;
    }

    .text-column a {
      text-decoration: none;
    }
  `,
  data: function () {
    return {
      todo: null,
      position: null,
    };
  },
  computed: {
    todoText: {
      get() {
        const todo = this.get('todo');
        const todoText = marked.parseInline(todo.text);
        const aTags = todoText.match(/<a\s[^>]*href="[^"]*"[^>]*>.*?<\/a>/g);
        if (aTags) {
          const modifiedATags = todoText.replace(/<a\s[^>]*href="([^"]*)"[^>]*>([^<]*)<\/a>/g, '<a href="$1" target="_blank">$2</a>');
          return modifiedATags;
        } else {
          return todoText;
        }
      },
    },
  },
  on: {
    handleChange: function () {
      const todo = this.get('todo');
      const position = this.get('position');
      const taskId = todo.id;
      const direction = todo.completed ? 'up' : 'down';
      taskService.scoreTask({ taskId, direction })
        .then(() => !todo.completed && taskService.moveTask({ taskId, position }))
    },
  }
});

export default TodoItem;
