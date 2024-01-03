import React, { Component } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { showMessage } from "react-native-flash-message";

export const NetworkContext = React.createContext({ isConnected: true });
let unsubscribe = null;
export class NetworkProvider extends Component {
    state = {
        isConnected: true
    };

    componentDidMount() {
        unsubscribe = NetInfo.addEventListener(state => {
            if(this.state.isConnected && !state.isConnected )
            {
                showMessage({
                    message: 'Info!',
                    description: 'You are now offline.',
                    type: "info",
                });
            }
            if(!this.state.isConnected && state.isConnected ) 
            {
                showMessage({
                    message: 'Info!',
                    description: 'You are now online.',
                    type: "success",
                });
            }
        this.setState({ isConnected: state.isConnected });
        });
    }

    componentWillUnmount() {
        if (unsubscribe != null) unsubscribe()
    }

    render() {
        return (
        <NetworkContext.Provider value={this.state}>
            {this.props.children}
        </NetworkContext.Provider>
        );
    }
}
