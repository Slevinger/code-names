export const parseQueryString = search =>
  search
    .replace("?", "")
    .split("&")
    .map(str => str.split("="))
    .reduce((acc, pair) => ({ ...acc, [pair[0]]: pair[1] }), {});
