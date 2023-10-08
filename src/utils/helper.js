export const formatNumber = (number) => Number(number)
  .toLocaleString('en-US', { maximumFractionDigits: 2 })

export const isFile = (node) => !!node?.url;
export const hasChildren = (node) => node?.children && node.children.length;

export const arraySame = (firstArray, secondArray) => firstArray.length === secondArray.length && firstArray.every(
  element => secondArray.includes(element)
);

export const cloneDeep = (object) => JSON.parse(JSON.stringify(object));
