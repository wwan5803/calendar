export default {
  panel_title: "发表分析",
  analysis_title: "标题",
  direction: "走势",
  posts_directions: {
    long: "涨",
    short: "跌",
    neutral: "横盘"
  },
  post_status: {
    titleEmpty: "请填写文章标题"
  },
  current_price: "当前价格",
  strategy: "策略",
  strategy_status: {
    entry_error10: "入场价不得高于现价的110%或低于现价的90%",
    entry_error50: "入场价不得高于现价的150%或低于现价的50%",
    sltp_error10: "止盈、止损与入场价的差值不得低于入场价的0.1%且不得高于入场价的10%",
    sltp_error50: "止盈、止损与入场价的差值不得低于入场价的0.1%且不得高于入场价的50%",
    range_error: "入场价、止损、止盈有效范围应在0到5,000,000",
    duplicate_entry_error: "两条策略中的入场价不能相同",
    gap_error: "止盈、止损与入场价的差值范围应在10到500个点",
    risk_return_error: "风险回报比的范围应在0.5到5之间"
  },
  add: "添加",
  table: {
    direction: "走势",
    entry: "入场价",
    stop_lost: "止损",
    take_profit: "止盈",
    risk_return: "风险回报比",
    action: "操作",
    del: "删除"
  },
  editor: {
    bold: "粗体",
    italic: "斜体",
    underline: "下划线",
    placeholder: "输入分析"
  },
  tags: "标签",
  input_tag: "输入标签",
  confirm_input_tag: "确认",
  recommend_tas: "推荐的标签",
  recommend_reader: "推荐给读者",
  publish: "发表",
  cancel: "取消",
  save_draft: "存为草稿",
  network: {
    success_save_draft: "保存草稿成功",
    success_publish: "发表成功"
  }
};
