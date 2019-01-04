import { UPDATE_IN_PROCESS_POSTS } from "./types";
import mockData from './mockData';
export function inProcessPosts(state = mockData, action) {
  if (action.type === UPDATE_IN_PROCESS_POSTS) {
    return { ...state, ...action.data };
  }
  return state;
}

