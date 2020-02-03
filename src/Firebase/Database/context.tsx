import React from 'react';

// TODO: Change type to the specific type Firebase returns once we figure it out
const FirebaseContext = React.createContext<any | null>(null);

export const withFirebase = (Component: any) => (props: any) => (
    <FirebaseContext.Consumer>{firebase => <Component {...props} firebase={firebase} />}</FirebaseContext.Consumer>
);
export default FirebaseContext;
