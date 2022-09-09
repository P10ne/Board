export interface IBoard {
    id: number;
    name: string;
}

export function isBoard(board: TPartialBoard): board is IBoard {
    return 'id' in board;
}

export type TPartialBoard = Partial<IBoard>;
