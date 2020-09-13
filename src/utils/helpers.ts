/* eslint-disable prettier/prettier */
export const oneminute = 60;

export const quotient = (a: number, b: number) => (a - (a % b)) / b;

export const remainder = (a: number, b: number) => a % b;

export const getTimerText = (count: number): [String, String] => {
  const minute = quotient(count, oneminute),
    second = remainder(count, oneminute);

  const minuteText =
    quotient(minute, 10) >= 1 ? minute.toString() : '0' + minute;
  const secondText =
    quotient(second, 10) >= 1 ? second.toString() : '0' + second;

  return [minuteText, secondText];
};
