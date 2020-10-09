import http from "../http-common";

class FarmerManagementDataService {
  getAll() {
    return http.get("/farmer-management/farmers");
  }

  get(id) {
    return http.get(`/farmer-management/farmers/${id}`);
  }

  create(data) {
    return http.post("/farmer-management/farmers", data);
  }

  update(id, data) {
    return http.put(`/farmer-management/farmers/${id}`, data);
  }

  delete(id) {
    return http.delete(`/farmer-management/farmers/${id}`);
  }

  deleteAll() {
    return http.delete(`/farmer-management/farmers`);
  }

  findByFarmerName(farmerName) {
    return http.get(`/farmer-management/farmers?farmerName=${farmerName}`);
  }
}

export default new FarmerManagementDataService();
