import axios from "axios";
import { FC, ReactElement, useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import "./styles/App.scss";

import Board from "./components/Board";
import Boards from "./components/Boards_menu";
import Navbar from "./components/Navbar";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import { UserType } from "./helpers/types";

interface Props {}

const App: FC<Props> = (): ReactElement => {
    const [user, set_user] = useState<UserType | null>(null);

    const get_user = async (): Promise<void> => {
        try {
            const result = await axios.get("http://localhost:3001/get_user", {
                withCredentials: true,
            });

            set_user(result.data);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Navbar user={user} get_user={get_user} />

            <Routes>
                <Route path="/" element={<Navigate to="/boards" />} />

                <Route path="/boards" element={<Boards user={user} />} />

                <Route path="/board/:name" element={<Board user={user} />} />

                <Route path="/signup" element={<Signup />} />

                <Route
                    path="/signin"
                    element={<Signin get_user={get_user} />}
                />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
