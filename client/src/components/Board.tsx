import axios from "axios";
import {
    ChangeEvent,
    FC,
    FormEvent,
    MouseEvent,
    ReactElement,
    useEffect,
    useRef,
    useState,
} from "react";
import { useParams } from "react-router-dom";

import { BoardType, MessageType, UserType } from "../helpers/types";

interface Props {
    user: UserType | null;
}

const Board: FC<Props> = ({ user }): ReactElement => {
    const { name } = useParams();

    const text = useRef<HTMLTextAreaElement | null>(null);

    const [board_data, set_board_data] = useState<BoardType>({
        name: "",
        messages: [],
        url: "",
        _id: "",
    });

    const [new_comment, set_new_comment] = useState<string>("");

    const get_board_data = async () => {
        const result = await axios.get(`http://localhost:3001/board/${name}`);

        set_board_data(result.data);
    };

    useEffect(() => {
        get_board_data();
    }, []);

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

    const handle_submit = async (
        e: FormEvent<HTMLFormElement>
    ): Promise<void> => {
        e.preventDefault();

        if (!new_comment.trim()) return;

        try {
            const result = await axios.post(
                `http://localhost:3001/board/${name}/messages/create`,
                { new_comment },
                { withCredentials: true }
            );

            get_board_data();

            set_new_comment("");

            text.current!.value = "";
        } catch (err) {
            console.log(err);
        }
    };

    const handle_change = (e: ChangeEvent<HTMLTextAreaElement>): void => {
        const target: EventTarget & HTMLTextAreaElement = e.target;

        set_new_comment(target.value);
    };

    const delete_msg = async (
        e: MouseEvent<HTMLButtonElement>
    ): Promise<void> => {
        const target = e.target as HTMLButtonElement;

        const msg_id = target.nextSibling as HTMLInputElement;
        const id = msg_id.value;

        await axios.post(
            `http://localhost:3001/board/${name}/messages/${id}/delete`
        );
    };

    return (
        <main className="board">
            <h1 className="board_name">{`${board_data.name
                .slice(0, 1)
                .toUpperCase()}${board_data.name.slice(1)}`}</h1>

            {user && user.membership_status !== "guest" ? (
                <form className="new_post" onSubmit={handle_submit}>
                    <label htmlFor="comment">Make a new comment</label>
                    <textarea
                        name="comment"
                        id="comment"
                        rows={6}
                        onChange={handle_change}
                        ref={text}
                    ></textarea>

                    <button type="submit">OK</button>
                </form>
            ) : (
                <></>
            )}

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
                                            {render_author_name(msg)}
                                        </p>

                                        {user.membership_status !== "guest" ? (
                                            <div className="date_time">
                                                <p className="post_time">
                                                    {time}
                                                </p>

                                                <p className="post_date">
                                                    {date}
                                                </p>
                                            </div>
                                        ) : (
                                            <></>
                                        )}
                                    </>
                                ) : (
                                    <p className="post_author">Anonymous</p>
                                )}
                            </div>

                            <p className="post_content">{msg.content}</p>

                            {user && user.membership_status === "admin" ? (
                                <button
                                    className="delete_msg"
                                    onClick={delete_msg}
                                >
                                    Delete
                                </button>
                            ) : (
                                <></>
                            )}

                            <input
                                type="text"
                                disabled={true}
                                value={msg._id}
                                style={{ display: "none" }}
                            />
                        </div>
                    );
                })}
            </div>
        </main>
    );
};

export default Board;
