import React, { Component } from "react";
import FarmManagementDataService from "../../services/farm.management.service";
import "bootstrap/dist/css/bootstrap.min.css";
// import "../";

export default class AddFarm extends Component {
  constructor(props) {
    super(props);
    this.onChangeFarmName = this.onChangeFarmName.bind(this);
    this.onChangeFarmId = this.onChangeFarmId.bind(this);
    this.onChangeContact = this.onChangeContact.bind(this);
    this.saveFarm = this.saveFarm.bind(this);
    this.newFarm = this.newFarm.bind(this);

    this.state = {
      id: null,
      farmName: "" /*title*/,
      farmId: "" ,
      contact: "" ,
      validity: false,

      submitted: false,
    };
  }

  onChangeFarmName(e) {
    this.setState({
      farmName: e.target.value,
    });
  }

  onChangeFarmId(e) {
    this.setState({
      farmId: e.target.value,
    });
  }

  onChangeContact(e) {
    this.setState({
      contact: e.target.value,
    });
  }

  saveFarm() {
    var data = {
      farmName: this.state.farmName,
      farmId: this.state.farmId,
      contact: this.state.contact,   // check
    };

    FarmManagementDataService.create(data)
      .then((response) => {
        this.setState({
          id: response.data.id,
          farmName: response.data.farmName,
          farmId: response.data.farmId,
          contact: response.data.contact,
          validity: response.data.validity,

          submitted: true,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  newFarm() {
    this.setState({
      id: null,
      farmName: "",
      farmId: "",
      contact:"",
      validity: false,

      submitted: false,
    });
  }

  render() {
    return (
        // for css
      <div className="toVetTaskForm">  
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newFarm}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="farmName">Farm Name</label>
              <input
                type="text"
                className="form-control"
                id="farmName"
                required
                value={this.state.farmName}
                onChange={this.onChangeFarmName}
                name="farmName"
              />
            </div>

            <div className="form-group">
              <label htmlFor="farmId">Farm Id</label>
              <input
                type="text"
                className="form-control"
                id="farmId"
                required
                value={this.state.farmId}
                onChange={this.onChangeFarmId}
                name="farmId"
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact">Contact</label>
              <input
                type="text"
                className="form-control"
                id="contact"
                required
                value={this.state.contact}
                onChange={this.onChangeContact}
                name="contact"
              />
            </div>


            <button onClick={this.saveFarm} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
