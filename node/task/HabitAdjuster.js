import Icon from "node/text/Icon.js"

const HabitAdjuster = Ractive.extend({
  components: { Icon },
  data () {
    return {
      task: null,
    }
  },
  template: `
    <div class="adjuster">
      <button on-click="adjustUp" disabled={{!task.up}}>＋</button>
      <button on-click="adjustDown" disabled={{!task.down}}>－</button>
    </div>
  `,
  css: `
    .adjuster {
      display: flex;
      align-items: center;
      border: 1px solid #D4A373;
      border-radius: 3px;
    }

    .adjuster button {
      background-color: #FEFAE0;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 1em;
    }

    .adjuster button[disabled] {
      background-color: #f5f5f5 !important;
      cursor: default;
    }

    .adjuster button + button {
      border-left: 1px solid #D4A373;
    }

    .adjuster button:hover {
      background-color: #FAEDCD;
    }
  `,
  on: {
    adjustUp () {
      this.fire("adjust", "up")
    },
    adjustDown () {
      this.fire("adjust", "down")
    },
  }
})

export default HabitAdjuster
