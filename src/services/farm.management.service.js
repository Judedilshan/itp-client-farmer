import http from "../http-common";

class FarmManagementDataService {
  getAll() {
    return http.get("/farm-management/farms");
  }

  get(id) {
    return http.get(`/farm-management/farms/${id}`);
  }

  create(data) {
    return http.post("/farm-management/farms", data);
  }

  update(id, data) {
    return http.put(`/farm-management/farms/${id}`, data);
  }

  delete(id) {
    return http.delete(`/farm-management/farms/${id}`);
  }

  deleteAll() {
    return http.delete(`/farm-management/farms`);
  }

  findByFarmName(farmName) {
    return http.get(`/farm-management/farms?farmName=${farmName}`);
  }
}

export default new FarmManagementDataService();
