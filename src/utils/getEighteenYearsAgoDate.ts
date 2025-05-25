export function getEighteenYearsAgoDate() {
  const todayDate = new Date(); 

  const eighteenYearsAgo = new Date(todayDate);
  eighteenYearsAgo.setFullYear(todayDate.getFullYear() - 18);

  const year = eighteenYearsAgo.getFullYear();
  const month = String(eighteenYearsAgo.getMonth() + 1).padStart(2, '0');
  const day = String(eighteenYearsAgo.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}