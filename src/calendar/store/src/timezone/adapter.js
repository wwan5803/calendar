export function transformListToMap(list) {
  const result = {};
  list.forEach(entity => {
    result[entity.zone_name] = entity;
  });
  return result;
}
