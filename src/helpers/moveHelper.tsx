import { 
    Square,
    getSquareByClassName,
    getSquareBasedOnCoordinates
} from "./squareHelper";

type Coordinate = {
    x: number,
    y: number
}

type PieceInfo = {
    isWhite: boolean, // true
    name: string, //br
    type: PieceType,
    position: string, //square-72
    x: number, // 700
    y: number // 200
}

enum PieceType {
    None = "None",
    Pawn = "Pawn",
    Rook = "Rook",
    Knight = "Knight",
    Bishop = "Bishop",
    Queen = "Queen",
    King = "King"
}

// TODO: calculate king moves
export function calculateMoves(piecesPool: HTMLDivElement, selectedPieceHtml: HTMLDivElement) {
    let validMoves: string[] = [];

    const piecesPositionsOnBoard = getAllPiecesOnBoard(piecesPool);
    const currentPiece = getPiece(selectedPieceHtml, piecesPositionsOnBoard);

    if (currentPiece === undefined) return [];

    switch (currentPiece.type) {
        case PieceType.Pawn:
            validMoves = calculateValidPawnMove(piecesPositionsOnBoard, currentPiece);
            break;
        case PieceType.Rook:
            validMoves = calculateValidRookMoves(piecesPositionsOnBoard, currentPiece);
            break;
        case PieceType.Knight:
            validMoves = calculateValidKnightMoves(piecesPositionsOnBoard, currentPiece);
            break;
        case PieceType.Bishop:
            validMoves = calculateValidBishopMoves(piecesPositionsOnBoard, currentPiece);
            break;
        case PieceType.Queen:
            validMoves = calculateValidQueenMoves(piecesPositionsOnBoard, currentPiece);
            break;
        default:
            console.log("Could not calculate moves for the piece", currentPiece);
            break;
    }

    return validMoves;
}

// TODO: missing pawn en passant move
function calculateValidPawnMove(piecesPositionsOnBoard: PieceInfo[], currentPiece: PieceInfo): string[] {
    let possibleValidMoves: string[] = [];

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

        if (toTakePiece !== undefined && isOpponentsPiece(currentPiece, toTakePiece)) {
            possibleValidMoves.push(takeLeftSquare.class);
        }
    }

    if (takeRightSquare !== undefined) {
        const toTakePiece = piecesPositionsOnBoard.find((piece) => {
            if (piece.position == takeRightSquare.class) {
                return piece;
            }
        });

        if (toTakePiece !== undefined && isOpponentsPiece(currentPiece, toTakePiece)) {
            possibleValidMoves.push(takeRightSquare.class);
        }
    }

    console.log(possibleValidMoves);
    return possibleValidMoves;
}

function calculateValidRookMoves(piecesPositionsOnBoard: PieceInfo[], currentPiece: PieceInfo): string[] {
    let fileMoves = calculateValidMovesAcrossFile(currentPiece, piecesPositionsOnBoard);
    let rowMoves = calculateValidMovesAcrossRow(currentPiece, piecesPositionsOnBoard);

    const result = fileMoves.concat(rowMoves);
    return result;
}

