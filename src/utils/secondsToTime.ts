export const secondsToTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const remainingSeconds = seconds % 3600;
  const minutes = Math.floor(remainingSeconds / 60);

  return `${hours}:${String(minutes).padStart(2, '0')}`;
}