import React, { Component } from "react";
const Context = React.createContext();

const vouchers = null;

const initialState = {
    vouchers
}

const reducer = (state, action) => {
    switch(action.type) {
        case "SET_VOUCHERS":
            return { ...state, vouchers: action.payload };
        default:
            return state;
    }
}

export class Provider extends Component {
    state = {
        ...initialState,
        dispatch: action => {
            this.setState(state => reducer(state, action));
        },
    };
    render() {
        return (
            <Context.Provider value={this.state}>
                {this.props.children}
            </Context.Provider>
        );
    }
}

export const Consumer = Context.Consumer;

export const withContext = WrappedComponent => {
    return props => (
        <Consumer>
            {values => <WrappedComponent {...props} context={values} />}
        </Consumer>
    );
};
