export const formatDateYYYYMMDD = (currentDate: Date) => {
  const currentDateString = [
    currentDate.getFullYear(),
    ('0' + (currentDate.getMonth() + 1)).slice(-2),
    ('0' + currentDate.getDate()).slice(-2),
  ].join('-');
  return currentDateString;
};

export const formatDate = (currentDate: Date) => {
  const currentDateString = [
    ('0' + currentDate.getDate()).slice(-2),
    ('0' + (currentDate.getMonth() + 1)).slice(-2),
    currentDate.getFullYear(),
  ].join('-');
  return currentDateString;
};
