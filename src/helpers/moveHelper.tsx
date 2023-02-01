import { 
    Square,
    WhitePOVSquares,
    getSquareByClassName,
    getSquareBasedOnCoordinates
} from "./squareHelper";

type Coordinate = {
    x: number,
    y: number
}

type Piece = {
    isWhite: boolean, // true
    name: string, //br
    position: string, //square-72
    x: number, // 700
    y: number // 200
}

// TODO: pawn en passant move
// All possible moves with different conditions
//   [x]
//[x][x][x]
//   [P]
export const calculateValidPawnMove = (piecesPool: HTMLDivElement, selectedPieceHtml: HTMLDivElement): string[] => {
    const piecesPositionsOnBoard = getAllPiecesOnBoard(piecesPool);
    const currentPiece = getPiece(selectedPieceHtml, piecesPositionsOnBoard);

    let possibleValidMoves: string[] = [];
    if (currentPiece !== undefined) {
        let newY;
        if (currentPiece?.isWhite) {
            newY = currentPiece.y - 100;
        } else {
            newY = currentPiece.y + 100;
        }

        let newX = currentPiece.x;
        const frontSquare = getSquareBasedOnCoordinates(newX, newY);

        newX = currentPiece.x - 100;
        const takeLeftSquare = getSquareBasedOnCoordinates(newX, newY);

        newX = currentPiece.x + 100;
        const takeRightSquare = getSquareBasedOnCoordinates(newX, newY);

        if (frontSquare !== undefined) {
            if (!piecesPositionsOnBoard.find((piece) => piece.position == frontSquare.class)) {
                possibleValidMoves.push(frontSquare.class);
            }
        }

        if (takeLeftSquare !== undefined) {
            const toTakePiece = piecesPositionsOnBoard.find((piece) => {
                if (piece.position == takeLeftSquare.class) {
                    return piece;
                }
            });

            if (toTakePiece !== undefined && canTake(currentPiece, toTakePiece)) {
                possibleValidMoves.push(takeLeftSquare.class);
            }
        }

        if (takeRightSquare !== undefined) {
            const toTakePiece = piecesPositionsOnBoard.find((piece) => {
                if (piece.position == takeRightSquare.class) {
                    return piece;
                }
            });

            if (toTakePiece !== undefined && canTake(currentPiece, toTakePiece)) {
                possibleValidMoves.push(takeRightSquare.class);
            }
        }
    }

    console.log(possibleValidMoves);
    return possibleValidMoves;
}

export const calculateValidRookMoves = (piecesPool: HTMLDivElement, selectedPieceHtml: HTMLDivElement): string[] => {
    const piecesPositionsOnBoard = getAllPiecesOnBoard(piecesPool);
    const currentPiece = getPiece(selectedPieceHtml, piecesPositionsOnBoard);

    if (currentPiece === undefined) return [];

    let movesOnFile: Coordinate[] = [];
    let movesOnRow: Coordinate[] = [];

    for (let i = 0; i <= 700; i += 100) {
        if (i == currentPiece.y) continue;

        const coord: Coordinate = {
            x: currentPiece.x,
            y: i
        }
        movesOnFile.push(coord);
    }

    for (let i = 0; i <= 700; i += 100) {
        if (i == currentPiece.x) continue;

        const coord: Coordinate = {
            x: i,
            y: currentPiece.y
        }
        movesOnRow.push(coord);
    }

    console.log("fileMoves:", movesOnFile);
    console.log("board", piecesPositionsOnBoard);
    let fileMoves = getValidRookMovesOnFile(currentPiece, piecesPositionsOnBoard);
    let rowMoves = getValidRookMovesOnRow(currentPiece, piecesPositionsOnBoard);

    const result = fileMoves.concat(rowMoves);
    return result;
}

const getValidRookMovesOnFile = (piece: Piece, board: Piece[]): string[] => {
    let validMoves: string[] = [];

    const otherPiecesOnSameFile = board.filter((otherPiece) => otherPiece.x == piece.x && otherPiece.y != piece.y);
    const currentPieceX = piece.x;
    const currentPieceY = piece.y;

    let indexToNorth = currentPieceY - 100;
    for (indexToNorth; indexToNorth >= 0; indexToNorth -= 100) {
        const foundPiece = otherPiecesOnSameFile.find((piece) => piece.y == indexToNorth);
        if (foundPiece) {
            if (canTake(piece, foundPiece)) {
                const validSquare = getSquareBasedOnCoordinates(currentPieceX, indexToNorth);
                if (validSquare !== undefined) { 
                    validMoves.push(validSquare.class);
                }
            }
            break;
        }

        const validSquare = getSquareBasedOnCoordinates(currentPieceX, indexToNorth);
        if (validSquare !== undefined) { 
            validMoves.push(validSquare.class);
        }
    }
    
    let indexToSouth = currentPieceY + 100;
    for (indexToSouth; indexToSouth <= 700; indexToSouth += 100) {
        const foundPiece = otherPiecesOnSameFile.find((piece) => piece.y == indexToSouth);
        if (foundPiece) {
            if (canTake(piece, foundPiece)) {
                const validSquare = getSquareBasedOnCoordinates(currentPieceX, indexToNorth);
                if (validSquare !== undefined) { 
                    validMoves.push(validSquare.class);
                }
            }
            break;
        }

        const validSquare = getSquareBasedOnCoordinates(currentPieceX, indexToSouth);
        if (validSquare !== undefined) { 
            validMoves.push(validSquare.class);
        }
    }
    return validMoves;
}

