import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import SideDrawer from './components/SideDrawer';
import LandingPage from "./Pages/Landing";
import LoginPage from "./Pages/Login";
import RegisterPage from "./Pages/Register";
import * as ROUTES from "./constants/routes";
import './App.css';

const App: React.FC = () => {

  return (
    <div className="App">

      <AppBar position="static">
        <Toolbar>
          <SideDrawer />
        </Toolbar>
      </AppBar>

      <Router>

        <Route exact path={ROUTES.LANDING} component={LandingPage} />
        <Route path={ROUTES.REGISTER} component={RegisterPage} />
        <Route path={ROUTES.LOGIN} component={LoginPage} />
        {/* <Route exact path={ROUTES.COMPETITION} component={CompetitionPage} />
        <Route exact path={ROUTES.NEWCOMP} component={NewCompetitionPage} />
        <Route exact path={ROUTES.LEADERBOARD} component={LeaderboardPage} />

        <Route
          path={ROUTES.PASSWORD_FORGET}
          component={PasswordForgetPage}
        />
        <Route path={ROUTES.ACCOUNT} component={AccountPage} /> */}
      </Router>

    </div>
  );
}

export default App;
