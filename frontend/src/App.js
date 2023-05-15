// App that renders a set of routes using the react-router-dom library.
// It includes several pages that are displayed at different URL paths, such as Index, Registration, UserBlog, and AdminBlog.
// The BrowserRouter component wraps the Routes component and provides the necessary functionality to handle client-side routing.

import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Index from "./pages";
import Registration from "./pages/registration";
import UserBlog from "./pages/userBlog";
import AdminBlog from "./pages/adminBlog";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route
                        path='/'
                        element={<Index/>}
                    />
                    <Route
                        path='/register'
                        element={<Registration/>}
                    />
                    <Route
                        path='/user-blog'
                        element={<UserBlog/>}
                    />
                    <Route
                        path='/admin-blog'
                        element={<AdminBlog/>}
                    />
                </Routes>
            </BrowserRouter>
        </div>
    )}

export default App;
