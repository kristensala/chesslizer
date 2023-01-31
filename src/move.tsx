import { Square, WhitePOVSquares } from "./Square";

export const getFen = (board: HTMLDivElement): string => {
    return "fen";
}

//TODO: have to take into account also the POV. 
// All possible moves with different conditions
//   [x]
//[x][x][x]
//   [P]
export const calculateValidPawnMovement = (piecesPool: HTMLDivElement, selectedPiece: HTMLDivElement): string[] => {
    const piecesPositionsOnBoard = getAllPiecesPositionsOnBoard(piecesPool);
    const currentPieceSquare = getPiecePosition(selectedPiece); 

    let possibleValidMoves: string[] = [];
    if (currentPieceSquare !== undefined) {
        if (isWhitePiece(selectedPiece)) { // or POV is Black?????
            let newY = currentPieceSquare.y - 100; // check for board boundary and if pawn makes the first move
            let newX = currentPieceSquare.x;
            
            const square = getSquareBasedOnCoordinates(newX, newY);
            if (square !== undefined) {
                possibleValidMoves.push(square.class);
            }
        }
    }

    //TODO: check moves agains pieces position on the board to see if i can actually make them
    // if moves contains a square from piecesPositionsOnBoard then remove from the moves array
    console.log(possibleValidMoves);
    return possibleValidMoves;
}

export const calculateValidRookMovement = (board: HTMLDivElement, piece: HTMLDivElement) => {

}

const isWhitePiece = (piece: HTMLDivElement): boolean => {
    const color = piece.classList[1];

    if (color.startsWith("b")) {
        return false;
    }

    return true;
}

const getPiecePosition = (piece: HTMLDivElement): Square | undefined => {
    const piecePosition = piece.classList[2];
    
    let currentSquare = WhitePOVSquares.find((square) => {
        if (square.class == piecePosition) {
            return square;
        }
    });
    // TODO: if i get undefined I should throw. I sould always get a square otherwise something is really wrong
    return currentSquare;
}

const getAllPiecesPositionsOnBoard = (piecesPool: HTMLDivElement): string[] => {
    let result: string[] = []
    const pieces = piecesPool.childNodes;
    for (let i = 0; i < pieces.length; ++i) {
        const piece = pieces[i] as HTMLDivElement;
        const pos = piece.classList[2];
        result.push(pos);
    }

    return result;
}


const getSquareBasedOnCoordinates = (x: number, y: number): Square | undefined => {
    let newSquare = WhitePOVSquares.find((square) => {
        if (square.x == x && square.y == y) {
            return square;
        }
    });
    return newSquare
}
