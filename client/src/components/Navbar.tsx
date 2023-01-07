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
                    <a href="#">Sign in</a>
                </li>

                <li>
                    <a href="#">Sign up</a>
                </li>

                <li>
                    <a href="#">Membership</a>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
