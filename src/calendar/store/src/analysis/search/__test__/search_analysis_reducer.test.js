import { searchAnalyses as reducer } from "../reducers";
import { updateSearchAnalyses, updateSearchProfileAnalyses, updateSearchFavoriteAnalyses} from "../actions";
import { UPDATE_SEARCH_ANALYSES, UPDATE_SEARCH_PROFILE_ANALYSES, UPDATE_FAVORITE_PROFILE_ANALYSES } from "../types";
import Immutable from "immutable";

const initSearchAnalysis = {
    query_options: "",
    updated_time: new Date(),
    has_more: !!0,
    next_page_url: "",
    resultSet: Immutable.Set()
}

const mockSearchAnalysis = {
    updated_time: new Date(),
    has_more: !!0,
    next_page_url: "",
    query_options: "posts_directions=long&symbols=2",
    resultSet: Immutable.Set([1,2,3])
}

function testSearchAnalysisReducer({type, name, action}){
    it(`${name} reducer can init`, () => {
        const result = reducer(undefined, {
          type,
          payload: initSearchAnalysis
        });
      
        const { resultSet, updated_time, has_more, next_page_url } = result;
      
        expect(updated_time !== undefined).toBe(true);
        expect(resultSet !== undefined).toBe(true);
        expect(has_more !== undefined).toBe(true);
        expect(next_page_url !== undefined).toBe(true);
      });
      
      it(`${name} reducer can be update correctly`, () => {
        const init = reducer(undefined, {});
        const newTime = new Date();
        const result = reducer(init, action(mockSearchAnalysis));
      
        expect(result.resultSet.size === 3).toBe(true);
      });
      
      it(`${name} reducer can filter duplicated analysis`, () => {
        const init = reducer(
          undefined,
          action(initSearchAnalysis)
        );
      
        let result = reducer(
          init,
          action(mockSearchAnalysis)
        );
      
        expect(result.resultSet.size === 3).toBe(true);
      
        result = reducer(
          result,
          action(mockSearchAnalysis)
        );
      
        expect(result.resultSet.size === 3).toBe(true);
      });
}

testSearchAnalysisReducer({type: UPDATE_SEARCH_ANALYSES, name: "search analyses", action: updateSearchAnalyses});
testSearchAnalysisReducer({type: UPDATE_SEARCH_PROFILE_ANALYSES, name: "search profile analyses", action: updateSearchProfileAnalyses});
testSearchAnalysisReducer({type: UPDATE_FAVORITE_PROFILE_ANALYSES, name: "search favorite analyses", action: updateSearchFavoriteAnalyses});