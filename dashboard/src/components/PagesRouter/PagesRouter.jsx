import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import "./PagesRouter.module.css";

import { Login } from '../Login/Login.jsx'
import { Dashboard } from '../Dashboard/Dashboard.jsx'
import { UserProvider } from "../Provider/UserProvider";
import { ModuleProvider } from '../Provider/ModuleProvider.jsx';

export const PagesRouter = () => {

    return (
        <UserProvider>
            <Router>
                <Routes>
                    <Route exact path="/" element={ <Login /> }/>
                    <Route exact path="/dashboard" element={
                        <ModuleProvider>
                            <Dashboard title='HomeFarm'>Dashboard</Dashboard>
                        </ModuleProvider>
                        } />
                </Routes>
            </Router>
        </UserProvider>
    )
}
