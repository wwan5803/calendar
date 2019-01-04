import { hostname, apiHostname } from "config/config";
export default function chooseMetaData(
  {
    url,
    homeContent,
    homeImage,
    analysisContent,
    analysisImage,
    profileContent,
    profileImage,
    analysisTitle,
    homeTitle,
    profileTitle
  } = {}
) {
  let img;
  let description;
  let title;
  if (/\/analyses\/\d+/.test(url)) {
    img = `${apiHostname}${analysisImage}`;
    description = analysisContent;
    title = analysisTitle;
  } else if (/^\/profile\/\d+/.test(url)) {
    img = `${apiHostname}${profileImage}`;
    description = profileContent;
    title = profileTitle;
  } else {
    img = `${hostname}${homeImage}`;
    description = homeContent;
    title = homeTitle;
  }
  return [
    {
      property: "og:image:secure_url",
      content: img.replace("http:", "https:")
    },
    {
      property: "og:image",
      content: img
    },
    {
      property: "og:title",
      content: title
    },
    {
      property: "og:description",
      content: description
    },
    {
      name: "twitter:card",
      content: "summary_large_image"
    },
    {
      name: "twitter:description",
      content: description
    },
    {
      name: "twitter:title",
      content: title
    },
    {
      name: "twitter:image",
      content: img
    },
    {
      itemprop: "name",
      content: title
    },
    {
      itemprop: "description",
      content: description
    },
    {
      itemprop: "image",
      content: img
    }
  ];
}
