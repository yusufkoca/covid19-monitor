export default function formatNumber(number: number = 0) {
  return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}
