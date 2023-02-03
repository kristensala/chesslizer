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
export function calculateValidPawnMove(piecesPool: HTMLDivElement, selectedPieceHtml: HTMLDivElement): string[] {
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

export function calculateValidRookMoves(piecesPool: HTMLDivElement, selectedPieceHtml: HTMLDivElement): string[] {
    const piecesPositionsOnBoard = getAllPiecesOnBoard(piecesPool);
    const currentPiece = getPiece(selectedPieceHtml, piecesPositionsOnBoard);

    if (currentPiece === undefined) return [];

    let fileMoves = calculateValidMovesAcrossFile(currentPiece, piecesPositionsOnBoard);
    let rowMoves = calculateValidMovesAcrossRow(currentPiece, piecesPositionsOnBoard);

    const result = fileMoves.concat(rowMoves);
    return result;
}

function calculateValidMovesAcrossFile(piece: Piece, board: Piece[]): string[] {
    let validMoves: string[] = [];

    const otherPiecesOnSameFile = board.filter((otherPiece) => otherPiece.x == piece.x && otherPiece.y != piece.y);
    const currentPieceX = piece.x;
    const currentPieceY = piece.y;

    let indexToNorth = currentPieceY - 100;
    for (indexToNorth; indexToNorth >= 0; indexToNorth -= 100) {
        const foundPiece = otherPiecesOnSameFile.find((piece) => piece.y == indexToNorth);
        const validSquare = getSquareBasedOnCoordinates(currentPieceX, indexToNorth);

        if (foundPiece) {
            if (canTake(piece, foundPiece)) {
                if (validSquare !== undefined) { 
                    validMoves.push(validSquare.class);
                }
            }
            break;
        }

        if (validSquare !== undefined) { 
            validMoves.push(validSquare.class);
        }
    }
    
    let indexToSouth = currentPieceY + 100;
    for (indexToSouth; indexToSouth <= 700; indexToSouth += 100) {
        const foundPiece = otherPiecesOnSameFile.find((piece) => piece.y == indexToSouth);
        const validSquare = getSquareBasedOnCoordinates(currentPieceX, indexToSouth);

        if (foundPiece) {
            if (canTake(piece, foundPiece)) {
                if (validSquare !== undefined) { 
                    validMoves.push(validSquare.class);
                }
            }
            break;
        }

        if (validSquare !== undefined) { 
            validMoves.push(validSquare.class);
        }
    }
    return validMoves;
}

function calculateValidMovesAcrossRow(piece: Piece, board: Piece[]): string[] {
    let validMoves: string[] = [];

    const otherPiecesOnSameRow = board.filter((otherPiece) => otherPiece.y == piece.y && otherPiece.x != piece.x);
    const currentPieceX = piece.x;
    const currentPieceY = piece.y;
    
    let indexToRight = currentPieceX + 100;
    for (indexToRight; indexToRight <= 700; indexToRight += 100) {
        const foundPiece = otherPiecesOnSameRow.find((piece) => piece.x == indexToRight);
        const validSquare = getSquareBasedOnCoordinates(indexToRight, currentPieceY);

        if (foundPiece) {
            if (canTake(piece, foundPiece)) {
                if (validSquare !== undefined) { 
                    validMoves.push(validSquare.class);
                }
            }
            break;
        }
        
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

export function calculateValidKnightMoves(piecesPoolHtml: HTMLDivElement, selectedPieceHtml: HTMLDivElement): string[] {
    // moves 8 is there a pattern??
    // y - 200 x - 100
    // y - 200 x + 100
    // y - 100 x + 200
    // y + 100 x + 200
    // y + 200 x + 100
    // y + 200 x - 100
    // y + 100 x - 200
    // y - 100 x - 200
    let validMoves: string[] = [];

    const piecesPositionsOnBoard: Piece[] = getAllPiecesOnBoard(piecesPoolHtml);
    const currentPiece = getPiece(selectedPieceHtml, piecesPositionsOnBoard);

    if (currentPiece == undefined) {
        return [];
    }

    const currentPieceX = currentPiece.x;
    const currentPieceY = currentPiece.y;

    const coords: Coordinate[] = [
        {x: -100, y: -200},
        {x: 100, y: -200},
        {x: 200, y: -100},
        {x: 200, y: 100},
        {x: 100, y: 200},
        {x: -100, y: 200},
        {x: -200, y: 100},
        {x: -200, y: -100},
    ]

    for (let i = 0; i < coords.length; ++i) {
        const coordinate = coords[i];
        const square = getSquareBasedOnCoordinates(currentPieceX + coordinate.x, currentPieceY + coordinate.y);

        if (square) {
            const pieceOnSquare = piecesPositionsOnBoard.find((checkPiece) => checkPiece.x == square.x && checkPiece.y == square.y);
            if (pieceOnSquare?.isWhite != currentPiece.isWhite) {
                validMoves.push(square.class);
            }
        }
    }

    return validMoves;
}

export function calculateValidBishopMoves(piecesPoolHtml: HTMLDivElement, selectedPieceHtml: HTMLDivElement): string[] {
    let validMoves: string[] = [];
   
    // moves til board end or detect piece 0 -> 700
    // x - 100 y - 100 x + 100 y + 100 \
    // x + 100 y - 100  x - 100 y + 100 /
    const piecesPositionsOnBoard: Piece[] = getAllPiecesOnBoard(piecesPoolHtml);
    const currentPiece = getPiece(selectedPieceHtml, piecesPositionsOnBoard);

    if (currentPiece == undefined) {
        return [];
    }

    // diagonal1 '\'
    validMoves.push(...calculateDiagonalOne(currentPiece, piecesPositionsOnBoard));

    // diagonal 2 '/'
    validMoves.push(...calculateDiagonalTwo(currentPiece, piecesPositionsOnBoard));

    return validMoves;
}

export function calculateValidQueenMoves(piecesPoolHtml: HTMLDivElement, selectedPieceHtml: HTMLDivElement): string[] {
    let validMoves: string[] = []

    const piecesPositionsOnBoard: Piece[] = getAllPiecesOnBoard(piecesPoolHtml);
    const currentPiece = getPiece(selectedPieceHtml, piecesPositionsOnBoard);

    if (currentPiece == undefined) {
        return [];
    }

    validMoves.push(...calculateValidMovesAcrossRow(currentPiece, piecesPositionsOnBoard));
    validMoves.push(...calculateValidMovesAcrossFile(currentPiece, piecesPositionsOnBoard));
    validMoves.push(...calculateDiagonalOne(currentPiece, piecesPositionsOnBoard));
    validMoves.push(...calculateDiagonalTwo(currentPiece, piecesPositionsOnBoard));

    return validMoves;
}

function calculateDiagonalOne(piece: Piece, piecesOnBoard: Piece[]): string[] {
    let validMoves: string[] = [];
    let y = piece.y + 100;
    let x = piece.x;
    for (y; y <= 700; y += 100) {
        x += 100;

        if (x <= 700) {
            const square = getSquareBasedOnCoordinates(x, y);
            if (square === undefined) return [];

            const pieceOnSquare = getPieceOnSquare(square, piecesOnBoard);
            if (pieceOnSquare) {
                if (pieceOnSquare.isWhite != piece.isWhite) {
                    validMoves.push(square.class);
                }
                break;
            }

            validMoves.push(square.class);
        }
    }

    y = piece.y - 100;
    x = piece.x;
    for (y; y >= 0; y -= 100) {
        x -= 100;

        if (x >= 0) {
            const square = getSquareBasedOnCoordinates(x, y);
            if (square === undefined) return [];

            const pieceOnSquare = getPieceOnSquare(square, piecesOnBoard);
            if (pieceOnSquare) {
                if (pieceOnSquare.isWhite != piece.isWhite) {
                    validMoves.push(square.class);
                }
                break;
            }
            validMoves.push(square.class);
        }
    }

    return validMoves;
}

function calculateDiagonalTwo(piece: Piece, piecesOnBoard: Piece[]): string[] {
    let validMoves: string[] = [];

    let y = piece.y + 100;
    let x = piece.x;
    for (y; y <= 700; y += 100) {
        x -= 100;

        if (x >= 0) {
            const square = getSquareBasedOnCoordinates(x, y);
            if (square === undefined) return [];

            const pieceOnSquare = getPieceOnSquare(square, piecesOnBoard);
            if (pieceOnSquare) {
                if (pieceOnSquare.isWhite != piece.isWhite) {
                    validMoves.push(square.class);
                }
                break;
            }
            validMoves.push(square.class);
        }
    }

    y = piece.y - 100;
    x = piece.x;
    for (y; y >= 0; y -= 100) {
        x += 100;

        if (x <= 700) {
            const square = getSquareBasedOnCoordinates(x, y);
            if (square === undefined) return [];

            const pieceOnSquare = getPieceOnSquare(square, piecesOnBoard);
            if (pieceOnSquare) {
                if (pieceOnSquare.isWhite != piece.isWhite) {
                    validMoves.push(square.class);
                }
                break;
            }
            validMoves.push(square.class);
        }
    }

    return validMoves;
}


function getPieceOnSquare(square: Square | undefined, piecesOnBoard: Piece[]): Piece | undefined {
    if (square) {
        const pieceOnSquare = piecesOnBoard.find((checkPiece) => checkPiece.x == square.x && checkPiece.y == square.y);
        return pieceOnSquare;
    }
}

function getPiece(pieceHtml: HTMLDivElement, piecesPositionsOnBoard: Piece[]): Piece | undefined {
    const pieceClass = pieceHtml.classList[2];
    return piecesPositionsOnBoard.find((piece) => piece.position == pieceClass);
}

function canTake(selectedPiece: Piece, toTakePiece: Piece): boolean {
    return isWhitePieceByName(selectedPiece.name) != isWhitePieceByName(toTakePiece.name);
}

function isWhitePieceByName(name: string): boolean {
    if (name.startsWith("b")) {
        return false;
    }

    return true;
}

function getAllPiecesOnBoard(piecesPool: HTMLDivElement): Piece[] {
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

