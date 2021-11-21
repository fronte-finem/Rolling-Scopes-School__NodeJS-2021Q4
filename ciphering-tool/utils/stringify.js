export const stringify = (value) => {
  const type = typeof value;
  if (type === 'string') return value;
  if (type === 'object') return JSON.stringify(value);
  return String(value);
};
