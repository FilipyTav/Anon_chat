import { FC, ReactElement } from "react";

import { BoardType } from "../helpers/types";

interface Props {
    boards: BoardType[];
}

const Boards: FC<Props> = ({ boards }): ReactElement => {
    return (
        <main className="boards">
            {boards.map((board: BoardType) => {
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
