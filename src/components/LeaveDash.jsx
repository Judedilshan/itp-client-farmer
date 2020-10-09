import React from "react";
import { Link } from "react-router-dom";
import "../styles/leaveDash.css";

// import LeavePolicy from "../leavePolicyComponent/leavePolicy";

class LeaveDash extends React.Component {
  // state = {  }
  render() {
    return (
      <div>
        <div className="topic">Vet Task Management</div>
        <div className="tab" id="tab1">
          <Link to={"/farmer-management/farmers"}>
          Vet Task List
          </Link>
        </div>
        <div className="tab" id="tab2">
          <Link to={"/leave-management/leave-policies/add-policy"}>Add Vet Task Details</Link>
        </div>
      </div>
    );
  }
}

export default LeaveDash;
