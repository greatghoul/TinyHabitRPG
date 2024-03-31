import Habitica from "services/Habitica.js";

class TaskService extends Habitica {
  getUserTasks(params) {
    return this.api().get("/tasks/user", { params });
  }

  createUserTask(params) {
    return this.api().post("/tasks/user", params);
  }

  scoreTask(params) {
    return this.api().post(`/tasks/${params.taskId}/score/${params.direction}`);
  }
}

export default TaskService;
