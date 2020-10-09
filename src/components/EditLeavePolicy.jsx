import React, { Component } from "react";
import VetManagementDataService from "../services/vet.management.service";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

export default class LeavePolicy extends Component {
  constructor(props) {
    super(props);
    this.onChangeMamount = this.onChangeMamount.bind(this);
    this.onChangeDes = this.onChangeDes.bind(this);
    this.onChangeId = this.onChangeId.bind(this);
    this.getMamount = this.getMamount.bind(this);
    this.updateValidity = this.updateValidity.bind(this);
    this.updateDetails = this.updateDetails.bind(this);
    this.deleteDetails = this.deleteDetails.bind(this);

    this.state = {
      currentDetails: {
        id: null,
        amount: "" /*title*/,
        des: "",
        Id: "",
        validity: false,
      },
      message: "",
    };
  }

  componentDidMount() {
    this.getMamount(this.props.match.params.id);
  }

  onChangeMamount(e) {
    const amount = e.target.value;//

    this.setState(function (prevState) {
      return {
        currentDetails: {
          ...prevState.currentDetails,
          amount: amount /* in here .policy = title */,
        },
      };
    });
  }
  onChangeDes(e) {
    const des = e.target.value;//

    this.setState(function (prevState) {
      return {
        currentDetails: {
          ...prevState.currentDetails,
          des: des /* in here .policy = title */,
        },
      };
    });
  }

  onChangeId(e) {
    const Id = e.target.value;

    this.setState((prevState) => ({
      currentDetails: {
        ...prevState.currentDetails,
        Id: Id,
      },
    }));
  }

  getMamount(id) {
    VetManagementDataService.get(id)
      .then((response) => {
        this.setState({
          currentDetails: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateValidity(status) {
    var data = {
      id: this.state.currentDetails.id,
      amount: this.state.currentDetails.amount,
      Id: this.state.currentDetails.Id,
      validity: status,
    };

    VetManagementDataService.update(this.state.currentDetails.id, data)
      .then((response) => {
        this.setState((prevState) => ({
          currentDetails: {
            ...prevState.currentDetails,
            validity: status,
          },
        }));
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateDetails() {
    VetManagementDataService.update(
      this.state.currentDetails.id,
      this.state.currentDetails
    )
      .then((response) => {
        console.log(response.data);
        this.setState({
          message: "The Leave Policy was updated successfully!",
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  deleteDetails() {
    VetManagementDataService.delete(this.state.currentDetails.id)
      .then((response) => {
        console.log(response.data);
        this.props.history.push("/leave-management/leave-policies");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentDetails } = this.state;

    return (
      <div>
        {currentDetails ? (
          <div className="toVetTaskForm">
            <h4>Leave Policy</h4>
            <form>
              <div className="form-group">
                <label htmlFor="amount">Mortality Amount</label>
                <input
                  type="text"
                  className="form-control"
                  id="amount"
                  value={currentDetails.amount}
                  onChange={this.onChangeMamount}
                />
              </div>
              <div className="form-group">
                <label htmlFor="amount">Des</label>
                <input
                  type="text"
                  className="form-control"
                  id="des"
                  value={currentDetails.des}
                  onChange={this.onChangeDes}
                />
              </div>
              <div className="form-group">
                <label htmlFor="Id">Batch Id</label>
                <input
                  type="text"
                  className="form-control"
                  id="batchId"
                  value={currentDetails.Id}
                  onChange={this.onChangeId}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentDetails.validity ? "Valid" : "Invalid"}
              </div>
            </form>

            {currentDetails.validity ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updateValidity(false)}
              >
                Invalid
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updateValidity(true)}
              >
                Valid
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteDetails}
            >
              Remove
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateDetails}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Leave Policy...</p>
          </div>
        )}
      </div>
    );
  }
}