const getValidRookMovesOnRow = (piece: Piece, board: Piece[]): string[] => {
    let validMoves: string[] = [];

    const otherPiecesOnSameRow = board.filter((otherPiece) => otherPiece.y == piece.y && otherPiece.x != piece.x);
    const currentPieceX = piece.x;
    const currentPieceY = piece.y;
    
    let indexToRight = currentPieceX + 100;
    for (indexToRight; indexToRight <= 700; indexToRight += 100) {
        const foundPiece = otherPiecesOnSameRow.find((piece) => piece.x == indexToRight);
        if (foundPiece) {
            if (canTake(piece, foundPiece)) {
                const validSquare = getSquareBasedOnCoordinates(indexToRight, currentPieceY);
                if (validSquare !== undefined) { 
                    validMoves.push(validSquare.class);
                }
            }
            break;
        }
        
        const validSquare = getSquareBasedOnCoordinates(indexToRight, currentPieceY);
        if (validSquare !== undefined) {
            validMoves.push(validSquare?.class);
        }
    }

    let indexToLeft = currentPieceX - 100;
    for (indexToLeft; indexToLeft >= 0; indexToLeft -= 100) {
        const foundPiece = otherPiecesOnSameRow.find((piece) => piece.x == indexToLeft);
        if (foundPiece) {
            if (canTake(piece, foundPiece)) {
                const validSquare = getSquareBasedOnCoordinates(indexToLeft, currentPieceY);
                if (validSquare !== undefined) {
                    validMoves.push(validSquare?.class);
                }
            }
            break;
        }
        
        const validSquare = getSquareBasedOnCoordinates(indexToLeft, currentPieceY);
        if (validSquare !== undefined) {
            validMoves.push(validSquare?.class);
        }
    }

    return validMoves;
}


// TODO: this is really broken
const getRookMoves = (currentPiece: Piece, possibleMoves: Coordinate[], piecesPositionsOnBoard: Piece[]) => {
    let rowMoves = [];
    for (let i = 0; i < possibleMoves.length; ++i) {
        const coord: Coordinate = possibleMoves[i];
        const square = WhitePOVSquares.find((square) => square.x == coord.x && square.y == coord.y);

        if (square !== undefined) {
            const [hasPieceOnSquare, pieceOnSquare] = squareHasPiece(square, piecesPositionsOnBoard);
            if (pieceOnSquare === undefined) {
                rowMoves.push(square.class);
                continue;
            }

            if (hasPieceOnSquare) {
                if (canTake(currentPiece, pieceOnSquare)) {
                    rowMoves.push(square.class);
                    break;
                }
                continue;

            }

            rowMoves.push(square.class);
        }
    }

    return rowMoves;
}


const getPiece = (pieceHtml: HTMLDivElement, piecesPositionsOnBoard: Piece[]): Piece | undefined => {
    const pieceClass = pieceHtml.classList[2];
    return piecesPositionsOnBoard.find((piece) => piece.position == pieceClass);
}

const squareHasPiece = (square: Square, board: Piece[]): [boolean, Piece | undefined] => {
    const pieceOnSquare = board.find((piece) => piece.position == square.class);
    if (pieceOnSquare !== undefined) {
        return [true, pieceOnSquare];
    }
    return [false, undefined];
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

const getAllPiecesOnBoard = (piecesPool: HTMLDivElement): Piece[] => {
    let result: Piece[] = []
    const pieces = piecesPool.childNodes;
    for (let i = 0; i < pieces.length; ++i) {
        const piece = pieces[i] as HTMLDivElement;
        const positionString = piece.classList[2];
        const square = getSquareByClassName(positionString);

        if (square === undefined) throw "No square found";

        const newPiece: Piece = {
            isWhite: piece.classList[1].startsWith("w"),
            name: piece.classList[1], //br
            position: piece.classList[2],
            x: square.x,
            y: square.y
        };
        result.push(newPiece);
    }

    return result;
}

