import {
    UPDATE_ANALYSES,
    UPDATE_COMMENTS,
    UPDATE_REPLIES,
    LIKE_AN_ANALYSIS,
    DISLIKE_AN_ANALYSIS,
    FAVOURITE_AN_ANALYSIS,
    UN_FAVOURITE_AN_ANALYSIS,
    SHARE_AN_ANALYSIS,
    UPDATE_STRATEGIES_STATUS,
    INIT_MIXEDCONTENT,
    UPDATE_MIXEDCONTENT
  } from "../types";
  import { analyses as reducer } from "../reducers";
  import Immutable from "immutable";

  const mockAnalyses = Immutable.Map({223: Immutable.Map({
    "id" : 223,
    "analysis_snapshot" : "/v1/resource/analysis/223/raw.jpg",
    "analysis_snapshot_code":"analysis_d4849bb828e00142e1f7d967e88a1ab7_0223",
    "creator" : 7,
    "like_count" : 1,
    "liked" : false,
    "view_count" : 8,
    "favourite_count" : 1,
    "favourited" : false,
    "title" : "sacsdav",
    "symbol_id" : 1,
    "updated_at" : "2018-01-17 05:15:02"
  })})

  

  describe(`like an analysis`, ()=>{
    const result = reducer(mockAnalyses, {
      type: LIKE_AN_ANALYSIS,
      analysisId: '223'
    });
    it(`should liked be true`, ()=>{
      expect(result.getIn(['223', 'liked'])).toBe(true);
    })
    it(`should like_count be 2`, ()=>{
      expect(result.getIn(['223', 'like_count'])).toBe(2);
    })
  })

  
  describe(`dislike an analysis`, ()=>{
    const result = reducer(mockAnalyses, {
      type: DISLIKE_AN_ANALYSIS,
      analysisId: '223'
    });
    it(`should liked be false`, ()=>{
      expect(result.getIn(['223', 'liked'])).toBe(false);
    })
    it(`should like_count be 0`, ()=>{
      expect(result.getIn(['223', 'like_count'])).toBe(0);
    })
  })


  describe(`add an analysis to favorite`, ()=>{
    const result = reducer(mockAnalyses, {
      type: FAVOURITE_AN_ANALYSIS,
      analysisId: '223'
    });
    it(`should favourited be true`, ()=>{
      expect(result.getIn(['223', 'favourited'])).toBe(true);
    })
    it(`should favourite_count be 2`, ()=>{
      expect(result.getIn(['223', 'favourite_count'])).toBe(2);
    })
  })

  describe(`remove an analysis from favorite`, ()=>{
    const result = reducer(mockAnalyses, {
      type: UN_FAVOURITE_AN_ANALYSIS,
      analysisId: '223'
    });
    it(`should favourited be false`, ()=>{
      expect(result.getIn(['223', 'favourited'])).toBe(false);
    })
    it(`should favourite_count be 0`, ()=>{
      expect(result.getIn(['223', 'favourite_count'])).toBe(0);
    })
  })