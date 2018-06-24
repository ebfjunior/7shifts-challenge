const getFormattedDate = (strDate) => {
  const date = new Date(strDate);
  const day = parseInt(date.getDate(), 10);
  const month = parseInt(date.getMonth() + 1, 10);
  const year = date.getFullYear();

  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;


  return `${year}-${formattedMonth}-${formattedDay}`;
};

const dateDiff = (initialStrDate, finalStrDate) => {
  const initialDate = new Date(initialStrDate);
  const finalDate = new Date(finalStrDate);

  return parseInt((finalDate - initialDate) / 60 / 60 / 1000, 10);
};

module.exports = {
  getFormattedDate,
  dateDiff,
};
