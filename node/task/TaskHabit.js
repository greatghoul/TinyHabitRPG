import TaskService from "services/TaskService.js" 
import Tag from "node/text/Tag.js"
import TaskItem from "node/task/TaskItem.js"
import TaskText from "node/task/TaskText.js"

const taskService = new TaskService()

const HabitAdjuster = Ractive.extend({
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
      padding-left: 1em;
      padding-right: 1em;
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

const TaskHabit = Ractive.extend({
  components: {
    Tag,
    TaskItem,
    TaskText,
    HabitAdjuster,
  },
  template: `
    <TaskItem>
      {{#partial head}}
        <HabitAdjuster task={{task}} on-adjust="scoreTask"/>
      {{/partial}}

      {{#partial body}}
        <TaskText text={{task.text}} mute={{task.completed}} />
        <Tag color="success">+{{task.counterUp}}</Tag>
        <Tag color="error">-{{task.counterDown}}</Tag>
      {{/partial}}

      {{#partial tail}}
        
      {{/partial}}
    </TaskItem>
  `,
  data: function () {
    return {
      task: null,
      position: null,
    }
  },
  on: {
    init () {
      const task = this.get("task")
    },
    scoreTask (ctx, direction) {
      const task = this.get("task");
      const position = this.get("position");
      const taskId = task.id;
      taskService.scoreTask({ taskId, direction })
    },
  }
});

export default TaskHabit;
