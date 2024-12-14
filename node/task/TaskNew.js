const TaskNew = Ractive.extend({
  data: function() {
    return {
      type: null,
      text: '',
    };
  },
  template: `
    <input type="text" class="input-new" on-keydown='handleSubmit' value={{text}} />
  `,
  css: `
    .input-new {
      width: 100%;
      box-sizing: border-box;
      max-width: 100%;
    }
  `,
  on: {
    handleSubmit: function (ctx) {
      if (ctx.event.key != "Enter") return

      const text = this.get("text").trim()
      const type = this.get("type")
      if (!text) return

      this.fire("createTask", {}, { text, type })
      this.set("text", "")
    },
  }
})

export default TaskNew
