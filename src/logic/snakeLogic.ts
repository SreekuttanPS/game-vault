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

  const isCrashedOnBody = snakeBody.some(
    (seg, index, snakeArray) =>
      seg.x === head.x && seg.y === head.y && index !== snakeArray.length - 1
  );

  const isCrashedOnTopWall = head.y <= 0;
  const isCrashedOnBottomWall = head.y >= canvasHeight - SNAKE_PIXEL;
  const isCrashedOnLeftWall = head.x <= 0;
  const isCrashedOnRightWall = head.x >= canvasWidth - SNAKE_PIXEL;

  if (!hasEaten) {
    snakeBody.shift();
  }
  switch (direction) {
    case "UP":
      if (isCrashedOnTopWall) {
        snakeBody.push({ x: head?.x, y: canvasHeight - SNAKE_PIXEL });
      } else {
        snakeBody.push({ x: head?.x, y: head.y - SNAKE_PIXEL });
      }
      break;
    case "DOWN":
      if (isCrashedOnBottomWall) {
        console.log("hit bottom");
        snakeBody.push({ x: head?.x, y: 0 });
      } else {
        snakeBody.push({ x: head?.x, y: head.y + SNAKE_PIXEL });
      }
      break;
    case "LEFT":
      if (isCrashedOnLeftWall) {
        snakeBody.push({ x: canvasWidth - SNAKE_PIXEL, y: head.y });
      } else {
        snakeBody.push({ x: head?.x - SNAKE_PIXEL, y: head.y });
      }
      break;
    case "RIGHT":
      if (isCrashedOnRightWall) {
        console.log("hit on right");
        snakeBody.push({ x: 0, y: head.y });
      } else {
        snakeBody.push({ x: head?.x + SNAKE_PIXEL, y: head.y });
      }
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
    isCrashed: isCrashedOnBody,
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

export const getDirection = (
  currentDirection: Direction,
  key: KeyboardEvent["key"]
) => {
  let direction: Direction = currentDirection;
  switch (key) {
    case "ArrowDown":
      if (currentDirection === Direction.UP) {
        direction = currentDirection;
      } else {
        direction = Direction.DOWN;
      }
      break;
    case "ArrowLeft":
      if (currentDirection === Direction.RIGHT) {
        direction = currentDirection;
      } else {
        direction = Direction.LEFT;
      }
      break;
    case "ArrowRight":
      if (currentDirection === Direction.LEFT) {
        direction = currentDirection;
      } else {
        direction = Direction.RIGHT;
      }
      break;
    case "ArrowUp":
      if (currentDirection === Direction.DOWN) {
        direction = currentDirection;
      } else {
        direction = Direction.UP;
      }
      break;
    case "w":
      if (currentDirection === Direction.DOWN) {
        direction = currentDirection;
      } else {
        direction = Direction.UP;
      }
      break;
    case "a":
      if (currentDirection === Direction.RIGHT) {
        direction = currentDirection;
      } else {
        direction = Direction.LEFT;
      }
      break;
    case "d":
      if (currentDirection === Direction.LEFT) {
        direction = currentDirection;
      } else {
        direction = Direction.RIGHT;
      }
      break;
    case "s":
      if (currentDirection === Direction.UP) {
        direction = currentDirection;
      } else {
        direction = Direction.DOWN;
      }
      break;
    default:
      break;
  }
  return direction;
};
