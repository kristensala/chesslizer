import { Component, createSignal } from "solid-js";
import { DOMElement } from "solid-js/jsx-runtime";
import "./board.css";
import { PointOfView, Square, WhitePOVSquares, BlackPOVSquares } from "./Square";

type Piece = {
    name: String,
    position: String
}

const Board: Component = () => {
    const [validSquares, setValidSquares] = createSignal([]);
    const [pointOfView, setPointOfView] = createSignal(PointOfView.White);
    const [squares, setSquares] = createSignal(WhitePOVSquares);

    const flipBoard = () => {
        if (pointOfView() === PointOfView.White) {
            setPointOfView(PointOfView.Black);
            setSquares(BlackPOVSquares);
            // todo: also move pieces
        }

        if (pointOfView() === PointOfView.Black) {
            setPointOfView(PointOfView.White);
            setSquares(WhitePOVSquares);
            // todo: also move pieces
        }
    }

    const movePiecesOnBoardFlip = (pov: PointOfView) => {

    }

    const getFen = (): string => {
        return "";
    };

    const onPieceSelect = (piece: MouseEvent): void => {
        const target = piece.target as HTMLElement;

        if (target !== null) {
            addValidToMoveSquares(target);
        }
    }

    const addValidToMoveSquares = (piece: HTMLElement) => {
        let pool = document.getElementById("active-square-pool");

        // todo loop to find all valid squares for each piece
        // currently test one pawn movement
        let activeSquare = createActiveSquare(pool, "square-75", piece);
        if (activeSquare == undefined) return;

        pool?.appendChild(activeSquare);
    }

    const clearActiveSquarePool = () => {
        let pool = document.getElementById("active-square-pool");
        let children = pool?.childNodes;
        if (children !== undefined) {
            for (let i = 0; i < children?.length; ++i) {
                pool?.removeChild(children[i]);
            }
        }
    }

    const createActiveSquare = (pool: HTMLElement | null, newPosition: string, piece: HTMLElement) => {
        let children = pool?.childNodes;
        if (children !== undefined) {
            for (let i = 0; i < children?.length; ++i) {
                let child = children[i] as DOMElement;
                if (child.id == newPosition) {
                    clearActiveSquarePool();
                    return;
                }
            }
        }

        clearActiveSquarePool();

        const activeSquare = document.createElement("div");
        activeSquare.setAttribute("id", newPosition);
        activeSquare.addEventListener("click", () => {

            const currentPos = getCurrentPiecePosition(piece);
            if (currentPos !== undefined) {
                piece.classList.replace(currentPos, newPosition);
            }

            clearActiveSquarePool();

        });
        activeSquare.className = newPosition;

        return activeSquare;
    }

    const getCurrentPiecePosition = (piece: HTMLElement) => {
        const classList = piece.classList;
        if (classList !== undefined) {
            return classList[2];
        }
    }

    const movePiece = (piece: HTMLElement, toSquare: Square): void => {
        // todo change class
    }

    return (
        <div id="board" class="board">
            <div id="br1" class="piece br square-00"></div> 
            <div id="br2" class="piece br square-70"></div> 
            <div id="bn1" class="piece bn square-10"></div> 
            <div id="bn2" class="piece bn square-60"></div> 
            <div id="bb1" class="piece bb square-20"></div> 
            <div id="bb2" class="piece bb square-50"></div> 
            <div id="bk" class="piece bk square-40"></div> 
            <div id="bq" class="piece bq square-30"></div> 
            <div id="bp1" class="piece bp square-01"></div> 
            <div id="bp2" class="piece bp square-11"></div> 
            <div id="bp3" class="piece bp square-21"></div> 
            <div id="bp4" class="piece bp square-31"></div> 
            <div id="bp5" class="piece bp square-41"></div> 
            <div id="bp6" class="piece bp square-51"></div> 
            <div id="bp7" class="piece bp square-61"></div> 
            <div id="bp8" class="piece bp square-71"></div> 

            <div id="wr1" class="piece wr square-07"></div> 
            <div id="wr2" class="piece wr square-77"></div> 
            <div id="wn1" class="piece wn square-17"></div> 
            <div id="wn2" class="piece wn square-67"></div> 
            <div id="wb1" class="piece wb square-27"></div> 
            <div id="wb2" class="piece wb square-57"></div> 
            <div id="wk" class="piece wk square-47"></div> 
            <div id="wq" class="piece wq square-37"></div> 
            <div id="wp1" class="piece wp square-06"></div> 
            <div id="wp2" class="piece wp square-16"></div> 
            <div id="wp3" class="piece wp square-26"></div> 
            <div id="wp4" class="piece wp square-36"></div> 
            <div id="wp5" class="piece wp square-46"></div> 
            <div id="wp6" class="piece wp square-56"></div> 
            <div id="wp7" class="piece wp square-66"></div> 
            <div id="wp8" class="piece wp square-76" onclick={(e) => onPieceSelect(e)}></div>
            
            <div id="active-square-pool" class="active-square-pool">
            </div>
        </div>
    );
}

export default Board;
