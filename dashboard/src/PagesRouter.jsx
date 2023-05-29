import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import "./PagesRouter.module.css";

import { Login } from './components/Login'

export const PagesRouter = () => {

    return (
        <>
        <Router>
            <Routes>
                <Route exact path="/" element={<Login />} />
            </Routes>
        </Router>
        </>
    )
}



