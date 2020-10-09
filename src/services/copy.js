import http from "../http-common";

class VetManagementDataService {
  getAll() {
    return http.get("/leave-management/leave-policies");
  }

  get(id) {
    return http.get(`/leave-management/leave-policies/${id}`);
  }

  create(data) {
    return http.post("/leave-management/leave-policies", data);
  }

  update(id, data) {
    return http.put(`/leave-management/leave-policies/${id}`, data);
  }

  delete(id) {
    return http.delete(`/leave-management/leave-policies/${id}`);
  }

  deleteAll() {
    return http.delete(`/leave-management/leave-policies`);
  }

  findByPolicyName(policy) {
    return http.get(`/leave-management/leave-policies?policy=${policy}`);
  }
}

export default new LeaveManagementDataService();
