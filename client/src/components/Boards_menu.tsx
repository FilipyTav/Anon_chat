import { FC, ReactElement } from "react";

import { Board } from "../helpers/types";

interface Props {}

// All the main boards
// will change later to get from database
const boards: Board[] = [
    {
        name: "general",
        messages: [],
    },
];

const Boards: FC<Props> = (): ReactElement => {
    return (
        <main>
            {boards.map((board: Board) => {
                return (
                    <div className="board" key={board.name}>
                        {board.name}
                    </div>
                );
            })}
        </main>
    );
};

export default Boards;
