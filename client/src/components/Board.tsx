import { FC, ReactElement } from "react";
import { useParams } from "react-router-dom";

import { BoardType, MessageType } from "../helpers/types";

interface Props {
    data: BoardType | null;
}

const Board: FC<Props> = ({ data }): ReactElement => {
    if (!data) return <></>;

    return (
        <main className="board">
            <h1 className="board_name">{`${data.name
                .slice(0, 1)
                .toUpperCase()}${data.name.slice(1)}`}</h1>

            <div className="posts">
                {data.messages.map((msg: MessageType) => (
                    <div className="post">
                        <div className="details">
                            <p className="post_author">{msg.author}</p>
                        </div>
                        <p className="post_content">{msg.content}</p>
                    </div>
                ))}
            </div>
        </main>
    );
};

export default Board;
