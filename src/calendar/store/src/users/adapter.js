import Immutable from "immutable";
import { normalize, schema } from "normalizr";

const userSchema = new schema.Entity("user");

const usersSchema = new schema.Array(userSchema);

function generateNumberKeyMap(obj) {
  const seed = Immutable.Map();
  if (!obj) return seed;
  return seed.withMutations(tmp => {
    Object.keys(obj).forEach(key => {
      tmp.set(+key, Immutable.fromJS(obj[key]));
    });
  });
}

export function parseUsers(data) {
  const normalizedData = normalize(data, usersSchema);
  const { result, entities: { user } } = normalizedData;

  return {
    users: generateNumberKeyMap(user),
    result: Immutable.fromJS(result)
  };
}
