const months = [
  "يناير",
  "فبراير",
  "مارس",
  "أبريل",
  "مايو",
  "يونيو",
  "يوليو",
  "أغسطس",
  "سبتمبر",
  "أكتوبر",
  "نوفمبر",
  "ديسمبر",
];
// console.log(number.toLocaleString("ar-EG"));
export default function formatDate(date) {
const day=new Date(date).getUTCDate().toLocaleString("ar-EG")
const month=months[new Date(date).getUTCMonth()]
const year=new Date(date).getUTCFullYear().toLocaleString("ar-EG").replace('٬','')

return day+' '+month+' '+year
}
