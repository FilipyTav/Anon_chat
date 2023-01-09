import { FC, ReactElement, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";

import "./styles/App.scss";

import { BoardType } from "./helpers/types";

import Boards from "./components/Boards_menu";
import Navbar from "./components/Navbar";
import Board from "./components/Board";

interface Props {}

const App: FC<Props> = (): ReactElement => {
    const [current_board, set_current_board] = useState<BoardType | null>(null);
    const [boards, set_boards] = useState<BoardType[]>([]);

    const get_boards = async () => {
        const result = await axios.get("http://localhost:3001/");
        set_boards(result.data.data);
        console.log(result.data.data[0].url);
        console.log(result.data.data);
    };

    useEffect(() => {
        set_current_board(boards[0]);

        get_boards();
    }, []);

    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Navbar />

            <Routes>
                <Route path="/" element={<Navigate to="/boards" />} />

                <Route path="/boards" element={<Boards boards={boards} />} />

                <Route
                    path="/board/:name"
                    element={<Board data={current_board} />}
                />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
