import axios from "axios";
import { FC, ReactElement, useState } from "react";
import { Link } from "react-router-dom";
import { UserType } from "../helpers/types";

interface Props {
    user: UserType | null;
    get_user: () => void;
}

const Navbar: FC<Props> = ({ user, get_user }): ReactElement => {
    const [active, set_active] = useState<boolean>(false);

    const logout = async (): Promise<void> => {
        try {
            const result = await axios.get(
                "http://localhost:3001/users/logout",
                {
                    withCredentials: true,
                }
            );

            get_user();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <nav>
            <Link to="/boards" className="logo_icon">
                Logo
            </Link>

            <div
                className={`menu ${active ? "active" : ""}`}
                onClick={() => set_active((prev_state) => !prev_state)}
            >
                <span>|</span>
                <span>|</span>
                <span>|</span>
                <span>|</span>
            </div>

            <ul className={`links ${active ? "active" : ""}`}>
                {user ? (
                    <>
                        <li>
                            <Link to={"/"} onClick={logout}>
                                Log out
                            </Link>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to={"/signin"}>Sign in</Link>
                        </li>

                        <li>
                            <Link to={"/signup"}>Sign Up</Link>
                        </li>
                    </>
                )}

                <li>
                    <Link to={"/membership"}>Membership</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
