export const leadingZero = (time: number) => {
  return ("0" + time.toString()).slice(-2);
};
