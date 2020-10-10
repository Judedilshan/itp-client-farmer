import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";

import Header from "./components/Header";
import Footer from "./components/Footer";

import LeaveDash from "./components/LeaveDash";

// import LeavePolicyList from "./components/LeavePolicyList";
// import EditLeavePolicy from "./components/EditLeavePolicy";
// import AddLeavePolicy from "./components/AddLeavePolicy";

import FarmerList from "./components/farmer/FarmerList";
import EditFarmer from "./components/farmer/EditFarmer";
import AddFarmer from "./components/farmer/AddFarmer";

// import FarmList from "./components/farm/FarmList";
// import EditFarm from "./components/farm/EditFarm";
// import AddFarm from "./components/farm/AddFarm";

import SideNavLeaves from "./components/SideNavLeaves";

class App extends Component {
  render() {
    return (
      <div>
        <Route path="/farmer-management/farmers" component={Header} />
        <Route path="/farmer-management/farmers" component={Footer} />
        <Route path="/farmer-management/farmers" component={SideNavLeaves} />
        <Switch>
          <Route exact path="/farmer-management/farmers" component={LeaveDash} />
          <Route
            exact
            path="/farmer-management/farmers/list"  //check
            component={FarmerList}
          />
          <Route
            exact
            path="/farmer-management/farmers/add-farmer"  //check
            component={AddFarmer}
          />
          <Route
            exact
            path="/farmer-management/farmers/:id"
            component={EditFarmer}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
