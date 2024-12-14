import TaskService from "services/TaskService.js"; 
import TaskItem from "node/task/TaskItem.js";
import TaskCheck from "node/task/TaskCheck.js";
import TaskText from "node/task/TaskText.js";

const TaskTodo = Ractive.extend({
  components: {
    TaskItem,
    TaskCheck,
    TaskText
  },
  template: `
    <TaskItem task={{task}}>
      {{#partial head}}
        <TaskCheck checked="{{task.completed}}" disabled={{task.holding}} on-check="handleCheck" />
      {{/partial}}
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
      TaskService.scoreTask({ taskId, direction })
        .then(() => !task.completed && TaskService.moveTask({ taskId, position }))
    },
  }
});

export default TaskTodo;
