import { FC, ReactElement } from "react";

import "./styles/App.scss";

import Boards from "./components/Boards_menu";
import Navbar from "./components/Navbar";

interface Props {}

const current_board = null;

const App: FC<Props> = (): ReactElement => {
    return (
        <>
            <Navbar />

            {current_board ? <>Nope</> : <Boards />}
        </>
    );
};

export default App;
