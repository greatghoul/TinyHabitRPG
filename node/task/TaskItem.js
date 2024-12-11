const TaskItem = Ractive.extend({
  template: `
    <li class="task-item">
      <div class="row">
        <div class="col">
          {{ yield head }}
        </div>
        <div class="col" style="flex-grow: 1">
          {{ yield body }}
        </div>
        <div class="col">
          {{ yield tail }}
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
  `
});

export default TaskItem;
