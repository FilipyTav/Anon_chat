import { FC, ReactElement } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import "./styles/App.scss";

import Boards from "./components/Boards_menu";
import Navbar from "./components/Navbar";
import Board from "./components/Board";
import Signup from "./components/Signup";
import Signin from "./components/Signin";

interface Props {}

const App: FC<Props> = (): ReactElement => {
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Navbar />

            <Routes>
                <Route path="/" element={<Navigate to="/boards" />} />

                <Route path="/boards" element={<Boards />} />

                <Route path="/board/:name" element={<Board />} />

                <Route path="/signup" element={<Signup />} />

                <Route path="/signin" element={<Signin />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
