import React, {useEffect} from 'react';
import { useAuth } from 'react-oidc-context';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/home';
import Profile from './pages/profile';
import Todos from "./pages/todos";
import {useDispatch, useSelector} from "react-redux";
import { RootState } from "./store";
import { login, logout } from "./store/authSlice";
import Callback from "./callback";
import { useNavigate } from "react-router-dom";
import { DatePicker } from "antd";

function App() {
    const auth = useAuth();
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    useEffect( () => {
        if (auth.isAuthenticated) {
            const username = auth.user?.profile.preferred_username;
            if (username) {
                dispatch(login(username));
                // Redirect to Jmix App
                // window.location.href = 'http://localhost:8081/*'
            }
        } else {
            dispatch(logout());
        }
        const handleBeforeUnload = () => {
            dispatch(logout());
            sessionStorage.removeItem('isAuthenticated');
            sessionStorage.removeItem('user');
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };

    }, [auth.isAuthenticated, auth.user, dispatch]);

    const handleLogin = () => {
        auth.signinRedirect();
    };
    return (
        <Router>
            <DatePicker />
            <div>
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        {isAuthenticated && <li><Link to="/profile">Profile</Link></li>}
                        {isAuthenticated && <li><Link to="/todos">Todos</Link></li>}
                    </ul>
                    {!isAuthenticated ? (
                        <button onClick={handleLogin}>Login</button>
                    ) : (
                        <LogoutButton />
                    )}
                </nav>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/profile" element={<Profile user={auth.user} />} />
                    <Route path="/callback" element={<Callback />} />
                    <Route path="/todos" element={<Todos />} />
                </Routes>
            </div>
        </Router>
    );
}

function LogoutButton() {
    const auth = useAuth();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        auth.signoutRedirect().then(() => {
            navigate("/");
        });
    };

    return <button onClick={handleLogout}>Logout</button>;
}

export default App;