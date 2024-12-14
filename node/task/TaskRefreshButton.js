const TaskRefreshButton = Ractive.extend({
  template: `<button on-click="handleClick" disabled="{{@shared.fetchingTasks}}">Refresh</button>`,
  on: {
    handleClick () {
      this.fire('refreshTasks')
    }
  }
})

export default TaskRefreshButton
