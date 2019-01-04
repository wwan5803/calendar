import { latestAnalyses as reducer } from "../reducers";
import { updateLatestAnalyses } from "../actions";
import { UPDATE_LATEST_ANALYSES } from "../types";
import Immutable from "immutable";

it(`regular analysis reducer can init`, () => {
  const result = reducer(undefined, {
    type: UPDATE_LATEST_ANALYSES,
    payload: {
      updated_time: new Date(),
      has_more: !!0,
      next_page_url: "",
      previous_page_url: "",
      resultSet: Immutable.Set()
    }
  });

  const { resultSet, updated_time, has_more, next_page_url } = result;

  expect(updated_time !== undefined).toBe(true);
  expect(resultSet !== undefined).toBe(true);
  expect(has_more !== undefined).toBe(true);
  expect(next_page_url !== undefined).toBe(true);
});

// const mockAnalysis = {
//   id: 42,
//   title: "The title of analysis",
//   content: "<p>The content of analysis</p>",
//   view_count: 0,
//   like_count: 0,
//   comment_count: null,
//   share_count: null,
//   liked: false,
//   favourited: false,
//   picked: false,
//   picked_reason: null,
//   created_at: "2017-05-11 05:25:26",
//   updated_at: "2017-05-11 05:25:26",
//   symbols: ["AUDCAD", "AUDCAD"],
//   tags: ["Audcad"],
//   strategies: [
//     {
//       id: 67,
//       post_id: 42,
//       symbol_id: 1,
//       direction: "long",
//       entry: "0.00000",
//       stop_lost: "1.19800",
//       take_profit: "1.23800",
//       risk_return: "1.00000",
//       created_at: "2017-05-11 05:25:26",
//       updated_at: "2017-05-11 05:25:26",
//       deleted_at: null,
//       open_at: null,
//       closed_at: null,
//       closed_key: null,
//       closed_pip: 0,
//       status: 0
//     },
//     {
//       id: 68,
//       post_id: 42,
//       symbol_id: 1,
//       direction: "short",
//       entry: "0.00000",
//       stop_lost: "1.24800",
//       take_profit: "1.20800",
//       risk_return: "1.00000",
//       created_at: "2017-05-11 05:25:26",
//       updated_at: "2017-05-11 05:25:26",
//       deleted_at: null,
//       open_at: null,
//       closed_at: null,
//       closed_key: null,
//       closed_pip: 0,
//       status: 0
//     }
//   ],
//   analysis_snapshot: "/v1/resource/analysis/42/raw.jpg",
//   analysis_snapshot_code: "analysis_dafddac5ba2cea1f85704f880beb4efc_042",
//   customized_data: null,
//   creator: {
//     id: 3,
//     name: "finlogix001@mailinator.com",
//     email: "finlogix001@mailinator.com",
//     last_login: "2017-05-11 06:43:10",
//     created_at: "2017-05-08 03:30:08",
//     updated_at: "2017-05-11 06:43:10",
//     deleted_at: null,
//     nick_name: "dov",
//     country: "",
//     city: "",
//     avatar: "/v1/resource/avatar/3/raw.jpg",
//     intro: ""
//   },
//   comments: []
// };
// const newMockAnalysis = {
//   id: 42,
//   title: "new title",
//   content: "<p>The content of analysis</p>",
//   view_count: 0,
//   like_count: 0,
//   comment_count: null,
//   share_count: null,
//   liked: false,
//   favourited: false,
//   picked: false,
//   picked_reason: null,
//   created_at: "2017-05-11 05:25:26",
//   updated_at: "2017-05-11 05:25:26",
//   symbols: ["AUDCAD", "AUDCAD"],
//   tags: ["Audcad"],
//   strategies: [
//     {
//       id: 67,
//       post_id: 42,
//       symbol_id: 1,
//       direction: "long",
//       entry: "0.00000",
//       stop_lost: "1.19800",
//       take_profit: "1.23800",
//       risk_return: "1.00000",
//       created_at: "2017-05-11 05:25:26",
//       updated_at: "2017-05-11 05:25:26",
//       deleted_at: null,
//       open_at: null,
//       closed_at: null,
//       closed_key: null,
//       closed_pip: 0,
//       status: 0
//     },
//     {
//       id: 68,
//       post_id: 42,
//       symbol_id: 1,
//       direction: "short",
//       entry: "0.00000",
//       stop_lost: "1.24800",
//       take_profit: "1.20800",
//       risk_return: "1.00000",
//       created_at: "2017-05-11 05:25:26",
//       updated_at: "2017-05-11 05:25:26",
//       deleted_at: null,
//       open_at: null,
//       closed_at: null,
//       closed_key: null,
//       closed_pip: 0,
//       status: 0
//     }
//   ],
//   analysis_snapshot: "/v1/resource/analysis/42/raw.jpg",
//   analysis_snapshot_code: "analysis_dafddac5ba2cea1f85704f880beb4efc_042",
//   customized_data: null,
//   creator: {
//     id: 3,
//     name: "finlogix001@mailinator.com",
//     email: "finlogix001@mailinator.com",
//     last_login: "2017-05-11 06:43:10",
//     created_at: "2017-05-08 03:30:08",
//     updated_at: "2017-05-11 06:43:10",
//     deleted_at: null,
//     nick_name: "dov",
//     country: "",
//     city: "",
//     avatar: "/v1/resource/avatar/3/raw.jpg",
//     intro: ""
//   },
//   comments: []
// };

const mockLatestAnalysis = {
      updated_time: new Date(),
      has_more: !!1,
      next_page_url: "http://api.finlogixtest.com/v1/posts?per_page=16&post_language=en&page=2",
      previous_page_url: "",
      resultSet: Immutable.Set([1,2,3])
}


it(`regular analysis reducer can be update correctly`, () => {
  const init = reducer(undefined, {});
  const newTime = new Date();
  const result = reducer(init, updateLatestAnalyses(mockLatestAnalysis));

  expect(result.resultSet.size === 3).toBe(true);
});

it(`regular analysis reducer can filter duplicated analysis`, () => {
  const init = reducer(
    undefined,
    updateLatestAnalyses({
      updated_time: new Date(),
      has_more: !!0,
      next_page_url: "",
      previous_page_url: "",
      resultSet: Immutable.Set()
    })
  );

  let result = reducer(
    init,
    updateLatestAnalyses({
      updated_time: new Date(),
      has_more: !!0,
      next_page_url: "",
      previous_page_url: "",
      resultSet: Immutable.Set([1,2,3])
    })
  );

  expect(result.resultSet.size === 3).toBe(true);

  result = reducer(
    result,
    updateLatestAnalyses({
      updated_time: new Date(),
      has_more: !!0,
      next_page_url: "",
      previous_page_url: "",
      resultSet: Immutable.Set([1,2,3])
    })
  );

  expect(result.resultSet.size === 3).toBe(true);
});
