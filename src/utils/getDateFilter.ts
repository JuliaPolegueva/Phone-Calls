export const getTimeFromFullDate = (date: Date) => {
  const time = String(date).split(' ')[1].split(':');
  return time[0] + ':' + time[1];
};

export const getCallTime = (sec: number) => {
  const minutes = Math.floor(sec / 60);
  const seconds = Math.round(sec % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

export const getDayDate = (date: number) => {
  const startDate = new Date(date - 2 * 24 * 60 * 60 * 1000);
  const endDate = new Date(date);

  return {
    start: startDate.toISOString().split('T')[0],
    end: endDate.toISOString().split('T')[0],
  };
};

export const getWeekDate = (date: number) => {
  const oneDayMs = 24 * 60 * 60 * 1000;
  let day = new Date(date).getDay();

  const startDate = new Date(date - (day - 1) * oneDayMs);
  const endDate = new Date(date + (7 - day) * oneDayMs);

  return {
    start: startDate.toISOString().split('T')[0],
    end: endDate.toISOString().split('T')[0],
  };
};

export const getMonthDate = (date: number) => {
  const month = new Date(date).getMonth() + 1;
  const year = new Date(date).getFullYear();
  const endDay = new Date(year, month, 0).getDate();

  return {
    start: `${year}-${month}-01`,
    end: `${year}-${month}-${endDay}`,
  };
};

export const getYearDate = (date: number) => {
  const year = new Date(date).getFullYear();
  const endDay = new Date(year, 12, 0).getDate();

  return {
    start: `${year}-01-01`,
    end: `${year}-12-${endDay}`,
  };
};

export const getFormatDate = (date: number) => {
  const newDate = new Date(date);
  return newDate.toISOString().split('T')[0];
};

export const getFirstDayMonth = (date: number) => {
  const month = new Date(date).getMonth() + 1;
  const year = new Date(date).getFullYear();

  return `${year}-${month}-01`;
};

export const getLastDayMonth = (date: number) => {
  const month = new Date(date).getMonth() + 1;
  const year = new Date(date).getFullYear();
  const endDay = new Date(year, month, 0).getDate();

  return `${year}-${month}-${endDay}`;
};

export const getFormatUserDate = (date: string) => {
  const parts = date.split('.');
  const year = parts[2];
  const month = parts[1];
  const day = parts[0];
  return `20${year}-${month}-${day}`;
};
