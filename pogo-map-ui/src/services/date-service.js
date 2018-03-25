function toPrintedDate(date) {
  var date = new Date(date);
  return date.getHours() + ':' + date.getMinutes();
}

function toDate(date) {
  const [hour, minute] = date.split(':');
  var today = new Date();
  today.setHours(hour, minute);
  return today;
}

export {
  toPrintedDate,
  toDate
}
