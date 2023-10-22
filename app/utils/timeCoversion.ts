const convertToUTC = (date: string) => {
  const dateFormat = /^(0[1-9]|1[012])[/](0[1-9]|[12][0-9]|3[01])[/](\d{4})$/;

  if (!date.match(dateFormat)) {
    return date;
  }

  const [month, day, year] = date.split("/");

  if (!year || !month || !day) {
    return date;
  }

  const localDate = new Date(
    parseInt(year),
    parseInt(month) - 1,
    parseInt(day),
  );

  localDate.setHours(23, 59, 0, 0);

  return localDate.toISOString();
};


export {convertToUTC}
