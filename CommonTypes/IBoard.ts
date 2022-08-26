export interface IBoard {
    id: number;
    name: string;
}

export interface IBoardToCreate extends Omit<IBoard, 'id'> {}
