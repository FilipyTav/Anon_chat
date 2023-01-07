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
                content:
                    "Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat officia voluptate. Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa duis.",
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
        set_current_board(boards[0]);
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
