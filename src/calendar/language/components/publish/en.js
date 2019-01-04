export default {
  panel_title: "Publish Your Idea",
  analysis_title: "TITLE",
  direction: "DIRECTION",
  posts_directions: {
    long: "LONG",
    short: "SHORT",
    neutral: "NEUTRAL"
  },
  post_status: {
    titleEmpty: "Please fill in a title."
  },
  current_price: "CURRENT PRICE",
  strategy: "STRATEGY",
  strategy_status: {
    entry_error10:
      "Entry price can not greater than current price * 110% or less than current price * 90%",
    entry_error50:
      "Entry price can not greater than current price * 150% or less than current price * 50%",
    range_error:
      "Entry price, take profit price and stop lost price should be 0 ~ 5,000,000",
    sltp_error10:
      "The gap between SL(or TP) and entry price should not less than entry price * 0.1% and should not greater than entry price * 10%",
    sltp_error50:
      "The gap between SL(or TP) and entry price should not less than entry price * 0.1% and should not greater than entry price * 50%",
    duplicate_entry_error: `Two strategies' entry price should be different`,
    gap_error:
      "The pips between take profit (or stop lost) price and entry price should be 10 ~ 500",
    risk_return_error: "Risk/Return should be 0.5 ~ 5"
  },
  add: "ADD",
  table: {
    direction: "DIRECTION",
    entry: "ENTRY",
    stop_lost: "STOPLOST",
    take_profit: "TAKEPROFIT",
    risk_return: "RISK/RETURN",
    action: "ACTION",
    del: "DEL"
  },
  editor: {
    bold: "Bold",
    italic: "Italic",
    underline: "Underline",
    placeholder: "Input analysis"
  },
  tags: "TAGS",
  input_tag: "TYPE TAG",
  confirm_input_tag: "OK",
  recommend_tas: "RECOMMEND TAGS",
  recommend_reader: "RECOMMEND TO",
  publish: "PUBLISH",
  cancel: "CANCEL",
  save_draft: "SAVE AS DRAFT",
  network: {
    success_save_draft: "Success to save draft",
    success_publish: "Success to publish"
  }
};
