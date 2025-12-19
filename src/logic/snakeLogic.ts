import { Direction, SnakeElement } from "../types/snakeTypes";
import { SNAKE_PIXEL } from "../utils/constants";

export const getNewSnakeDetails = (
  snakeBody: SnakeElement[],
  direction: Direction,
  currentFoodPosition: SnakeElement | null,
  canvasWidth: number,
  canvasHeight: number
) => {
  const head = snakeBody[snakeBody.length - 1];
  let newFoodPosition: SnakeElement | null = currentFoodPosition;

  const hasEaten =
    currentFoodPosition &&
    head.x === currentFoodPosition.x &&
    head.y === currentFoodPosition.y;

  const isCrashedOnWall =
    head.x < 0 || head.x > canvasWidth || head.y < 0 || head.y > canvasHeight;

  const isCrashedOnBody = snakeBody.some(
    (seg) => seg.x === head.x && seg.y === head.y
  );

  if (!hasEaten) {
    snakeBody.shift();
  }
  switch (direction) {
    case "UP":
      snakeBody.push({ x: head?.x, y: head.y - SNAKE_PIXEL });
      break;
    case "DOWN":
      snakeBody.push({ x: head?.x, y: head.y + SNAKE_PIXEL });
      break;
    case "LEFT":
      snakeBody.push({ x: head?.x - SNAKE_PIXEL, y: head.y });
      break;
    case "RIGHT":
      snakeBody.push({ x: head?.x + SNAKE_PIXEL, y: head.y });
      break;
    default:
      break;
  }

  if (hasEaten || !currentFoodPosition) {
    newFoodPosition = getNewFoodPosition(snakeBody, canvasWidth, canvasHeight);
  }

  return {
    snakeBody,
    newFoodPosition,
    isCrashed: isCrashedOnWall || isCrashedOnBody,
    shouldIncreaseScore: hasEaten,
  };
};

export const getNewFoodPosition = (
  snakeBody: SnakeElement[],
  canvasWidth: number,
  canvasHeight: number
): SnakeElement => {
  const maxX = canvasWidth / SNAKE_PIXEL;
  const maxY = canvasHeight / SNAKE_PIXEL;

  let newFood: SnakeElement;

  do {
    newFood = {
      x: Math.floor(Math.random() * maxX) * SNAKE_PIXEL,
      y: Math.floor(Math.random() * maxY) * SNAKE_PIXEL,
    };
  } while (snakeBody.some((seg) => seg.x === newFood.x && seg.y === newFood.y));

  return newFood;
};

export const getDirection = (key: KeyboardEvent["key"]) => {
  let direction: Direction = Direction.RIGHT;
  switch (key) {
    case "ArrowDown":
      direction = Direction.DOWN;
      break;
    case "ArrowLeft":
      direction = Direction.LEFT;
      break;
    case "ArrowRight":
      direction = Direction.RIGHT;
      break;
    case "ArrowUp":
      direction = Direction.UP;
      break;
    case "w":
      direction = Direction.UP;
      break;
    case "a":
      direction = Direction.LEFT;
      break;
    case "d":
      direction = Direction.RIGHT;
      break;
    case "s":
      direction = Direction.DOWN;
      break;
    default:
      break;
  }
  return direction;
};
