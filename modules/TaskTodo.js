import TaskService from "services/TaskService.js"; 
import TaskItem from "modules/TaskItem.js";
import TaskCheck from "modules/TaskCheck.js";
import TaskText from "modules/TaskText.js";

const taskService = new TaskService();

const TaskTodo = Ractive.extend({
  components: {
    TaskItem,
    TaskCheck,
    TaskText
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
  css: `
    .task-todo {
      list-style-type: none;
      transition: background-color 0.3s ease;
      border-bottom: 1px dashed #D4A373;
      padding-top: 3px;
      padding-bottom: 3px;
      font-size: 16px;
    }

    .task-todo.done {
      background-color: #e2e2e2;
    }

    .task-todo:hover {
      background-color: #FEFAE0;
    }

    .task-todo.done:hover {
      background-color: #d2d2d2;
    }
  `,
  data: function () {
    return {
      task: null,
      position: null,
    };
  },
  computed: {
    taskText: {
      get() {
        const task = this.get("task");
        const text = marked.parseInline(task.text);
        const aTags = text.match(/<a\s[^>]*href="[^"]*"[^>]*>.*?<\/a>/g);
        if (aTags) {
          const modifiedATags = text.replace(/<a\s[^>]*href="([^"]*)"[^>]*>([^<]*)<\/a>/g, '<a href="$1" target="_blank">$2</a>');
          return modifiedATags;
        } else {
          return text;
        }
      },
    },
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

export default TaskTodo;
