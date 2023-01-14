import axios from "axios";
import { FC, ReactElement, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { BoardType, MessageType, UserType } from "../helpers/types";

interface Props {
    user: UserType | null;
}

const Board: FC<Props> = ({ user }): ReactElement => {
    const { name } = useParams();

    const [board_data, set_board_data] = useState<BoardType>({
        name: "",
        messages: [],
        url: "",
        _id: "",
    });

    const get_board_data = async () => {
        const result = await axios.get(`http://localhost:3001/board/${name}`);

        set_board_data(result.data);
    };

    useEffect(() => {
        get_board_data();
    }, []);

    return (
        <main className="board">
            <h1 className="board_name">{`${board_data.name
                .slice(0, 1)
                .toUpperCase()}${board_data.name.slice(1)}`}</h1>

            <div className="posts">
                {board_data.messages.map((msg: MessageType) => {
                    const msg_date = msg.createdAt.split("T");
                    const [date, time_incomplete] = msg_date;

                    const [time] = time_incomplete.split(".");

                    return (
                        <div className="post" key={msg._id}>
                            <div className="details">
                                {user ? (
                                    <>
                                        <p className="post_author">
                                            {msg.author.username}
                                        </p>

                                        <p className="post_date">{date}</p>
                                        <p className="post_time">{time}</p>
                                    </>
                                ) : (
                                    <p className="post_author">Anonymous</p>
                                )}
                            </div>

                            <p className="post_content">{msg.content}</p>
                        </div>
                    );
                })}
            </div>
        </main>
    );
};

export default Board;
