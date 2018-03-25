function toPrintedDate(date) {
  var date = new Date(date);
  return date.toLocaleTimeString(undefined, {hour: '2-digit', minute: '2-digit'})
}

function timeToDate(date) {
  const [hour, minute] = date.split(':');
  var today = new Date();
  today.setHours(hour, minute);
  return today;
}

export {
  toPrintedDate,
  timeToDate
}
