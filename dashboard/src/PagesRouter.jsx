import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import "./PagesRouter.module.css";

import { Login } from './components/Login'
import { Dashboard } from './components/Dashboard/Dashboard.jsx'

export const PagesRouter = () => {

    return (
        <>
        <Router>
            <Routes>
                <Route exact path="/" element={<Login />} />
                <Route exact path="/dashboard" element={
                    <Dashboard title='HomeFarm'>Dashboard</Dashboard>
                } />
            </Routes>
        </Router>
        </>
    )
}



