import Habitica from "services/Habitica.js"

class TaskService extends Habitica {
  getUserTasks (params) {
    return this.api().get("/tasks/user", { params })
  }

  createUserTask (params) {
    return this.api().post("/tasks/user", params)
  }

  getTask (taskId) {
    return this.api().get(`/tasks/${taskId}`)
  }

  scoreTask ({ taskId, direction }) {
    return this.api().post(`/tasks/${taskId}/score/${direction}`)
  }

  moveTask ({ taskId, position }) {
    return this.api().post(`/tasks/${taskId}/move/to/${position}`)
  }
}

export default TaskService
