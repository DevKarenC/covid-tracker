// eslint-disable-next-line import/prefer-default-export
export const convertDate = (chartDate) => {
  const stringChartDate = `${chartDate}`;
  const year = stringChartDate.substring(0, 4);
  const month = stringChartDate.substring(4, 6) - 1;
  const day = stringChartDate.substring(6, 8);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(year, month, day).toLocaleDateString('en-us', options);
};
