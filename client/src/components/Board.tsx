import { FC, ReactElement } from "react";

import { BoardType } from "../helpers/types";

interface Props {
    data: BoardType;
}

const Board: FC<Props> = ({ data }): ReactElement => {
    return (
        <main>
            <div>{data.name}</div>
            single board
        </main>
    );
};

export default Board;
