const TodoFormNew = Ractive.extend({
  data: function() {
    return {
      text: '',
    };
  },
  template: `
    <input type="text" class="input-new" on-keydown='create' value={{text}} />
  `,
  css: `
    .input-new {
      width: 100%;
      box-sizing: border-box;
      max-width: 100%;
    }
  `,
  on: {
    create: function (ctx) {
      if (ctx.event.key != "Enter") return;

      const text = this.get("text").trim();
      if (!text) return;

      this.fire("submit", text);
      this.set("text", "");
    },
  }
});

export default TodoFormNew;
