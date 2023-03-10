export enum Turn {
    White,
    Black
}

export type Square = {
    name: string,
    class: string,
    x: number,
    y: number
};

export function getSquareByClassName(className: string): Square | undefined {
    return WhitePOVSquares.find((square) => square.class == className);
}

export function getSquareBasedOnCoordinates(x: number, y: number): Square | undefined {
    let newSquare = WhitePOVSquares.find((square) => {
        if (square.x == x && square.y == y) {
            return square;
        }
    });
    return newSquare
}

const WhitePOVSquares: Square[] = [
    { name: "a1", class: "square-07", x: 0, y: 700 },
    { name: "b1", class: "square-17", x: 100, y: 700 },
    { name: "c1", class: "square-27", x: 200, y: 700 },
    { name: "d1", class: "square-37", x: 300, y: 700 },
    { name: "e1", class: "square-47", x: 400, y: 700 },
    { name: "f1", class: "square-57", x: 500, y: 700 },
    { name: "g1", class: "square-67", x: 600, y: 700 },
    { name: "h1", class: "square-77", x: 700, y: 700 },

    { name: "a2", class: "square-06", x: 0, y: 600 },
    { name: "b2", class: "square-16", x: 100, y: 600 },
    { name: "c2", class: "square-26", x: 200, y: 600 },
    { name: "d2", class: "square-36", x: 300, y: 600 },
    { name: "e2", class: "square-46", x: 400, y: 600 },
    { name: "f2", class: "square-56", x: 500, y: 600 },
    { name: "g2", class: "square-66", x: 600, y: 600 },
    { name: "h2", class: "square-76", x: 700, y: 600 },

    { name: "a3", class: "square-05", x: 0, y: 500 },
    { name: "b3", class: "square-15", x: 100, y: 500 },
    { name: "c3", class: "square-25", x: 200, y: 500 },
    { name: "d3", class: "square-35", x: 300, y: 500 },
    { name: "e3", class: "square-45", x: 400, y: 500 },
    { name: "f3", class: "square-55", x: 500, y: 500 },
    { name: "g3", class: "square-65", x: 600, y: 500 },
    { name: "h3", class: "square-75", x: 700, y: 500 },

    { name: "a4", class: "square-04", x: 0, y: 400 },
    { name: "b4", class: "square-14", x: 100, y: 400 },
    { name: "c4", class: "square-24", x: 200, y: 400 },
    { name: "d4", class: "square-34", x: 300, y: 400 },
    { name: "e4", class: "square-44", x: 400, y: 400 },
    { name: "f4", class: "square-54", x: 500, y: 400 },
    { name: "g4", class: "square-64", x: 600, y: 400 },
    { name: "h4", class: "square-74", x: 700, y: 400 },

    { name: "a5", class: "square-03", x: 0, y: 300 },
    { name: "b5", class: "square-13", x: 100, y: 300 },
    { name: "c5", class: "square-23", x: 200, y: 300 },
    { name: "d5", class: "square-33", x: 300, y: 300 },
    { name: "e5", class: "square-43", x: 400, y: 300 },
    { name: "f5", class: "square-53", x: 500, y: 300 },
    { name: "g5", class: "square-63", x: 600, y: 300 },
    { name: "h5", class: "square-73", x: 700, y: 300 },

    { name: "a6", class: "square-02", x: 0, y: 200 },
    { name: "b6", class: "square-12", x: 100, y: 200 },
    { name: "c6", class: "square-22", x: 200, y: 200 },
    { name: "d6", class: "square-32", x: 300, y: 200 },
    { name: "e6", class: "square-42", x: 400, y: 200 },
    { name: "f6", class: "square-52", x: 500, y: 200 },
    { name: "g6", class: "square-62", x: 600, y: 200 },
    { name: "h6", class: "square-72", x: 700, y: 200 },

    { name: "a7", class: "square-01", x: 0, y: 100 },
    { name: "b7", class: "square-11", x: 100, y: 100 },
    { name: "c7", class: "square-21", x: 200, y: 100 },
    { name: "d7", class: "square-31", x: 300, y: 100 },
    { name: "e7", class: "square-41", x: 400, y: 100 },
    { name: "f7", class: "square-51", x: 500, y: 100 },
    { name: "g7", class: "square-61", x: 600, y: 100 },
    { name: "h7", class: "square-71", x: 700, y: 100 },

    { name: "a8", class: "square-00", x: 0, y: 0 },
    { name: "b8", class: "square-10", x: 100, y: 0 },
    { name: "c8", class: "square-20", x: 200, y: 0 },
    { name: "d8", class: "square-30", x: 300, y: 0 },
    { name: "e8", class: "square-40", x: 400, y: 0 },
    { name: "f8", class: "square-50", x: 500, y: 0 },
    { name: "g8", class: "square-60", x: 600, y: 0 },
    { name: "h8", class: "square-70", x: 700, y: 0 },
];

