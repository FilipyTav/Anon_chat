import { FC, ReactElement, MouseEvent } from "react";
import { Link } from "react-router-dom";

import { BoardType } from "../helpers/types";

interface Props {
    boards: BoardType[];
}

const Boards: FC<Props> = ({ boards }): ReactElement => {
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

    return (
        <main className="boards">
            {boards.map((board: BoardType, index: number) => {
                return (
                    <div
                        className="board"
                        key={board.name}
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
                                    <div className="message" key={msg.author}>
                                        <h2 className="author">{msg.author}</h2>
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
