import { UPDATE_HEADER, ADD_HEADER, DELETE_HEADER } from "./types";

export function updateHeader({
  homeTitle,
  analysisTitle,
  profileTitle,
  homeContent,
  analysisContent,
  profileContent,
  homeImage,
  analysisImage,
  profileImage,
  links
}) {
  return {
    type: UPDATE_HEADER,
    payload: {
      homeTitle,
      analysisTitle,
      profileTitle,
      homeContent,
      analysisContent,
      profileContent,
      homeImage,
      analysisImage,
      profileImage,
      links
    }
  };
}

export function addHeader({
  homeTitle,
  analysisTitle,
  profileTitle,
  homeContent,
  analysisContent,
  profileContent,
  homeImage,
  analysisImage,
  profileImage,
  links
}) {
  return {
    type: ADD_HEADER,
    payload: {
      homeTitle,
      analysisTitle,
      profileTitle,
      homeContent,
      analysisContent,
      profileContent,
      homeImage,
      analysisImage,
      profileImage,
      links
    }
  };
}

export function deleteHeader({
  homeTitle,
  analysisTitle,
  profileTitle,
  homeContent,
  analysisContent,
  profileContent,
  homeImage,
  analysisImage,
  profileImage,
  links
}) {
  return {
    type: DELETE_HEADER,
    payload: {
      homeTitle,
      analysisTitle,
      profileTitle,
      homeContent,
      analysisContent,
      profileContent,
      homeImage,
      analysisImage,
      profileImage,
      links
    }
  };
}
