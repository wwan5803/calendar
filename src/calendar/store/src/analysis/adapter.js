import Immutable from "immutable";
import { normalize, schema } from "normalizr";
import { generateNumberKeyMap } from "../helper";

const userSchema = new schema.Entity("users");

const replySchema = new schema.Entity("replies", {
  creator: userSchema
});

const replyArraySchema = new schema.Array(replySchema);

replySchema.define({
  replies: replyArraySchema
});

const commentSchema = new schema.Entity("comments", {
  creator: userSchema,
  replies: replyArraySchema
});

const analysisSchema = new schema.Entity("analysis", {
  creator: userSchema,
  comments: [commentSchema]
});

export const analysesSchema = new schema.Array(analysisSchema);

export function parseAnalyses(data) {
  const normalizedData = normalize(data, analysesSchema);
  const {
    result,
    entities: { analysis, comments, replies, users }
  } = normalizedData;

  return {
    analyses: generateNumberKeyMap(analysis),
    comments: generateNumberKeyMap(comments),
    replies: generateNumberKeyMap(replies),
    users: generateNumberKeyMap(users),
    result: Immutable.fromJS(result)
  };
}

export function parseAnalysis(data) {
  const normalizedData = normalize(data, analysisSchema);
  const {
    result,
    entities: { analysis, comments, replies, users }
  } = normalizedData;

  return {
    analyses: generateNumberKeyMap(analysis),
    comments: generateNumberKeyMap(comments),
    replies: generateNumberKeyMap(replies),
    users: generateNumberKeyMap(users),
    result: Immutable.fromJS(result)
  };
}
