import { FC, ReactElement } from "react";

interface Props {
    window_matches: boolean;
}

const Navbar: FC<Props> = ({ window_matches }): ReactElement => {
    return (
        <nav>
            <div className="logo">Logo</div>

            {window_matches ? (
                <></>
            ) : (
                <div className="menu">
                    <span>|</span>
                    <span>|</span>
                    <span>|</span>
                </div>
            )}

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
