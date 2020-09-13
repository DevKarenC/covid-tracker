// eslint-disable-next-line import/prefer-default-export
export const convertLineDate = (chartDate) => {
  const stringChartDate = `${chartDate}`;
  const year = stringChartDate.substring(0, 4);
  const month = stringChartDate.substring(4, 6) - 1;
  const options = { year: 'numeric', month: 'short' };
  return new Date(year, month).toLocaleDateString('en-us', options);
};
