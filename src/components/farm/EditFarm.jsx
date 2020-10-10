import React, { Component } from "react";
import FarmManagementDataService from "../../services/farm.management.service";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../App.css";

export default class EditFarm extends Component {
  constructor(props) {
    super(props);
    this.onChangeFarmName = this.onChangeFarmName.bind(this);
    this.onChangeFarmId = this.onChangeFarmId.bind(this);
    this.onChangeContact = this.onChangeContact.bind(this);
    this.getFarm = this.getFarm.bind(this);
    this.updateValidity = this.updateValidity.bind(this);
    this.updateFarm = this.updateFarm.bind(this);
    this.deleteFarm = this.deleteFarm.bind(this);

    this.state = {
      currentFarm: {
        id: null,
        farmName: "" /*title*/,
        farmId: "",
        contact: "",
        validity: false,
      },
      message: "",
    };
  }

  componentDidMount() {
    this.getFarm(this.props.match.params.id);
  }

  onChangeFarmName(e) {
    const farmName = e.target.value;

    this.setState(function (prevState) {
      return {
        currentFarm: {
          ...prevState.currentFarm,
          farmName: farmName ,
        },
      };
    });
  }

  onChangeFarmId(e) {
    const farmId = e.target.value;

    this.setState(function (prevState) {
      return {
        currentFarm: {
          ...prevState.currentFarm,
          farmId: farmId ,
        },
      };
    });
  }
  onChangeContact(e) {
    const contact = e.target.value;

    this.setState(function (prevState) {
      return {
        currentFarm: {
          ...prevState.currentFarm,
          contact: contact ,
        },
      };
    });
  }


  getFarm(id) {
    FarmManagementDataService.get(id)
      .then((response) => {
        this.setState({
          currentFarm: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateValidity(status) {
    var data = {
      id: this.state.currentFarm.id,
      farmName: this.state.currentFarm.farmName,
      contact: this.state.currentFarm.contact,
      validity: status,
    };

    FarmManagementDataService.update(this.state.currentFarm.id, data)
      .then((response) => {
        this.setState((prevState) => ({
          currentFarm: {
            ...prevState.currentFarm,
            validity: status,
          },
        }));
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateFarm() {
    FarmManagementDataService.update(
      this.state.currentFarm.id,
      this.state.currentFarm
    )
      .then((response) => {
        console.log(response.data);
        this.setState({
          message: "The farm was updated successfully!",
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  deleteFarm() {
    FarmManagementDataService.delete(this.state.currentFarm.id)
      .then((response) => {
        console.log(response.data);
        this.props.history.push("/farm-management/farms");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentFarm } = this.state;

    return (
      <div>
        {currentFarm ? (
          //check
          <div className="toVetTaskForm"> 
            <h4>Farms</h4>
            <form>
              <div className="form-group">
                <label htmlFor="farmName">farm Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="farmName"
                  value={currentFarm.farmName}
                  onChange={this.onChangeFarmName}
                />
              </div>

              <div className="form-group">
                <label htmlFor="farmId">farm Id</label>
                <input
                  type="text"
                  className="form-control"
                  id="farmId"
                  value={currentFarm.farmId}
                  onChange={this.onChangeFarmId}
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact">Contact</label>
                <input
                  type="text"
                  className="form-control"
                  id="contact"
                  value={currentFarm.contact}
                  onChange={this.onChangeContact}
                />
              </div>


              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentFarm.validity ? "Valid" : "Invalid"}
              </div>
            </form>

            {currentFarm.validity ? (
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
              onClick={this.deleteFarm}
            >
              Remove
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateFarm}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Farm...</p>
          </div>
        )}
      </div>
    );
  }
}
