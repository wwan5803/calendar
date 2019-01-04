import { UPDATE_HEADER, ADD_HEADER, DELETE_HEADER } from "./types";
import { createReducer } from "redux-create-reducer";
import Immutable from "immutable";
import { COMBINED_ACTIONS, generateCombinedReducer } from "../combinedHelper";
import { homeHeader } from "config/config";

function updateHeader(domain, action) {
  const header = action.payload;
  return domain.withMutations(tmp => {
    Object.keys(header).map(key => {
      if (header[key] && header[key] !== "") {
        tmp.set(key, header[key]);
      }
    });
  });
}

function addHeader(domain, action) {
  const header = action.payload;
  return domain.withMutations(tmp => {
    Object.keys(header).map(key => {
      if (header[key] && header[key] !== "") {
        tmp.merge(header);
      }
    });
  });
}

function deleteHeader(domain, action) {
  const header = action.payload;
  return domain.withMutations(tmp => {
    Object.keys(header).map(key => {
      if (header[key] === "") {
        tmp.set(key, void 0);
      }
    });
  });
}

function initDomain() {
  return Immutable.Map(homeHeader);
  // return {
  //   homeTitle: "",
  //   analysisTitle: "",
  //   profileTitle: "",
  //   content: "",
  //   image: "",
  //   links: []
  // };
}

export const header = createReducer(initDomain(), {
  [UPDATE_HEADER]: updateHeader,
  [ADD_HEADER]: addHeader,
  [DELETE_HEADER]: deleteHeader,
  [COMBINED_ACTIONS]: generateCombinedReducer([
    {
      type: UPDATE_HEADER,
      handler: updateHeader
    },
    {
      type: ADD_HEADER,
      handler: addHeader
    },
    {
      type: DELETE_HEADER,
      handler: deleteHeader
    }
  ])
});
