import { FC, ReactElement } from "react";

import { BoardType } from "../helpers/types";

interface Props {
    boards: BoardType[];
}

const Boards: FC<Props> = ({ boards }): ReactElement => {
    return (
        <main className="boards">
            {boards.map((board: BoardType) => {
                return (
                    <div className="board" key={board.name}>
                        {/* Displays the name with the first letter uppercased */}
                        <h3 className="name">{`${board.name
                            .slice(0, 1)
                            .toUpperCase()}${board.name.slice(1)}`}</h3>

                        <div className="messages">
                            {board.messages.map((msg) => {
                                return (
                                    <div className="message" key={msg.author}>
                                        <h2>{msg.author}</h2>
                                        {msg.content}
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
