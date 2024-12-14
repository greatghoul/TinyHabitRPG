import TaskService from "services/TaskService.js" 
import Tag from "node/text/Tag.js"
import TaskItem from "node/task/TaskItem.js"
import TaskText from "node/task/TaskText.js"
import HabitAdjuster from "node/task/HabitAdjuster.js"

const TaskHabit = Ractive.extend({
  components: {
    Tag,
    TaskItem,
    TaskText,
    HabitAdjuster,
  },
  template: `
    <TaskItem task={{task}}>
      {{#partial head}}
        <HabitAdjuster task={{task}} on-adjust="scoreTask"/>
      {{/partial}}

      {{#partial body}}
        <Tag color="success">+{{task.counterUp}}</Tag>
        <Tag color="error">-{{task.counterDown}}</Tag>
      {{/partial}}
    </TaskItem>
  `,
  data () {
    return {
      task: null,
      position: null,
    }
  },
  on: {
    scoreTask (ctx, direction) {
      const task = this.get("task")
      const taskId = task.id
      TaskService.scoreTask({ taskId, direction })
        .then(() => TaskService.getTask(task.id))
        .then((task) => this.set({ task }))
    },
  }
})

export default TaskHabit
