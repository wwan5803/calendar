import "isomorphic-fetch";
import { fetchAnalysis } from "../service";

it(`The searched posts is not empty`, async () => {
  let result = await fetchAnalysis({url: 'http://api.finlogixtest.com/v1/posts?posts_directions[0]=long&symbols[0]=1&post_language=en&page=3'});
  expect(result.data.length > 0).toBe(true); 
});

it(`should not get any post due to the wrong data type of symbols`, async () => {
    let result = await fetchAnalysis({url: 'http://api.finlogixtest.com/v1/posts?posts_directions=long&symbols=1&post_language=en&page=3'});
    expect(result.data.length > 0).toBe(false); 
  });

it(`Can get posts if there are more posts in the next page`, async () => {
    let result = await fetchAnalysis({url: 'http://api.finlogixtest.com/v1/posts?posts_directions[0]=long&symbols[0]=1&post_language=en&page=3'});
    while ( result.has_more ) {
      result = await fetchAnalysis ({ url : result.next_page_url });
      expect(result.data.length > 0).toBe(true); 
    }
  });
