import { FC, ReactElement, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import "./styles/App.scss";

import { BoardType } from "./helpers/types";

import Boards from "./components/Boards_menu";
import Navbar from "./components/Navbar";
import Board from "./components/Board";

// All the main boards
// will change later to get from database
const boards: BoardType[] = [
    {
        name: "general",
        messages: [
            {
                author: "me",
                content: "Hello",
                replies: [],
            },
            {
                author: "dunno",
                content: "Hi",
                replies: [],
            },
            {
                author: "hey",
                content: "how are ya",
                replies: [],
            },
        ],
    },
    {
        name: "specific",
        messages: [],
    },
];

interface Props {}

const App: FC<Props> = (): ReactElement => {
    const [current_board, set_current_board] = useState<BoardType | null>(null);

    useEffect(() => {
        set_current_board(null);
    }, []);

    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Navbar />

            <Routes>
                <Route path="/" element={<Navigate to="/boards" />} />

                <Route path="/boards" element={<Boards boards={boards} />} />

                <Route
                    path="/boards/:id"
                    element={<Board data={{ name: "me", messages: [] }} />}
                />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
