import { differenceInCalendarDays, format } from "date-fns";

const TaskDue = Ractive.extend({
  template: `
    <span class="task-due" title={{dueDate}}>{{dueDays}}d</span>
  `,
  data: function () {
    return {
      due: null,
    };
  },
  computed: {
    dueDays () {
      const due = this.get('due');
      const today = new Date();
      return differenceInCalendarDays(due, today);
    },
    dueDate () {
      const due = this.get('due');
      return format(due, 'yyyy-MM-dd, E');
    },
  }
});

export default TaskDue;
