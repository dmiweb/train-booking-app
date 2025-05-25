export const timestampToDate = (timestamp: number, format: 'dd.mm.yyyy' | 'yyyy-mm-dd' = 'dd.mm.yyyy'): string => {
  const date = new Date(timestamp * 1000);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  if (format === 'yyyy-mm-dd') {
    return `${year}-${month}-${day}`;
  } else {
    return `${day}.${month}.${year}`;
  }
};