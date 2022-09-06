export const getDateTime = (date) => {
  date = new Date(date);
  const dateTime = new Date(date.getTime() - date.getTimezoneOffset()*60*1000);
  const hours = (dateTime.getHours()<10?'0':'') + dateTime.getHours() ;
  const minutes = (dateTime.getMinutes()<10?'0':'') + dateTime.getMinutes();
  return `${hours}:${minutes}`;
}

export const getDayMonth = (date) => {
  if (!date) return '';
  date = new Date(date);
  const dateTime = new Date(date.getTime() - date.getTimezoneOffset()*60*1000);
  return `${dateTime.getDate()}/${dateTime.getMonth() + 1}`;
}

export const addedETA = (date, eta) => {
  eta = parseFloat(eta);
  date = new Date(date);
  const hoursToAdd = Math.floor(eta) * 60 * 60 * 1000;
  const minutesToAdd = ((eta - hoursToAdd) * 60) * 60 * 1000;
  date.setTime((date.getTime() + hoursToAdd + minutesToAdd));
  return getDateTime(date);
}

export const getETA = (eta) => {
  eta = parseFloat(eta);
  const hours = Math.floor(eta);
  const minutes = Math.round((eta - hours) * 60);
  return `${hours}h ${minutes}m`;
}