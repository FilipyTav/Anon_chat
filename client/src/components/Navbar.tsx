import { FC, ReactElement } from "react";

interface Props {}

const Navbar: FC<Props> = (): ReactElement => {
    return (
        <nav>
            <div className="logo">Logo</div>

            <ul className="links">
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
