import moment from 'moment';

export const daysDiff = (startDate, endDate) => {
  const a = moment(startDate);
  const b = moment(endDate);

  return b.diff(a, 'days');
};
