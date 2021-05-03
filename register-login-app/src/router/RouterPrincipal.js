import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

/**
 * Screens import
 */
import HomeScreen from '../screens/HomeScreen'
import RegisterScreen from '../screens/RegisterScreen'
import LoginScreen from '../screens/LoginScreen'

export default function RouterPrincipal() {
    return (
        <Router>
                <Switch>
                    <Route path="/login">
                        <LoginScreen />
                    </Route>
                    <Route path="/register">
                        <RegisterScreen />
                    </Route>
                    <Route path="/home">
                        <HomeScreen />
                    </Route>
                    <Route path="/">
                        <HomeScreen />
                    </Route>
                </Switch>
        </Router>
    );
}
