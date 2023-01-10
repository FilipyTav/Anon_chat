import { ChangeEvent, FC, FormEvent, ReactElement, useState } from "react";
import { Link } from "react-router-dom";

interface Props {}

type UserType = {
    username: string;
    password: string;
    confirm_password: string;
};

const Signup: FC<Props> = (): ReactElement => {
    const [new_user, set_new_user] = useState<UserType>({} as UserType);
    const [errors, set_errors] = useState<string[]>([]);

    // Gets data and adds to state
    const handle_change = (event: ChangeEvent<HTMLInputElement>): void => {
        const target: EventTarget & HTMLInputElement = event.target;
        const name: string = target.name;
        const value: string = target.value;

        set_new_user((prev_state) => {
            return { ...prev_state, [name]: value.trim() };
        });
    };

    const handle_submit = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        const err: string[] = [];

        const check_required = (obj: UserType): boolean => {
            for (const [key, value] of Object.entries(new_user)) {
                if (!value.trim()) err.push(`No ${key}`);

                set_new_user((prev_state) => {
                    return {
                        ...prev_state,
                        [key]: value.trim(),
                    };
                });
            }

            return !err.length;
        };

        const { username, password, confirm_password } = new_user;

        !check_required(new_user) ? set_errors(err) : set_errors([]);
    };

    return (
        <main className="signup_form">
            <form onSubmit={handle_submit}>
                <div className="field">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        required
                        onChange={handle_change}
                    ></input>
                </div>

                <div className="field">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        required
                        onChange={handle_change}
                    ></input>
                </div>

                <div className="field">
                    <label htmlFor="confirm_password">Confirm Password</label>
                    <input
                        type="password"
                        id="confirm_password"
                        name="confirm_password"
                        required
                        onChange={handle_change}
                    ></input>
                </div>

                <button type="submit">Sign up</button>

                <div className="already_signed">
                    Already signed? <Link to={"/signin"}>Log in</Link>
                </div>
            </form>

            <section className="errors">
                {errors.map((err: string) => {
                    return (
                        <p key={err} className="error">
                            {err}
                        </p>
                    );
                })}
            </section>
        </main>
    );
};

export default Signup;
