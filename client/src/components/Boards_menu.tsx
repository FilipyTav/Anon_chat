import axios from "axios";
import { FC, ReactElement, MouseEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { BoardType, MessageType, UserType } from "../helpers/types";

interface Props {
    user: UserType | null;
}

const Boards: FC<Props> = ({ user }): ReactElement => {
    const [boards, set_boards] = useState<BoardType[]>([]);

    const get_boards = async () => {
        const result = await axios.get("http://localhost:3001/", {
            withCredentials: true,
        });

        set_boards(result.data);
    };

    useEffect(() => {
        get_boards();
    }, []);

    // Adds or removes the 'active' class to a container
    const toggle_active = (
        e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
        target_class: string
    ) => {
        // So it stops saying it's not a DOM element
        const target = e.target as HTMLDivElement;

        // If the anchor is clicked, the user should be directed to the selected board page
        if (target.tagName !== "A")
            target.closest(`.${target_class}`)?.classList.toggle("active");
    };

    const render_author_name = (msg: MessageType): ReactElement => {
        if (user) {
            switch (true) {
                case user.username === msg.author.username:
                    return <span className="you">{msg.author.username}</span>;

                case user.username !== msg.author.username &&
                    user.membership_status !== "guest":
                    return <>{msg.author.username}</>;

                default:
                    return <>Anonymous</>;
            }
        }

        return <>Anonymous</>;
    };

    return (
        <main className="boards">
            {boards.map((board: BoardType) => {
                return (
                    <div
                        className="board"
                        key={board._id}
                        onClick={(
                            e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
                        ) => toggle_active(e, "board")}
                    >
                        {/* Displays the name with the first letter uppercased */}
                        <h2 className="name">
                            <Link to={board.url}>{`${board.name
                                .slice(0, 1)
                                .toUpperCase()}${board.name.slice(1)}`}</Link>
                        </h2>

                        <div className="messages">
                            {board.messages.map((msg) => {
                                return (
                                    <div className="message" key={msg._id}>
                                        <h2 className="author">
                                            {render_author_name(msg)}
                                        </h2>
                                        <p className="content">{msg.content}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </main>
    );
};

export default Boards;
