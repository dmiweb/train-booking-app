export function calcSeatsCount(number: number , flag: string): number | undefined {
  const evenCount = Math.floor(number / 2);

  if (flag === 'top') {
    return evenCount;
  } else if (flag === 'bottom') {
    return number - evenCount;
  } 
    
  return undefined;
}