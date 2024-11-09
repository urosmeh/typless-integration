export const beautifyFieldName = (value: string) => {
  if (!value) {
    return '';
  }
  const replaced = value.replace(/_/g, ' ');
  return replaced.charAt(0).toUpperCase() + replaced.slice(1);
};
