import { Square, WhitePOVSquares } from "./squareHelper";


type Piece = {
    name: string,
    position: string
}

export const getFen = (board: HTMLDivElement): string => {
    return "fen";
}

//TODO: have to take into account also the POV. 
// TODO: pawn en passant move
// All possible moves with different conditions
//   [x]
//[x][x][x]
//   [P]
export const calculateValidPawnMove = (piecesPool: HTMLDivElement, selectedPieceHtml: HTMLDivElement): string[] => {
    const piecesPositionsOnBoard = getAllPiecesOnBoard(piecesPool);
    const currentPieceSquare = getPiecePosition(selectedPieceHtml); 

    let possibleValidMoves: string[] = [];
    if (currentPieceSquare !== undefined) {
        let newY;
        if (isWhitePiece(selectedPieceHtml)) { // or POV is Black?????
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
            if (!piecesPositionsOnBoard.find((piece) => piece.position == frontSquare.class)) {
                possibleValidMoves.push(frontSquare.class);
            }
        }

        const selectedPiece = piecesPositionsOnBoard.find((piece) => {
            if (piece.position == currentPieceSquare.class) {
                return piece;
            }
        });

        if (selectedPiece === undefined) return [];        

        if (takeLeftSquare !== undefined) {
            const toTakePiece = piecesPositionsOnBoard.find((piece) => {
                if (piece.position == takeLeftSquare.class) {
                    return piece;
                }
            });

            if (toTakePiece !== undefined && canTake(selectedPiece, toTakePiece)) {
                possibleValidMoves.push(takeLeftSquare.class);
            }
        }

        if (takeRightSquare !== undefined) {
            const toTakePiece = piecesPositionsOnBoard.find((piece) => {
                if (piece.position == takeRightSquare.class) {
                    return piece;
                }
            });

            if (toTakePiece !== undefined && canTake(selectedPiece, toTakePiece)) {
                possibleValidMoves.push(takeRightSquare.class);
            }
        }
    }

    console.log(possibleValidMoves);
    return possibleValidMoves;
}

const canTake = (selectedPiece: Piece, toTakePiece: Piece): boolean => {
    return isWhitePieceByName(selectedPiece.name) != isWhitePieceByName(toTakePiece.name);
}

const isWhitePieceByName = (name: string): boolean => {
    if (name.startsWith("b")) {
        return false;
    }

    return true;
}

const isWhitePiece = (piece: HTMLDivElement): boolean => {
    const name = piece.classList[1];

    if (name.startsWith("b")) {
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

const getAllPiecesOnBoard = (piecesPool: HTMLDivElement): Piece[] => {
    let result: Piece[] = []
    const pieces = piecesPool.childNodes;
    for (let i = 0; i < pieces.length; ++i) {
        const piece = pieces[i] as HTMLDivElement;
        const newPiece: Piece = {
            name: piece.classList[1],
            position: piece.classList[2]
        };
        result.push(newPiece);
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
