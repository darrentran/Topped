import React from 'react';
import CompetitionCard from './components/CompetitionCard/CompetitionCard';
import CompetitionProblemCard from './components/CompetitionProblemCard/CompetitionProblemCard';
import Typography from '@material-ui/core/Typography';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import SideDrawer from './components/SideDrawer';
import SearchBar from './components/SearchBar';
import './App.css';

const App: React.FC = () => {
    const competition_description: String =
        'Our monthly bouldering competiton series. Register to compete with the climbing commuity on a set of brand-new boulder problems and win free swag. \n\n - All abilities welcome \n Climbing shoe rentinal included \n - For ages 6 and up \n *6-13 year olds require direct adult supervision';

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <SideDrawer />
                </Toolbar>
            </AppBar>

            <SearchBar />

            <Typography align="left" variant="h4">
                Competition Card
            </Typography>
            <CompetitionCard
                name={'Wall Brawl - Community (Fall)'}
                description={competition_description}
                date={new Date().toISOString().substring(0, 10)}
                fee={20}
            />
            <br />
            <br />
            <CompetitionCard
                name={'Wall Brawl - Community (Winter)'}
                description={competition_description}
                date={new Date().toISOString().substring(0, 10)}
                fee={20}
            />

            <br />
            <br />

            <Typography align="left" variant="h4">
                Competition Problem Card
            </Typography>
            <CompetitionProblemCard problem_number={1} attempts_made={0} completed={false} />
        </div>
    );
};

export default App;
