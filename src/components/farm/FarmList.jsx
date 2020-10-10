import React, { Component } from "react";
import FarmManagementDataService from "../../services/farm.management.service";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../App.css";

export default class FarmList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchFarmName = this.onChangeSearchFarmName.bind(this);
    this.retrieveFarm = this.retrieveFarms.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveFarms = this.setActiveFarms.bind(this);
    this.removeAllFarms = this.removeAllFarms.bind(this);
    this.searchFarmName = this.searchFarmName.bind(this);

    this.state = {
      farm: [],
      currentFarm: null,
      currentIndex: -1,
      searchFarmName: "",
    };

  }

  componentDidMount() {
    this.retrieveFarms();
  }

  onChangeSearchFarmName(e) {
    const searchFarmName = e.target.value;

    this.setState({
      searchFarmName: searchFarmName,
    });
  }

  retrieveFarms() {
    FarmManagementDataService.getAll()
      .then((response) => {
        this.setState({
          farm: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveFarmName();
    this.setState({
      currentFarm: null,
      currentIndex: -1,
    });
  }

  setActiveFarms(far, index) {
    this.setState({
      currentFarm: far,
      currentIndex: index,
    });
  }

  removeAllFarms() {
    FarmManagementDataService.deleteAll()
      .then((response) => {
        console.log(response.data);
        this.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  searchFarmName() {
    FarmManagementDataService.findByFarmName(this.state.searchFarmName)
      .then((response) => {
        this.setState({
          farm: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const {
      searchFarmName,
      farm,
      currentFarm,
      currentIndex,
    } = this.state;

    return (
      

      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by farm Name"
              value={searchFarmName}
              onChange={this.onChangeSearchFarmName}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchFarmName}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        
        <div className="col-md-6">
          <h4>Farms List</h4>

          <ul className="list-group">
            {farm &&

            //need to check
              farm.map((far, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveFarms(far, index)}
                  key={index}
                >
                  {far.farmName}
                  
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllFarms}
          >
            Remove All Farm Details
          </button>
          <Link
          //check this
            to={"/farm-management/farms/add-farm"}
            className="badge badge-warning"
          >
            Add Details
          </Link>

          
        </div>
        <div className="col-md-6">
          {currentFarm ? (
            <div>
              <h4>Farm Details</h4>
            
              <div>
                <label>
                  <strong>Farm Name:</strong>
                </label>{" "}
                {currentFarm.farmName} {/* in here .policy = title */}
              </div>

              <div>
                <label>
                  <strong>Farm Id:</strong>
                </label>{" "}
                {currentFarm.farmId} {/* in here .policy = title */}
              </div>
            
              <div>
                <label>
                  <strong>Contact number :</strong>
                </label>{" "}
                {currentFarm.contact} 
              </div>


              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentFarm.validity ? "Valid" : "Invalid"}
              </div>

              <Link
                to={"/farm-management/farms/" + currentFarm.id}
                className="badge badge-warning"
              >
                Edit Details
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Click on a Farm to View the Id...</p>
            </div>
          )}
        </div>
      </div>
      
    );
  }
}
