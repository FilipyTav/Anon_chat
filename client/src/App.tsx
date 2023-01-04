import { FC, ReactElement } from "react";
import Navbar from "./components/Navbar";
import "./styles/App.scss";

interface Props {}

const App: FC<Props> = (): ReactElement => {
    return (
        <>
            <Navbar />
        </>
    );
};

export default App;
