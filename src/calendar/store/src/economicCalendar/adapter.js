import Immutable from "immutable";
import { normalize, schema } from "normalizr";
import { sliceOutdateInfo } from "./utils";
import { generateNumberKeyMap, generateStringKeyMap } from "../helper";

// const entitySchema = new schema.Entity(
//   "entityMap",
//   {},
//   { idAttribute: "EventId" }
// );

const entitySchema = new schema.Entity(
  "entityMap",
  {},
  {
    idAttribute: value =>
      value.RIC ? `${value.Period}-${value.RIC}` : value.Period + ""
  }
);

const entitiesSchema = new schema.Array(entitySchema);

export function parseEcoEntities(data) {
  // var obj = {};
  // var newArr = [];
  //
  // for (var i = 0; i < data.length; i++)
  //   obj[data[i]["EventNameEn"] + data[i]["Country"] + data[i]["RIC"]] = data[i];
  // // console.log("obj", obj);
  // for (var key in obj) newArr.push(obj[key]);
  const normalizedData = normalize(sliceOutdateInfo(data), entitiesSchema);
  const { result, entities: { entityMap } } = normalizedData;
  // console.log("entityMap", entityMap);
  // console.log("result", result);
  return {
    result: Immutable.fromJS(result),
    economicCalendar: generateStringKeyMap(entityMap)
  };
}
