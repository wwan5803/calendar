import { mostActiveUsers } from "../reducers";
import { updateMostActiveUsersInStore } from "../actions";
import mockData from "./mockSourceData";
import Immutable from "immutable";
import { parseUsers } from "../../adapter";

const mockUserList = [
  {id: 1, name: "a", follower_count: 13, analysis_count: 11, analysis_view_count: "123"},
  {id: 2, name: "b", follower_count: 11, analysis_count: 2, analysis_view_count: "1"},
  {id: 3, name: "c", follower_count: 3, analysis_count: 33, analysis_view_count: "22"},
  {id: 4, name: "d", follower_count: 5, analysis_count: 44, analysis_view_count: "12"}
]

it(`can update most action users in store correctly`, () => {
  const { users, result } = parseUsers(mockUserList);
  const userResult = mostActiveUsers(
    undefined,
    updateMostActiveUsersInStore({result})
  );
  expect(userResult.resultList).toEqual(result);
});

it(`parseUser adapter works properly`, ()=>{
  const { users, result } = parseUsers(mockUserList);
  expect(result).toEqual(Immutable.List([1,2,3,4]))
})