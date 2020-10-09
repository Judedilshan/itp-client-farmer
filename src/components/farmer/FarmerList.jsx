import React, { Component } from "react";
import FarmerManagementDataService from "../../services/farmer.management.service";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../App.css";

export default class FarmerList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchFarmerName = this.onChangeSearchFarmerName.bind(this);
    this.retrieveFarmers = this.retrieveFarmers.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveFarmers = this.setActiveFarmers.bind(this);
    this.removeAllFarmers = this.removeAllFarmers.bind(this);
    this.searchFarmerName = this.searchFarmerName.bind(this);

    this.state = {
      farmer: [],
      currentFarmer: null,
      currentIndex: -1,
      searchFarmerName: "",
    };
  }

  componentDidMount() {
    this.retrieveFarmers();
  }

  onChangeSearchFarmerName(e) {
    const searchFarmerName = e.target.value;

    this.setState({
      searchFarmerName: searchFarmerName,
    });
  }

  retrieveFarmers() {
    FarmerManagementDataService.getAll()
      .then((response) => {
        this.setState({
          farmer: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveFarmerName();
    this.setState({
      currentFarmer: null,
      currentIndex: -1,
    });
  }

  setActiveFarmers(far, index) {
    this.setState({
      currentFarmer: far,
      currentIndex: index,
    });
  }

  removeAllFarmers() {
    FarmerManagementDataService.deleteAll()
      .then((response) => {
        console.log(response.data);
        this.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  searchFarmerName() {
    FarmerManagementDataService.findByFarmerName(this.state.searchFarmerName)
      .then((response) => {
        this.setState({
          farmer: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const {
      searchFarmerName,
      farmer,
      currentFarmer,
      currentIndex,
    } = this.state;

    return (
      

      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by farmer Name"
              value={searchFarmerName}
              onChange={this.onChangeSearchFarmerName}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchFarmerName}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        
        <div className="col-md-6">
          <h4>Farmers List</h4>

          <ul className="list-group">
            {farmer &&

            //need to check
              farmer.map((far, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveFarmers(far, index)}
                  key={index}
                >
                  {far.farmerName}
                  
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllFarmers}
          >
            Remove All Farmer Details
          </button>
          <Link
          //check this
            to={"/farmer-management/farmers/add-farmer"}
            className="badge badge-warning"
          >
            Add Details
          </Link>

          
        </div>
        <div className="col-md-6">
          {currentFarmer ? (
            <div>
              <h4>Farmer Details</h4>
              <div>
                <label>
                  <strong>Farmer Name:</strong>
                </label>{" "}
                {currentFarmer.farmerName} {/* in here .policy = title */}
              </div>
              <div>
                <label>
                  <strong>Contact number :</strong>
                </label>{" "}
                {currentFarmer.contact} 
              </div>

              {/* <div>
                <label>
                  <strong>Batch Id:</strong>
                </label>{" "}
                {currentDetails.batchId}
              </div> */}

              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentFarmer.validity ? "Valid" : "Invalid"}
              </div>

              <Link
                to={"/farmer-management/farmers/" + currentFarmer.id}
                className="badge badge-warning"
              >
                Edit Details
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Click on a Farmer to View the Id...</p>
            </div>
          )}
        </div>
      </div>
      
    );
  }
}
