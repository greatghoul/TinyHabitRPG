const TodoItem = Ractive.extend({
  template: `
    {{#with todo}}
      <li class="todo">
        <label>
          <input type="checkbox" name="completed" {{#completed}}checked{{/completed}} />
          <span>{{text}}</span>
        </label>
      </li>
    {{/with}}
  `,
  css: `
    .todo {
      list-style-type: none;
      margin: 0 1px;
      padding: 2px 5px;
    }

    .todo:hover {
      background-color: #fffed5;
    }
  `,
  data: function () {
    return {
      todo: null,
    };
  },
});

export default TodoItem;
