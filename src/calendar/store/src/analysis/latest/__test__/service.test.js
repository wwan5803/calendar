import "isomorphic-fetch";
import { fetchAnalysis } from "../service";

it(`cat get posts with url`, async () => {
  let result = await fetchAnalysis({url: 'http://api.finlogixtest.com/v1/posts?per_page=16&post_language=en&page=1'});
  // console.log ( result.data.length );
  expect(result.data.length).toBe(16); 
  /*result = await fetchAnalysis ( { per_page : 1 } );
  while ( result.has_more ) {
    result = await fetchAnalysis ( { url : result.next_page_url } );
    console.log ( result.data.length );
  }*/
});
