import Icon from "node/text/Icon.js"
import TaskText from "node/task/TaskText.js"

const TaskItem = Ractive.extend({
  components: { Icon, TaskText },
  partials: { head: [], body: [], tail: [] },
  data () {
    return {
      task: null,
    }
  },
  on: {
    handleDelete (ctx) {
      const task = this.get("task")
      this.fire("deleteTask", {}, task)
    }
  },
  template: `
    <li class="task-item">
      <div class="row">
        <div class="col task-item-head">
          {{yield head }}
        </div>
        <div class="col task-item-body" style="flex-grow: 1">
          <TaskText text={{task.text}} mute={{task.completed}} />
          {{yield body }}
        </div>
        <div class="col task-item-tail">
          {{yield tail }}
          <a class="text-danger" on-click="handleDelete"><Icon icon="trash" /></a>
        </div>
      </div>
    </li>
  `,
  css: `
    .task-item {
      list-style-type: none;
      transition: background-color 0.3s ease;
      border-bottom: 1px dashed #D4A373;
      padding-top: 3px;
      padding-bottom: 3px;
      font-size: 16px;
    }

    .task-item:hover {
      background-color: #FEFAE0;
    }

    .row {
      display: flex;
      align-items: center;
    }

    .col {
      flex-basis: auto;
      flex-grow: 0;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding: 0 3px;
    }

    .task-item-tail {
      display: none;
    }

    .task-item:hover .task-item-tail {
      display: block;
    }
  `
});

export default TaskItem;
