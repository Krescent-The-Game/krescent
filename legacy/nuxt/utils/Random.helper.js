export function random(numbers) {
  return numbers[Math.floor(Math.random() * numbers.length)];
}

export function randomWithin(max, min) {
  return Math.random() * (max - min) + min;
}
