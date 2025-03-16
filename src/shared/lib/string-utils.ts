export function isEmpty(str: string) {
  return str.trim() === '';
}

export function isNotEmpty(str: string) {
  return !isEmpty(str);
}
