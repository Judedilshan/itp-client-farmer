import React from "react";
import { Link } from "react-router-dom";
import "../styles/sideNavLeaves.css";
// import LeavePolicy from "../leavePolicyComponent/leavePolicy";

class SideNavLeaves extends React.Component {
  // state = {  }
  render() {
    return (
      <div>
        <div className="sideNav">
          <Link to="/leave-management">Dashboard</Link>
          
          <br />
          <Link to="/leave-management/leave-policies">Vet Task List</Link>
          <br />
          <Link to="/leave-management/leave-policies/add-policy">Add Vet Task Details</Link>
          <br />

          {/* <Link to="/leave-management/leave-policies/:id">Update</Link> */}

          <br />
          
          
        </div>
      </div>
    );
  }
}

export default SideNavLeaves;
