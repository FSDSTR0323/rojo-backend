const formatDate = (dateString, includeHours = true) => {
  const date = new Date(dateString);

  const day = date.getUTCDate().toString().padStart(2, '0');
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
  const year = date.getUTCFullYear();

  const hours = date.getUTCHours().toString().padStart(2, '0');
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');

  let formattedDate = `${day}/${month}/${year}`;
  if (includeHours) formattedDate += ` ${hours}:${minutes}`;

  return formattedDate;
};

const generateDateRangeArray = (start, end) => {
  const startDate = new Date(start);
  const endDate = new Date(end);

  const dateRangeArray = [];
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    dateRangeArray.push(formatDate(currentDate, false));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dateRangeArray;
};

module.exports = { formatDate, generateDateRangeArray };
