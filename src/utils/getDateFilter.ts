export const getTimeFromFullDate = (date: Date) => {
  const time = String(date).split(' ')[1].split(':');
  return time[0] + ':' + time[1];
};

export const getCallTime = (sec: number) => {
  if (sec === 0) return `0:00`;

  const min = Math.floor(sec / 60);
  const secs = sec % 60;
  return `${min}:${addNull(String(secs))}`;
};

export const addNull = (str: string) => {
  if (str.length < 2) return "0" + str;
  return str;
};

