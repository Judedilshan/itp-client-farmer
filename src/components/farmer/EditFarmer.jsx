import React, { Component } from "react";
import FarmerManagementDataService from "../../services/farmer.management.service";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../App.css";

export default class EditFarmer extends Component {
  constructor(props) {
    super(props);
    this.onChangeFarmerName = this.onChangeFarmerName.bind(this);
    this.onChangeContact = this.onChangeContact.bind(this);
    // this.onChangeId = this.onChangeId.bind(this);
    this.getFarmer = this.getFarmer.bind(this);
    this.updateValidity = this.updateValidity.bind(this);
    this.updateFarmer = this.updateFarmer.bind(this);
    this.deleteFarmer = this.deleteFarmer.bind(this);

    this.state = {
      currentFarmer: {
        id: null,
        farmerName: "" /*title*/,
        contact: "",
        // Id: "",
        validity: false,
      },
      message: "",
    };
  }

  componentDidMount() {
    this.getFarmer(this.props.match.params.id);
  }

  onChangeFarmerName(e) {
    const farmerName = e.target.value;

    this.setState(function (prevState) {
      return {
        currentFarmer: {
          ...prevState.currentFarmer,
          farmerName: farmerName /* in here .policy = title */,
        },
      };
    });
  }
  onChangeContact(e) {
    const contact = e.target.value;//

    this.setState(function (prevState) {
      return {
        currentFarmer: {
          ...prevState.currentFarmer,
          contact: contact /* in here .policy = title */,
        },
      };
    });
  }

  // onChangeId(e) {
  //   const Id = e.target.value;

  //   this.setState((prevState) => ({
  //     currentDetails: {
  //       ...prevState.currentDetails,
  //       Id: Id,
  //     },
  //   }));
  // }

  getFarmer(id) {
    FarmerManagementDataService.get(id)
      .then((response) => {
        this.setState({
          currentFarmer: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateValidity(status) {
    var data = {
      id: this.state.currentFarmer.id,
      farmerName: this.state.currentFarmer.farmerName,
      contact: this.state.currentFarmer.contact,
      validity: status,
    };

    FarmerManagementDataService.update(this.state.currentFarmer.id, data)
      .then((response) => {
        this.setState((prevState) => ({
          currentFarmer: {
            ...prevState.currentFarmer,
            validity: status,
          },
        }));
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateFarmer() {
    FarmerManagementDataService.update(
      this.state.currentFarmer.id,
      this.state.currentFarmer
    )
      .then((response) => {
        console.log(response.data);
        this.setState({
          message: "The farmer was updated successfully!",
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  deleteFarmer() {
    FarmerManagementDataService.delete(this.state.currentFarmer.id)
      .then((response) => {
        console.log(response.data);
        this.props.history.push("/farmer-management/farmers");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentFarmer } = this.state;

    return (
      <div>
        {currentFarmer ? (
          //check
          <div className="toVetTaskForm"> 
            <h4>Farmers</h4>
            <form>
              <div className="form-group">
                <label htmlFor="farmerName">farmer Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="farmerName"
                  value={currentFarmer.farmerName}
                  onChange={this.onChangeFarmerName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="contact">Contact</label>
                <input
                  type="text"
                  className="form-control"
                  id="contact"
                  value={currentFarmer.contact}
                  onChange={this.onChangeContact}
                />
              </div>


              {/* <div className="form-group">
                <label htmlFor="Id">Batch Id</label>
                <input
                  type="text"
                  className="form-control"
                  id="batchId"
                  value={currentDetails.Id}
                  onChange={this.onChangeId}
                />
              </div> */}


              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentFarmer.validity ? "Valid" : "Invalid"}
              </div>
            </form>

            {currentFarmer.validity ? (
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
              onClick={this.deleteFarmer}
            >
              Remove
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateFarmer}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Farmer...</p>
          </div>
        )}
      </div>
    );
  }
}
