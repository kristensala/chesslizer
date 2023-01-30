export enum PointOfView {
    White,
    Black
}

export type Square = {
    name: String,
    class: String,
    x: number,
    y: number
};

export const WhitePOVSquares: Square[] = [
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
];

export const BlackPOVSquares: Square[] = [
    { name: "a1", class: "square-07", x: 0, y: 700 },
];
