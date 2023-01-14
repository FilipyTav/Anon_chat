import axios from "axios";
import { ChangeEvent, FC, ReactElement, useState } from "react";
import { UserType } from "../helpers/types";

interface Props {
    user: UserType | null;
    get_user: () => void;
}

const Membership: FC<Props> = ({ user, get_user }): ReactElement => {
    const [secret, set_secret] = useState<string>("");

    const handle_change = (e: ChangeEvent<HTMLInputElement>): void => {
        const target: EventTarget & HTMLInputElement = e.target;

        set_secret(target.value);
    };

    const handle_submit = async (): Promise<void> => {
        try {
            const result = await axios.post(
                "http://localhost:3001/user/change_membership",
                { secret },
                { withCredentials: true }
            );

            get_user();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <main className="membership">
            {user ? (
                <>
                    <p className="anouncing">Membership status:</p>

                    <div className="status">
                        {`${user.membership_status
                            .slice(0, 1)
                            .toUpperCase()}${user.membership_status.slice(1)}`}
                    </div>

                    <label htmlFor="secret" className="change">
                        To change your status, type the secret code:
                    </label>

                    <div className="input_n_button">
                        <input
                            type="text"
                            id="secret"
                            onChange={handle_change}
                        />

                        <button className="send_secret" onClick={handle_submit}>
                            OK
                        </button>
                    </div>
                </>
            ) : (
                "Must be logged to see"
            )}
        </main>
    );
};

export default Membership;
