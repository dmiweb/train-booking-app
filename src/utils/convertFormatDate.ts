export const convertFormatDate = (date: string): string => {
  const splitDate = date.split("-");
  const convertDate = splitDate.reverse().join(".")
  return convertDate;
}