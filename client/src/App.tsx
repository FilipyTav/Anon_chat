import { FC, ReactElement, useEffect, useState } from "react";

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
    {
        name: "specific",
        messages: [],
    },
    {
        name: "specific",
        messages: [],
    },
    {
        name: "specific",
        messages: [],
    },
    {
        name: "specific",
        messages: [],
    },
    {
        name: "specific",
        messages: [],
    },
    {
        name: "specific",
        messages: [],
    },
    {
        name: "specific",
        messages: [],
    },
    {
        name: "specific",
        messages: [],
    },
    {
        name: "specific",
        messages: [],
    },
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
];

interface Props { }

const App: FC<Props> = (): ReactElement => {
    const [current_board, set_current_board] = useState<BoardType | null>(null);
    const [mq, set_mq] = useState<boolean>(
        window.matchMedia("(min-width: 40em)").matches,
    );

    useEffect(() => {
        set_current_board(null);

        window
            .matchMedia("(min-width: 40em)")
            .addEventListener("change", (e) => set_mq(e.matches));
    }, []);

    return (
        <>
            <Navbar window_matches={mq} />

            {current_board ? (
                <Board data={current_board} />
            ) : (
                <Boards boards={boards} />
            )}
        </>
    );
};

export default App;
