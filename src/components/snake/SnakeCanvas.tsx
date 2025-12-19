"use client";
import { getDirection, getNewSnakeDetails } from "@/src/logic/snakeLogic";
import { Direction, SnakeElement } from "@/src/types/snakeTypes";
import { SNAKE_FRAME_SPEED, SNAKE_PIXEL } from "@/src/utils/constants";
import { useCallback, useEffect, useRef, useState } from "react";

const SnakeCanvas = () => {
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const snakeRef = useRef<SnakeElement[]>([{ x: 0, y: 0 }]);
  const foodRef = useRef<SnakeElement | null>(null);
  const directionRef = useRef(Direction.RIGHT);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const draw = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Snake
    ctx.fillStyle = "lime";
    snakeRef.current.forEach((seg) => {
      ctx.fillRect(seg.x, seg.y, SNAKE_PIXEL, SNAKE_PIXEL);
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
    if (!canvas || !ctx) return;

    const { snakeBody, newFoodPosition, isCrashed, shouldIncreaseScore } =
      getNewSnakeDetails(
        snakeRef.current,
        directionRef.current,
        foodRef.current,
        canvas.width,
        canvas.height
      );

    if (isCrashed) {
      setIsGameOver(isCrashed);
    }

    if (shouldIncreaseScore) {
      setScore((prev) => prev + 1);
    }

    snakeRef.current = snakeBody;

    foodRef.current = newFoodPosition;

    draw(ctx, canvas);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      updateGame();
    }, SNAKE_FRAME_SPEED);

    return () => clearInterval(intervalId);
  }, [updateGame]);

  // Handle key press.
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const newDir = getDirection(e.key);
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
      <div className="text-sm md:text-base font-mono bg-black/60 px-4 py-2 rounded-lg border border-green-400 shadow-[0_0_10px_rgba(34,197,94,0.5)]">
        Score: <span className="text-green-300">{score}</span>
      </div>
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl flex justify-center">
        <canvas
          id="snake_canvas"
          width="300"
          height="300"
          className="bg-black border-4 border-green-400 rounded-lg shadow-[0_0_20px_rgba(34,197,94,0.6)]"
          ref={canvasRef}
        >
          Snake Game Screen.
        </canvas>
      </div>
    </div>
  );
};

export default SnakeCanvas;
