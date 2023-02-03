import { Component } from "solid-js";
import "../css/board.css";
import { calculateMoves } from "../helpers/moveHelper";

const Board: Component = () => {
    // TODO: remove activity from other pieces not just the target
    const onPieceSelect = (piece: MouseEvent): void => {
        const piecesPool = document.getElementById("pieces-pool") as HTMLDivElement;
        const pieces = piecesPool.childNodes;
        const target = piece.target as HTMLDivElement;
    
        if (target.classList.contains("active")) {
            target.classList.remove("active");
            clearActiveSquarePool();
            return;
        }

        for (let i = 0; i < pieces.length; ++i) {
            const piece = pieces[i] as HTMLDivElement;
            const classList = piece.classList;
            if (classList.contains("active")) {
                piece.classList.remove("active");
            }
        }

        target.classList.add("active");
        if (target !== null) {
            addValidToMoveSquares(target);
        }
    }

    const addValidToMoveSquares = (piece: HTMLDivElement) => {
        let piecesPool = document.getElementById("pieces-pool") as HTMLDivElement;
        let activeSquarePool = document.getElementById("active-square-pool");

        let validSquares: string[] = calculateMoves(piecesPool, piece);

        createActiveSquares(activeSquarePool, validSquares, piece);
    }

    const createActiveSquares = (pool: HTMLElement | null, newPositions: string[], piece: HTMLElement) => {
        clearActiveSquarePool();

        for (let i = 0; i < newPositions.length; ++i) {
            const activeSquare = document.createElement("div");
            activeSquare.setAttribute("id", newPositions[i]);
            activeSquare.addEventListener("click", () => {
                movePiece(piece, newPositions[i]);
            });

            activeSquare.className = newPositions[i];
            pool?.appendChild(activeSquare);
        }
    }

    const getCurrentPiecePosition = (piece: HTMLElement) => {
        const classList = piece.classList;
        if (classList !== undefined) {
            return classList[2];
        }
    }

    const movePiece = (piece: HTMLElement, newPosition: string): void => {
        const piecesPool = document.getElementById("pieces-pool") as HTMLDivElement;
        const currentPos = getCurrentPiecePosition(piece);

        if (currentPos !== undefined) {
            takePiece(piecesPool, newPosition);

            piece.classList.replace(currentPos, newPosition);
            piece.classList.remove("active");
        }

        clearActiveSquarePool();
    }

    const takePiece = (piecesPool: HTMLDivElement, newPosition: string) => {
        let allPieces = piecesPool.childNodes;
        
        for (let i = 0; i < allPieces.length; ++i) {
            const pieceOnTheBoard = allPieces[i] as HTMLDivElement;
            const piecePosition = pieceOnTheBoard.classList[2];

            if (piecePosition == newPosition) {
                piecesPool.removeChild(pieceOnTheBoard);
                break;
            }
        }
    }

    const clearActiveSquarePool = () => {
        const pool = document.getElementById("active-square-pool");
        const children = pool?.childNodes;

        if (children !== undefined) {
            while (children.length > 0) {
                const lastElement = pool?.lastChild;
                if (lastElement !== null && lastElement !== undefined) {
                    pool?.removeChild(lastElement);
                    console.log("remove active pool element");
                }
            }
        }
    }

    return (
        <div id="board" class="board">
            <div id="pieces-pool">
                <div id="br1" class="piece br square-00" onclick={(e) => onPieceSelect(e)}></div> 
                <div id="br2" class="piece br square-70" onclick={(e) => onPieceSelect(e)}></div> 
                <div id="bn1" class="piece bn square-10" onclick={(e) => onPieceSelect(e)}></div> 
                <div id="bn2" class="piece bn square-60" onclick={(e) => onPieceSelect(e)}></div> 
                <div id="bb1" class="piece bb square-20" onclick={(e) => onPieceSelect(e)}></div> 
                <div id="bb2" class="piece bb square-50" onclick={(e) => onPieceSelect(e)}></div> 
                <div id="bk" class="piece bk square-40"></div> 
                <div id="bq" class="piece bq square-30" onclick={(e) => onPieceSelect(e)}></div> 
                <div id="bp1" class="piece bp square-01" onclick={(e) => onPieceSelect(e)}></div> 
                <div id="bp2" class="piece bp square-11" onclick={(e) => onPieceSelect(e)}></div> 
                <div id="bp3" class="piece bp square-21" onclick={(e) => onPieceSelect(e)}></div> 
                <div id="bp4" class="piece bp square-31" onclick={(e) => onPieceSelect(e)}></div> 
                <div id="bp5" class="piece bp square-41" onclick={(e) => onPieceSelect(e)}></div> 
                <div id="bp6" class="piece bp square-51" onclick={(e) => onPieceSelect(e)}></div> 
                <div id="bp7" class="piece bp square-61" onclick={(e) => onPieceSelect(e)}></div> 
                <div id="bp8" class="piece bp square-71" onclick={(e) => onPieceSelect(e)}></div> 

                <div id="wr1" class="piece wr square-07" onclick={(e) => onPieceSelect(e)}></div> 
                <div id="wr2" class="piece wr square-77" onclick={(e) => onPieceSelect(e)}></div> 
                <div id="wn1" class="piece wn square-17" onclick={(e) => onPieceSelect(e)}></div> 
                <div id="wn2" class="piece wn square-67" onclick={(e) => onPieceSelect(e)}></div> 
                <div id="wb1" class="piece wb square-27" onclick={(e) => onPieceSelect(e)}></div> 
                <div id="wb2" class="piece wb square-57" onclick={(e) => onPieceSelect(e)}></div> 
                <div id="wk" class="piece wk square-47"></div> 
                <div id="wq" class="piece wq square-37" onclick={(e) => onPieceSelect(e)}></div> 
                <div id="wp1" class="piece wp square-06" onclick={(e) => onPieceSelect(e)}></div> 
                <div id="wp2" class="piece wp square-16" onclick={(e) => onPieceSelect(e)}></div> 
                <div id="wp3" class="piece wp square-26" onclick={(e) => onPieceSelect(e)}></div> 
                <div id="wp4" class="piece wp square-36" onclick={(e) => onPieceSelect(e)}></div> 
                <div id="wp5" class="piece wp square-46" onclick={(e) => onPieceSelect(e)}></div> 
                <div id="wp6" class="piece wp square-56" onclick={(e) => onPieceSelect(e)}></div> 
                <div id="wp7" class="piece wp square-66" onclick={(e) => onPieceSelect(e)}></div> 
                <div id="wp8" class="piece wp square-76" onclick={(e) => onPieceSelect(e)}></div>
            </div>
            
            <div id="active-square-pool" class="active-square-pool"></div>
            <div id="removed-piece-pool" class="removed-piece-pool"></div>
        </div>
    );
}

export default Board;
