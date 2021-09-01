//import Signup from "./components/pages/signup/Signup";
import Company from "./components/pages/company/Company";
import updatePatient from "./components/pages/patient/updatePatient";
import Home from "./components/pages/home/Home";
import Topbar from "./components/topbar/Topbar";
import Sidebar from "./components/sidebar/Sidebar";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./app.scss";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Topbar />
        <Sidebar />
        <Switch>
          <Route component={Home} path="/" exact />
          <Route component={Company} path="/company" />
          <Route component={updatePatient} path="/updatePatient" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
