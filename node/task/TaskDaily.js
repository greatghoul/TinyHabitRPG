import TaskService from "services/TaskService.js"; 
import TaskItem from "node/task/TaskItem.js";
import TaskCheck from "node/task/TaskCheck.js";
import TaskText from "node/task/TaskText.js";
import TaskDue from "node/task/TaskDue.js";

const taskService = new TaskService();

const TaskDaily = Ractive.extend({
  components: {
    TaskItem,
    TaskCheck,
    TaskText,
    TaskDue,
  },
  template: `
    <TaskItem>
      {{#partial head}}
        <TaskCheck checked="{{task.completed}}" disabled={{task.holding}} on-check="handleCheck" />
      {{/partial}}

      {{#partial body}}
        <TaskText text={{task.text}} mute={{task.completed}} />
      {{/partial}}

      {{#partial tail}}{{/partial}}
    </TaskItem>
  `,
  data: function () {
    return {
      task: null,
      position: null,
    };
  },
  on: {
    handleCheck: function (ctx, checked) {
      const task = this.get("task");
      const position = this.get("position");
      const taskId = task.id;
      const direction = checked ? "up" : "down";
      taskService.scoreTask({ taskId, direction })
        .then(() => !task.completed && taskService.moveTask({ taskId, position }))
    },
  }
});

export default TaskDaily;