import React, { Component } from "react";
import { withFirebase } from "../../Firebase/Database"
import { compose } from "recompose";
// import Competition from "../../models/competition";
// import Competition from "../../models/competition";

// interface ILandingPageProps {
//     firebase: any;
// }

// interface ILandingPageState {
//     competitions: Array<Competition>;
// }

class LandingBase extends Component {

    constructor(props: any) {
        super(props);
        this.state = {
            competitions: []
        };
    }

    // TODO: Add Competition functionality 

    // componentDidMount() {
    //     this.props.firebase
    //         .receiveCompetitionUpdates(this.competitionUpdateCallback);
    // }

    // competitionUpdateCallback = (result: any) => {
    //     this.setState({ competitions: [] }) // Empty array
    //     result.forEach((doc: any) => {
    //         this.setState(prevState => ({
    //             competitions: [...prevState.competitions, doc.data()] // Append to array
    //         }));
    //     })
    // }

    render() {
        return (<div>Landing</div>)
    }

}

const Landing = compose(
    withFirebase
)(LandingBase);

export default Landing;