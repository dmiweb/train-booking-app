export function getRandomNumber(min: number, max: number): undefined | number {
  if (min === undefined || max === undefined || typeof min !== 'number' || typeof max !== 'number' || min > max) {
    return;
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
}