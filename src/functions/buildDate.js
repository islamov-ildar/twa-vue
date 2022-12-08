export function buildDate(dateString) {
  const date = new Date(dateString);
  let orderYear = date.getFullYear();
  let orderMonth = date.getMonth() + 1;
  let orderdDate = date.getDate();
  let orderDateString = `${orderdDate}.${orderMonth}.${orderYear}`;

  return orderDateString;
}
