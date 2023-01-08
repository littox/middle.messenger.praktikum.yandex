export function trim(string: string, symbols: string = '\\s'): string {
  const decodedString = decodeURIComponent(JSON.parse(`"${string}"`));
  const re = new RegExp(`[${symbols}]`, 'ug');
  return decodedString.replace(re, '');
}
