import React, { Component } from "react";
import FarmerManagementDataService from "../../services/farmer.management.service";
import "bootstrap/dist/css/bootstrap.min.css";
// import "../";

export default class AddFarmer extends Component {
  constructor(props) {
    super(props);
    this.onChangeFarmerName = this.onChangeFarmerName.bind(this);
    this.onChangeContact = this.onChangeContact.bind(this);
    // this.onChangeId = this.onChangeId.bind(this);
    this.saveFarmer = this.saveFarmer.bind(this);
    this.newFarmer = this.newFarmer.bind(this);

    this.state = {
      id: null,
      farmerName: "" /*title*/,
      contact: "" ,
    //   batchId: "",
      validity: false,

      submitted: false,
    };
  }

  onChangeFarmerName(e) {
    this.setState({
      farmerName: e.target.value,
    });
  }

  onChangeContact(e) {
    this.setState({
      contact: e.target.value,
    });
  }

//   onChangeId(e) {
//     this.setState({
//       batchId: e.target.value,
//     });
//   }

  saveFarmer() {
    var data = {
      farmerName: this.state.farmerName,
      contact: this.state.contact,   // check
    //   batchId: this.state.batchId,
    };

    FarmerManagementDataService.create(data)
      .then((response) => {
        this.setState({
          id: response.data.id,
          farmerName: response.data.farmerName,
          contact: response.data.contact,
        //   batchId: response.data.batchId,
          validity: response.data.validity,

          submitted: true,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  newFarmer() {
    this.setState({
      id: null,
      farmerName: "",
      contact:"",
    //   batchId: "",
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
            <button className="btn btn-success" onClick={this.newFarmer}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="farmerName">Farmer Name</label>
              <input
                type="text"
                className="form-control"
                id="farmerName"
                required
                value={this.state.farmerName}
                onChange={this.onChangeFarmerName}
                name="farmerName"
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

            {/* <div className="form-group">
              <label htmlFor="batchId">Batch Id</label>
              <input
                type="text"
                className="form-control"
                id="Id"
                required
                value={this.state.batchId}
                onChange={this.onChangeId}
                name="batchId"
              />
            </div> */}

            <button onClick={this.saveFarmer} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
