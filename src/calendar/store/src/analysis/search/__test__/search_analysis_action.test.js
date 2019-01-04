import { parseAnalyses } from "../../adapter";
import Immutable from "immutable";
const mockData = [
  {
    id: 227,
    title: "Selling Glod",
    content: "<p>Sell your gold in the next few months</p>",
    view_count: 2,
    like_count: 0,
    comment_count: 0,
    share_count: 0,
    favourite_count: 0,
    liked: false,
    favourited: false,
    picked: false,
    hotpicked: false,
    picked_reason: null,
    created_at: "2017-12-07 04:41:47",
    updated_at: "2018-01-17 05:15:01",
    symbols: ["AUD/CAD"],
    symbol_id: 1,
    tags: ["AUD/CAD"],
    strategies: [
      {
        id: 118,
        post_id: 227,
        symbol_id: 1,
        direction: "long",
        entry: "0.96646",
        stop_lost: "0.91764",
        take_profit: "1.01528",
        risk_return: "1.00000",
        created_at: "2017-12-07 04:41:47",
        updated_at: "2017-12-07 04:41:47",
        deleted_at: null,
        open_at: null,
        closed_at: null,
        closed_key: null,
        closed_pip: 0,
        status: 0
      }
    ],
    analysis_snapshot: "/v1/resource/analysis/227/raw.jpg",
    analysis_snapshot_code: "analysis_bd2383fbaed68005a107423a68a1b674_0227",
    customized_data:
      '{"doodle":[],"productId":"1","productName":"Australian Dollar/Canadian Dollar","productToken":"AUD/CAD","dataToIndex":1006,"dataTo":1512616200000,"lineTimePeriod":"M5","lineType":"Candles","chartBgColor":"white","indicators":[],"timezoneOffset":"UTC+10:00","currOhlcv":[1512614400000,0.96646,0.96654,0.96645,0.96646,0.96655,21]}',
    post_language: "en",
    time_type: "M5",
    posts_directions: "short",
    approved: 1,
    creator: {
      id: 24,
      name: "ZanyOrc@mailinator.com",
      email: "ZanyOrc@mailinator.com",
      last_login: "2018-01-03 05:12:50",
      created_at: "2017-12-04 07:21:20",
      updated_at: "2018-01-17 05:15:02",
      deleted_at: null,
      last_logout: "2018-01-03 07:15:51",
      login_count: 0,
      logout_count: 0,
      online_duration: 1595,
      follower_count: 1,
      nick_name: "wwy",
      nick_name_pin_yin: "wwy",
      country: "",
      avatar: "/v1/resource/avatar/24/raw.jpg?36644389456525306",
      intro: "1111",
      phone: "",
      state: "",
      language: "en",
      ui_language: "en",
      notification: "true",
      allow_recommend: "true",
      allow_invited_comment: "true",
      following: false
    },
    comments: []
  }
];

describe(`parseAnalyses to get result`, ()=>{
  const { analyses, comments, replies, users, result } = parseAnalyses(mockData);
  
  it(`result is a immutable list type`, ()=>{
    expect(Immutable.List.isList(result)).toBe(true);
  })
  it(`convert result to immutable set type`, ()=>{
    const resultSet = result.toSet();
    expect(Immutable.Set.isSet(resultSet)).toBe(true);
  })
  it(`resultSet is not empty`, ()=>{
    const resultSet = result.toSet();
    expect(resultSet.size > 0).toBe(true);
  })
})