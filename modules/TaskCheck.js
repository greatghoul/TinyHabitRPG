const TaskCheck = Ractive.extend({
  data: function () {
    return {
      checked: false,
      disabled: false,
    }
  },
  template: `
    <label class="task-check">
      <input
        type="checkbox"
        checked="{{checked}}"
        disabled="{{disabled}}"
        on-change="handleChange"
      />
    </label>
  `,
  css: `
    .task-check {
      display: flex;
    }

    .task-check input {
      margin: 0;
      width: 16px;
      height: 16px;
      cursor: pointer;
    }
  `,
  on: {
    handleChange() {
      this.fire('check', this.get('checked'));
    }
  }
});

export default TaskCheck;