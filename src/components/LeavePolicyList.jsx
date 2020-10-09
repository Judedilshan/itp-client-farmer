import React, { Component } from "react";
import VetManagementDataService from "../services/vet.management.service";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

export default class LeavePolicyList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchId = this.onChangeSearchId.bind(this);
    this.retrieveDetails = this.retrieveDetails.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveDetails = this.setActiveDetails.bind(this);
    this.removeAllDetails = this.removeAllDetails.bind(this);
    this.searchId = this.searchId.bind(this);

    this.state = {
      detailss: [],
      currentDetails: null,
      currentIndex: -1,
      searchId: "",
    };
  }

  componentDidMount() {
    this.retrieveDetails();
  }

  onChangeSearchId(e) {
    const searchId = e.target.value;

    this.setState({
      searchId: searchId,
    });
  }

  retrieveDetails() {
    VetManagementDataService.getAll()
      .then((response) => {
        this.setState({
          detailss: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveDetails();
    this.setState({
      currentDetails: null,
      currentIndex: -1,
    });
  }

  setActiveDetails(amount, index) {
    this.setState({
      currentDetails: amount,
      currentIndex: index,
    });
  }

  removeAllDetails() {
    VetManagementDataService.deleteAll()
      .then((response) => {
        console.log(response.data);
        this.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  searchId() {
    VetManagementDataService.findByPolicyName(this.state.searchPolicyName)
      .then((response) => {
        this.setState({
          detailss: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const {
      searchId,
      detailss,
      currentDetails,
      currentIndex,
    } = this.state;

    return (
      

      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Batch Id"
              value={searchId}
              onChange={this.onChangeSearchId}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchId}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        
        <div className="col-md-6">
          <h4>Vet Task List</h4>

          <ul className="list-group">
            {detailss &&
              detailss.map((amount, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveDetails(amount, index)}
                  key={index}
                >
                  {amount.amount}
                  {/* in here .policy = title */}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllDetails}
          >
            Remove All Vet Details
          </button>
          <Link
            to={"/leave-management/leave-policies/add-policy"}
            className="badge badge-warning"
          >
            Add Details
          </Link>
        </div>
        <div className="col-md-6">
          {currentDetails ? (
            <div>
              <h4>Vet task Details</h4>
              <div>
                <label>
                  <strong>Mortality amount:</strong>
                </label>{" "}
                {currentDetails.amount} {/* in here .policy = title */}
              </div>
              <div>
                <label>
                  <strong>Des:</strong>
                </label>{" "}
                {currentDetails.des} 
              </div>
              <div>
                <label>
                  <strong>Batch Id:</strong>
                </label>{" "}
                {currentDetails.batchId}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentDetails.validity ? "Valid" : "Invalid"}
              </div>

              <Link
                to={"/leave-management/leave-policies/" + currentDetails.id}
                className="badge badge-warning"
              >
                Edit Details
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Click on a Vet Task to View the Id...</p>
            </div>
          )}
        </div>
      </div>
      
    );
  }
}
