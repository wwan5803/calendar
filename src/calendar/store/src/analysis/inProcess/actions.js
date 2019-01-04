import { UPDATE_LATEST_ANALYSES } from "./types";
export const UPDATE_IN_PROCESS_POSTS = "UPDATE_IN_PROCESS_POSTS";
export function updatePosts(posts) {
  return {
    type: UPDATE_IN_PROCESS_POSTS,
    data: posts
  };
}

export function deletePost(id) {
  const data = {};
  data[id] = undefined;
  return {
    type: UPDATE_IN_PROCESS_POSTS,
    data
  };
}

export function updatePost(id, content) {
  const data = {};
  data[id] = content;
  return {
    type: UPDATE_IN_PROCESS_POSTS,
    data
  };
}