// TODO: this is wrong currently
export const BlackPOVSquares: Square[] = [
    { name: "a1", class: "square-07", x: 0, y: 700 },
    { name: "b1", class: "square-17", x: 100, y: 700 },
    { name: "c1", class: "square-27", x: 200, y: 700 },
    { name: "d1", class: "square-37", x: 300, y: 700 },
    { name: "e1", class: "square-47", x: 400, y: 700 },
    { name: "f1", class: "square-57", x: 500, y: 700 },
    { name: "g1", class: "square-67", x: 600, y: 700 },
    { name: "h1", class: "square-77", x: 700, y: 700 },

    { name: "a2", class: "square-06", x: 0, y: 600 },
    { name: "b2", class: "square-16", x: 100, y: 600 },
    { name: "c2", class: "square-26", x: 200, y: 600 },
    { name: "d2", class: "square-36", x: 300, y: 600 },
    { name: "e2", class: "square-46", x: 400, y: 600 },
    { name: "f2", class: "square-56", x: 500, y: 600 },
    { name: "g2", class: "square-66", x: 600, y: 600 },
    { name: "h2", class: "square-76", x: 700, y: 600 },

    { name: "a3", class: "square-05", x: 0, y: 500 },
    { name: "b3", class: "square-15", x: 100, y: 500 },
    { name: "c3", class: "square-25", x: 200, y: 500 },
    { name: "d3", class: "square-35", x: 300, y: 500 },
    { name: "e3", class: "square-45", x: 400, y: 500 },
    { name: "f3", class: "square-55", x: 500, y: 500 },
    { name: "g3", class: "square-65", x: 600, y: 500 },
    { name: "h3", class: "square-75", x: 700, y: 500 },

    { name: "a4", class: "square-04", x: 0, y: 400 },
    { name: "b4", class: "square-14", x: 100, y: 400 },
    { name: "c4", class: "square-24", x: 200, y: 400 },
    { name: "d4", class: "square-34", x: 300, y: 400 },
    { name: "e4", class: "square-44", x: 400, y: 400 },
    { name: "f4", class: "square-54", x: 500, y: 400 },
    { name: "g4", class: "square-64", x: 600, y: 400 },
    { name: "h4", class: "square-74", x: 700, y: 400 },

    { name: "a5", class: "square-03", x: 0, y: 300 },
    { name: "b5", class: "square-13", x: 100, y: 300 },
    { name: "c5", class: "square-23", x: 200, y: 300 },
    { name: "d5", class: "square-33", x: 300, y: 300 },
    { name: "e5", class: "square-43", x: 400, y: 300 },
    { name: "f5", class: "square-53", x: 500, y: 300 },
    { name: "g5", class: "square-63", x: 600, y: 300 },
    { name: "h5", class: "square-73", x: 700, y: 300 },

    { name: "a6", class: "square-02", x: 0, y: 200 },
    { name: "b6", class: "square-12", x: 100, y: 200 },
    { name: "c6", class: "square-22", x: 200, y: 200 },
    { name: "d6", class: "square-32", x: 300, y: 200 },
    { name: "e6", class: "square-42", x: 400, y: 200 },
    { name: "f6", class: "square-52", x: 500, y: 200 },
    { name: "g6", class: "square-62", x: 600, y: 200 },
    { name: "h6", class: "square-72", x: 700, y: 200 },

    { name: "a7", class: "square-01", x: 0, y: 100 },
    { name: "b7", class: "square-11", x: 100, y: 100 },
    { name: "c7", class: "square-21", x: 200, y: 100 },
    { name: "d7", class: "square-31", x: 300, y: 100 },
    { name: "e7", class: "square-41", x: 400, y: 100 },
    { name: "f7", class: "square-51", x: 500, y: 100 },
    { name: "g7", class: "square-61", x: 600, y: 100 },
    { name: "h7", class: "square-71", x: 700, y: 100 },

    { name: "a8", class: "square-00", x: 0, y: 0 },
    { name: "b8", class: "square-10", x: 100, y: 0 },
    { name: "c8", class: "square-20", x: 200, y: 0 },
    { name: "d8", class: "square-30", x: 300, y: 0 },
    { name: "e8", class: "square-40", x: 400, y: 0 },
    { name: "f8", class: "square-50", x: 500, y: 0 },
    { name: "g8", class: "square-60", x: 600, y: 0 },
    { name: "h8", class: "square-70", x: 700, y: 0 },
];

