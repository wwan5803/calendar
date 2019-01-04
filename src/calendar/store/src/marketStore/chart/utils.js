export function chooseClosePrice(list) {
  const result = new Array(list.length);
  for (let i = 0; i < list.length; i++) {
    if (!list[i].c) throw "No close price!";
    result[i] = list[i].c;
  }
  return result;
}

export function sliceAndSortList(list) {
  return list.slice(0, 96).reverse();
}

export function minAndMaxOfList(list) {
  let max = -1,
    min = 100000000;
  for (let i = 0; i < list.length; i++) {
    if (list[i] > max) max = list[i];
    if (list[i] < min) min = list[i];
  }
  return {
    min,
    max
  };
}

export function nextTimeUpdateDelay() {
  return 900000 - new Date().getTime() % 900000;
}
