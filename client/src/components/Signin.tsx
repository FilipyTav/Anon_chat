import axios from "axios";
import { ChangeEvent, FC, FormEvent, ReactElement, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface Props {}

type UserType = {
    username: string;
    password: string;
};

const Signin: FC<Props> = (): ReactElement => {
    const [user, set_user] = useState<UserType>({} as UserType);
    const [errors, set_errors] = useState<string[]>([]);

    const navigate = useNavigate();

    // Gets data and adds to state
    const handle_change = (event: ChangeEvent<HTMLInputElement>): void => {
        const target: EventTarget & HTMLInputElement = event.target;
        const name: string = target.name;
        const value: string = target.value;

        set_user((prev_state) => {
            return { ...prev_state, [name]: value.trim() };
        });
    };

    const handle_submit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const err: string[] = [];

        const check_required = (obj: UserType): boolean => {
            for (const [key, value] of Object.entries(obj)) {
                if (!value.trim()) err.push(`No ${key}`);

                set_user((prev_state) => {
                    return {
                        ...prev_state,
                        [key]: value.trim(),
                    };
                });
            }

            return !err.length;
        };

        const validate_data = (obj: UserType): boolean => {
            const { username, password } = obj;

            if (!check_required(obj)) return false;

            return true;
        };

        const is_data_ok = validate_data(user);

        !is_data_ok ? set_errors(err) : set_errors([]);

        try {
            if (!err.length) {
                const result = await axios.post(
                    `http://localhost:3001/users/login`,
                    user
                );

                navigate("/boards");
            }
        } catch (error: any) {
            const { data } = error.response;

            set_errors(data.errors);
        }
    };

    return (
        <main className="signin_form">
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

                <button type="submit">Sign in</button>

                <div className="already_signed">
                    No account yet? <Link to={"/signup"}>Sign up</Link>
                </div>
            </form>

            <section className="errors">
                {errors.map((err: string, index: number) => {
                    return (
                        <p key={`${err}${index}`} className="error">
                            {err}
                        </p>
                    );
                })}
            </section>
        </main>
    );
};

export default Signin;
