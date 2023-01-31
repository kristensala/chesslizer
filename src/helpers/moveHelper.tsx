import { Square, WhitePOVSquares } from "./squareHelper";

export const getFen = (board: HTMLDivElement): string => {
    return "fen";
}

//TODO: have to take into account also the POV. 
// TODO: pawn en passant move
// All possible moves with different conditions
//   [x]
//[x][x][x]
//   [P]
export const calculateValidPawnMovement = (piecesPool: HTMLDivElement, selectedPiece: HTMLDivElement): string[] => {
    const piecesPositionsOnBoard = getAllPiecesPositionsOnBoard(piecesPool);
    const currentPieceSquare = getPiecePosition(selectedPiece); 

    let possibleValidMoves: string[] = [];
    if (currentPieceSquare !== undefined) {
        let newY;
        if (isWhitePiece(selectedPiece)) { // or POV is Black?????
            newY = currentPieceSquare.y - 100;
        } else {
            newY = currentPieceSquare.y + 100;
        }

        let newX = currentPieceSquare.x;
        const frontSquare = getSquareBasedOnCoordinates(newX, newY);

        newX = currentPieceSquare.x - 100;
        const takeLeftSquare = getSquareBasedOnCoordinates(newX, newY);

        newX = currentPieceSquare.x + 100;
        const takeRightSquare = getSquareBasedOnCoordinates(newX, newY);

        if (frontSquare !== undefined) {
            if (!piecesPositionsOnBoard.includes(frontSquare.class)) {
                possibleValidMoves.push(frontSquare.class);
            }
        }

        if (takeLeftSquare !== undefined) {
            if (piecesPositionsOnBoard.includes(takeLeftSquare.class)) {
                possibleValidMoves.push(takeLeftSquare.class);
            }
        }

        if (takeRightSquare !== undefined) {
            if (piecesPositionsOnBoard.includes(takeRightSquare.class)) {
                possibleValidMoves.push(takeRightSquare.class);
            }
        }
    }

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
