import { FC, ReactElement, useState } from "react";
import { Link } from "react-router-dom";

interface Props {}

const Navbar: FC<Props> = (): ReactElement => {
    const [active, set_active] = useState<boolean>(false);

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
                <li>
                    <Link to={"/signin"}>Sign in</Link>
                </li>

                <li>
                    <Link to={"/signup"}>Sign Up</Link>
                </li>

                <li>
                    <Link to={"/membership"}>Membership</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
