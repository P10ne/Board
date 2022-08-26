export interface IBoard {
    id: number;
    name: string;
}

export function isBoard(board: IBoard | IDraftBoard): board is IBoard {
    return 'id' in board;
}

export function isDraftBoard(board: IBoard | IDraftBoard): board is IDraftBoard {
    return !('id' in board);
}

export interface IDraftBoard extends Omit<IBoard, 'id'> {}
