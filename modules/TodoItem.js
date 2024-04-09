const TodoItem = Ractive.extend({
  template: `
    {{#with todo}}
      <li class="todo">
        <div class="columns">
          <label class="checkbox-column">
            <input type="checkbox" name="completed" {{#completed}}checked{{/completed}} />
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

    .todo:hover {
      background-color: #d0ebff;
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
  `,
  data: function () {
    return {
      todo: null,
    };
  },
  computed: {
    todoText: {
      get() {
        const todo = this.get('todo');
        return marked.parseInline(todo.text);
      },
    },
  },
});

export default TodoItem;