function calculateValidMovesAcrossFile(piece: PieceInfo, board: PieceInfo[]): string[] {
    let validMoves: string[] = [];

    const otherPiecesOnSameFile = board.filter((otherPiece) => otherPiece.x == piece.x && otherPiece.y != piece.y);
    const currentPieceX = piece.x;
    const currentPieceY = piece.y;

    let indexToNorth = currentPieceY - 100;
    for (indexToNorth; indexToNorth >= 0; indexToNorth -= 100) {
        const foundPiece = otherPiecesOnSameFile.find((piece) => piece.y == indexToNorth);
        const validSquare = getSquareBasedOnCoordinates(currentPieceX, indexToNorth);

        if (foundPiece) {
            if (isOpponentsPiece(piece, foundPiece)) {
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
            if (isOpponentsPiece(piece, foundPiece)) {
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

function calculateValidMovesAcrossRow(piece: PieceInfo, board: PieceInfo[]): string[] {
    let validMoves: string[] = [];

    const otherPiecesOnSameRow = board.filter((otherPiece) => otherPiece.y == piece.y && otherPiece.x != piece.x);
    const currentPieceX = piece.x;
    const currentPieceY = piece.y;
    
    let indexToRight = currentPieceX + 100;
    for (indexToRight; indexToRight <= 700; indexToRight += 100) {
        const foundPiece = otherPiecesOnSameRow.find((piece) => piece.x == indexToRight);
        const validSquare = getSquareBasedOnCoordinates(indexToRight, currentPieceY);

        if (foundPiece) {
            if (isOpponentsPiece(piece, foundPiece)) {
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
            if (isOpponentsPiece(piece, foundPiece)) {
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

function calculateValidKnightMoves(piecesPositionsOnBoard: PieceInfo[], currentPiece: PieceInfo): string[] {
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

function calculateValidBishopMoves(piecesPositionsOnBoard: PieceInfo[], currentPiece: PieceInfo): string[] {
    let validMoves: string[] = [];
   
    // moves til board end or detect piece 0 -> 700
    // x - 100 y - 100 x + 100 y + 100 \
    // x + 100 y - 100  x - 100 y + 100 /

    // diagonal1 '\'
    validMoves.push(...calculateDiagonalOne(currentPiece, piecesPositionsOnBoard));

    // diagonal 2 '/'
    validMoves.push(...calculateDiagonalTwo(currentPiece, piecesPositionsOnBoard));

    return validMoves;
}

function calculateValidQueenMoves(piecesPositionsOnBoard: PieceInfo[], currentPiece: PieceInfo): string[] {
    let validMoves: string[] = []

    validMoves.push(...calculateValidMovesAcrossRow(currentPiece, piecesPositionsOnBoard));
    validMoves.push(...calculateValidMovesAcrossFile(currentPiece, piecesPositionsOnBoard));
    validMoves.push(...calculateDiagonalOne(currentPiece, piecesPositionsOnBoard));
    validMoves.push(...calculateDiagonalTwo(currentPiece, piecesPositionsOnBoard));

    return validMoves;
}

// TODO: same calculation as for queen but limit each direction to only one square
function calculateValidKingMoves() {

}

function calculateDiagonalOne(piece: PieceInfo, piecesOnBoard: PieceInfo[]): string[] {
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

function calculateDiagonalTwo(piece: PieceInfo, piecesOnBoard: PieceInfo[]): string[] {
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


function getPieceOnSquare(square: Square | undefined, piecesOnBoard: PieceInfo[]): PieceInfo | undefined {
    if (square) {
        const pieceOnSquare = piecesOnBoard.find((checkPiece) => checkPiece.x == square.x && checkPiece.y == square.y);
        return pieceOnSquare;
    }
}

function getPiece(pieceHtml: HTMLDivElement, piecesPositionsOnBoard: PieceInfo[]): PieceInfo | undefined {
    const pieceClass = pieceHtml.classList[2];
    return piecesPositionsOnBoard.find((piece) => piece.position == pieceClass);
}

function isOpponentsPiece(selectedPiece: PieceInfo, toTakePiece: PieceInfo): boolean {
    return selectedPiece.isWhite !== toTakePiece.isWhite;
}

function getAllPiecesOnBoard(piecesPool: HTMLDivElement): PieceInfo[] {
    let result: PieceInfo[] = []
    const pieces = piecesPool.childNodes;
    for (let i = 0; i < pieces.length; ++i) {
        const piece = pieces[i] as HTMLDivElement;
        const positionString = piece.classList[2];
        const square = getSquareByClassName(positionString);

        if (square === undefined) throw "No square found";
        
        const name = piece.classList[1];
        const newPiece: PieceInfo = {
            isWhite: name.startsWith("w"),
            name: name, //br
            type: getPieceTypeFromName(name),
            position: piece.classList[2],
            x: square.x,
            y: square.y
        };
        result.push(newPiece);
    }

    return result;
}

function getPieceTypeFromName(name: string): PieceType {
    if (name.includes("p")) return PieceType.Pawn;
    if (name.includes("r")) return PieceType.Rook;
    if (name.includes("n")) return PieceType.Knight;
    if (name.includes("b")) return PieceType.Bishop;
    if (name.includes("q")) return PieceType.Queen;
    if (name.includes("k")) return PieceType.King;

    return PieceType.None;
}

