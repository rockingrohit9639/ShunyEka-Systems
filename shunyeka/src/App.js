import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import Home from "./components/Home/Home";
import NewOrUpdateUser from "./components/NewOrUpdateUser/NewOrUpdateUser";
import UserDetails from './components/UserDetails/UserDetails';
import React from 'react';
import { getAllUsers } from "./axios/instance";
import { useDataLayerValues } from "./DataLayer";
import Amplify from "aws-amplify";
import awsConfig from "./aws-exports";
import { withAuthenticator } from "@aws-amplify/ui-react";

Amplify.configure(awsConfig);


function App()
{

  const [{ users }, dispatch] = useDataLayerValues();

  const getUsers = async () =>
  {
    try
    {
      const allUsers = await getAllUsers();

      dispatch({
        type: "SET_USERS",
        users: allUsers.data
      });

      dispatch({
        type: "SET_TOTAL_USERS",
        totalUsers: allUsers.data.length
      });

    }
    catch (error)
    {
      console.log(error);
    }
  }

  React.useEffect(() =>
  {
    getUsers();
  }, [dispatch]);

  return (
    <div className="App">


      <Router>
        <Navbar />
        <Switch>
          
          <Route exact path="/" component={Home} />
          <Route exact path="/user" component={NewOrUpdateUser} />
          <Route exact path="/user/:id" component={UserDetails} />
        </Switch>
      </Router>


    </div>
  );
}

export default withAuthenticator(App);
