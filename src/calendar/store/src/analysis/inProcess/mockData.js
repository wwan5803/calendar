import chart_img_in_base64 from "./mockbase64";
export default {
  1: {
    symbol_id: 1,
    symbol: {
      name: "AUDCAD",
      accuracy: 0.0001,
      id: 1
    },
    chart_img_in_base64,
    title: "The title of analysis",
    content: "<p>The content of analysis</p>",
    tags: ["AUDUSD"],
    directions: { long: 1, short: 1, neutral: 1 },
    customized_data: {},
    strategies: [
      {
        direction: "long",
        entry: 1.218,
        take_profit: 1.238,
        stop_lost: 1.198,
        symbol_id: 1
      },
      {
        direction: "short",
        entry: 1.228,
        take_profit: 1.208,
        stop_lost: 1.248,
        symbol_id: 1
      }
    ]
  }
};
