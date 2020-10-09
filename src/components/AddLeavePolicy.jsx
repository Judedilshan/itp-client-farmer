import React, { Component } from "react";
import VetManagementDataService from "../services/vet.management.service";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

export default class AddVetTask extends Component {
  constructor(props) {
    super(props);
    this.onChangeMamount = this.onChangeMamount.bind(this);
    this.onChangeDes = this.onChangeDes.bind(this);
    this.onChangeId = this.onChangeId.bind(this);
    this.saveVetTask = this.saveVetTask.bind(this);
    this.newVetTask = this.newVetTask.bind(this);

    this.state = {
      id: null,
      amount: "" /*title*/,
      batchId: "",
      validity: false,

      submitted: false,
    };
  }

  onChangeMamount(e) {
    this.setState({
      amount: e.target.value,
    });
  }

  onChangeDes(e) {
    this.setState({
      des: e.target.value,
    });
  }

  onChangeId(e) {
    this.setState({
      batchId: e.target.value,
    });
  }

  saveVetTask() {
    var data = {
      amount: this.state.amount,
      des: this.state.des,
      batchId: this.state.batchId,
    };

    VetManagementDataService.create(data)
      .then((response) => {
        this.setState({
          id: response.data.id,
          amount: response.data.amount,
          des: response.data.des,
          batchId: response.data.batchId,
          validity: response.data.validity,

          submitted: true,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  newVetTask() {
    this.setState({
      id: null,
      amount: "",
      des:"",
      batchId: "",
      validity: false,

      submitted: false,
    });
  }

  render() {
    return (
      <div className="toVetTaskForm">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newVetTask}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="amount">Mortality Amount</label>
              <input
                type="text"
                className="form-control"
                id="mAmount"
                required
                value={this.state.vet}
                onChange={this.onChangeMamount}
                name="amount"
              />
            </div>

            <div className="form-group">
              <label htmlFor="des">Des</label>
              <input
                type="text"
                className="form-control"
                id="des"
                required
                value={this.state.vet}
                onChange={this.onChangeDes}
                name="des"
              />
            </div>

            <div className="form-group">
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
            </div>

            <button onClick={this.saveVetTask} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
