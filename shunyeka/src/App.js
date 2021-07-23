import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import Home from "./components/Home/Home";
import NewOrUpdateUser from "./components/NewOrUpdateUser/NewOrUpdateUser";
import UserDetails from './components/UserDetails/UserDetails';


function App() {
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

export default App;
