export const getKoreanTime = () => {
  const offset = 1000 * 60 * 60 * 9; // UTC+9
  return new Date(Date.now() + offset);
};

export const formatKoreanDate = (date: Date) => {
  return date.toLocaleString('en-US', { timeZone: 'Asia/Seoul' });
};
