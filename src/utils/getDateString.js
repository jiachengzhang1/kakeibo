export function getDateString(date) {
  const dateObject = new Date(date);
  const month = dateObject.getUTCMonth() + 1;
  const day = dateObject.getUTCDate();
  const weekDay = dateObject.getUTCDay();
  const year = dateObject.getUTCFullYear();

  const monthMap = {
    1: "Jan",
    2: "Feb",
    3: "Mar",
    4: "Apr",
    5: "May",
    6: "June",
    7: "July",
    8: "Aug",
    9: "Sept",
    10: "Oct",
    11: "Nov",
    12: "Dec",
  };

  let dayString = "";
  switch (day) {
    case day % 10 === 1:
      dayString = day + "st";
      break;
    case day % 10 === 2:
      dayString = day + "nd";
      break;
    case day % 10 === 3:
      dayString = day + "rd";
      break;
    default:
      dayString = day + "th";
  }

  return `${monthMap[month]} ${dayString}, ${year}`;
}
