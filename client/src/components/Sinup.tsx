import { FC, ReactElement } from "react";
import { Link } from "react-router-dom";

interface Props {}

const Signup: FC<Props> = (): ReactElement => {
    return (
        <main className="signin_form">
            <form method="post" action="http://localhost:3001/">
                <div className="field">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username"></input>
                </div>

                <div className="field">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                    ></input>
                </div>

                <div className="field">
                    <label htmlFor="confirm_password">Confirm Password</label>
                    <input
                        type="password"
                        id="confirm_password"
                        name="confirm_password"
                    ></input>
                </div>

                <button type="submit" onClick={(e) => e.preventDefault()}>
                    Sign up
                </button>

                <div className="already_signed">
                    Already signed? <Link to={"/signin"}>Log in</Link>
                </div>
            </form>
        </main>
    );
};

export default Signup;
