"use client";
import { getDirection, getNewSnakeDetails } from "@/src/logic/snakeLogic";
import { Direction, SnakeElement } from "@/src/types/snakeTypes";
import { SNAKE_FRAME_SPEED, SNAKE_PIXEL } from "@/src/utils/constants";
import { useCallback, useEffect, useRef, useState } from "react";

const SnakeCanvas = () => {
  const [score, setScore] = useState(0);
  const isPaused = useRef<boolean>(true);
  const isGameOver = useRef<boolean>(false);
  const snakeRef = useRef<SnakeElement[]>([{ x: 0, y: 0 }]);
  const foodRef = useRef<SnakeElement | null>(null);
  const directionRef = useRef(Direction.RIGHT);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const draw = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    if (isPaused.current) {
      ctx.fillStyle = "#3b82f6";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      ctx.font = `${Math.floor(canvas.width * 0.08)}px monospace`;
      ctx.fillText("PAUSED", canvas.width / 2, canvas.height / 2 - 20);

      ctx.font = `${Math.floor(canvas.width * 0.045)}px monospace`;
      ctx.fillText(
        "Press Space or P",
        canvas.width / 2,
        canvas.height / 2 + 20
      );

      return;
    }

    if (isGameOver.current) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#ef4444";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      ctx.font = `${Math.floor(canvas.width * 0.12)}px monospace`;
      ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2 - 30);

      ctx.fillStyle = "#e5e7eb";
      ctx.font = `${Math.floor(canvas.width * 0.045)}px monospace`;
      ctx.fillText(
        "Press R or Reload to restart",
        canvas.width / 2,
        canvas.height / 2 + 20
      );

      return;
    }

    // Snake
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // ctx.fillStyle = "lime";
    snakeRef.current.forEach((seg, index) => {
      const isHead = index === snakeRef.current.length - 1;

      ctx.fillStyle = "#22c55e";
      ctx.fillRect(seg.x, seg.y, SNAKE_PIXEL, SNAKE_PIXEL);

      if (isHead) {
        ctx.fillStyle = "black";

        ctx.fillRect(seg.x + 2, seg.y + 2, 2, 2);
        ctx.fillRect(seg.x + 6, seg.y + 2, 2, 2);
      }
    });

    // Food
    if (foodRef.current) {
      ctx.fillStyle = "red";
      ctx.fillRect(
        foodRef.current.x,
        foodRef.current.y,
        SNAKE_PIXEL,
        SNAKE_PIXEL
      );
    }
  };

  // Handle snake movement and food position.
  const updateGame = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) {
      return;
    }

    if (isPaused.current) {
      draw(ctx, canvas);
      return;
    }

    if (isGameOver.current) {
      directionRef.current = Direction.RIGHT;
      draw(ctx, canvas);
      return;
    }

    const { snakeBody, newFoodPosition, isCrashed, shouldIncreaseScore } =
      getNewSnakeDetails(
        snakeRef.current,
        directionRef.current,
        foodRef.current,
        canvas.width,
        canvas.height
      );

    if (isCrashed) {
      isGameOver.current = isCrashed;
    }

    if (shouldIncreaseScore) {
      setScore((prev) => prev + 1);
    }

    snakeRef.current = snakeBody;

    foodRef.current = newFoodPosition;

    draw(ctx, canvas);
  }, []);

  const handleButtonClick = (key: string) => {
    const newDir = getDirection(directionRef.current, key);
    if (newDir) {
      directionRef.current = newDir;
    }
  };

  const onPause = () => {
    isPaused.current = !isGameOver.current
      ? !isPaused.current
      : isPaused.current;
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      updateGame();
    }, SNAKE_FRAME_SPEED);

    return () => clearInterval(intervalId);
  }, [updateGame]);

  // Handle key press.
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isGameOver.current && (e?.key === "p" || e.key === " ")) {
        isPaused.current = !isPaused.current;
      } else if (e.key === "r") {
        isGameOver.current = false;
        setScore(0);
      }
      const newDir = getDirection(directionRef.current, e.key);
      if (newDir) {
        directionRef.current = newDir;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div>
      <div className="text-sm md:text-base font-mono bg-black/60 px-4 py-2 md:rounded-lg md:border border-green-400 shadow-[0_0_10px_rgba(34,197,94,0.5)]">
        Score: <span className="text-green-300">{score}</span>
      </div>
      <div className="md:bg-white/5 md:backdrop-blur-lg md:border md:border-white/10 md:rounded-2xl p-8 md:p-12 shadow-2xl flex flex-col md:flex-row justify-center">
        <canvas
          id="snake_canvas"
          width="250"
          height="250"
          className="bg-black border-4 border-green-400 rounded-lg shadow-[0_0_20px_rgba(34,197,94,0.6)]"
          ref={canvasRef}
        >
          Snake Game Screen.
        </canvas>
        <div className="md:hidden">
          <div className="mt-6 flex flex-col items-center gap-4">
            <div className="grid grid-cols-3 grid-rows-3 gap-3">
              <button
                className="
                  col-start-2 row-start-1
                  w-14 h-14 rounded-lg
                  bg-black/80 border border-green-400
                  text-green-400 text-xl
                  shadow-[0_0_10px_rgba(34,197,94,0.5)]
                  active:scale-95 transition
                "
                onClick={() => handleButtonClick("ArrowUp")}
              >
                ▲
              </button>

              <button
                className="
                  col-start-1 row-start-2
                  w-14 h-14 rounded-lg
                  bg-black/80 border border-green-400
                  text-green-400 text-xl
                  shadow-[0_0_10px_rgba(34,197,94,0.5)]
                  active:scale-95 transition
                "
                onClick={() => handleButtonClick("ArrowLeft")}
              >
                ◀
              </button>

              <button
                className="
                  col-start-2 row-start-2
                  w-14 h-14 rounded-lg
                  bg-black/60 border border-green-400
                  shadow-inner text-green-400 font-mono
                "
                onClick={onPause}
              >
                P
              </button>

              {/* RIGHT */}
              <button
                className="
                  col-start-3 row-start-2
                  w-14 h-14 rounded-lg
                  bg-black/80 border border-green-400
                  text-green-400 text-xl
                  shadow-[0_0_10px_rgba(34,197,94,0.5)]
                  active:scale-95 transition
                "
                onClick={() => handleButtonClick("ArrowRight")}
              >
                ▶
              </button>

              {/* DOWN */}
              <button
                className="
                  col-start-2 row-start-3
                  w-14 h-14 rounded-lg
                  bg-black/80 border border-green-400
                  text-green-400 text-xl
                  shadow-[0_0_10px_rgba(34,197,94,0.5)]
                  active:scale-95 transition
                "
                onClick={() => handleButtonClick("ArrowDown")}
              >
                ▼
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SnakeCanvas;
