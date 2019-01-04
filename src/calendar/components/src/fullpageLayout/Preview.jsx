// import React, { PureComponent } from "react";
// import { connect } from "react-redux";
// import "./preview.scss";
// import { apiHostname } from "config/config";
// import { MOBILE, TABLET } from "utils";
// import { AnalysisDetailLinkWithoutSearch } from "../AnalysisDetailLink";
// import { PreviewContent } from "../analysisContentComponents";
// import FaThumbsUp from "react-icons/lib/fa/thumbs-up";
// import FaEye from "react-icons/lib/fa/eye";
// import FaCommenting from "react-icons/lib/fa/commenting";

// const Content = ({ title, content }) =>
//   <div styleName="content">
//     <div styleName="title">
//       {title}
//     </div>
//     <PreviewContent styleName="words" content={content} />
//   </div>;

// const Labels = ({ view_count, like_count, comment_count }) =>
//   <div styleName="labels">
//     <div styleName="label">
//       {/*<span styleName="icon like" />*/}
//       <FaThumbsUp styleName={`icon`} />
//       <span styleName="value">
//         {like_count || 0}
//       </span>
//     </div>
//     &nbsp;
//     <div styleName="label">
//       {/*<span styleName="icon comment" />*/}
//       <FaEye styleName={`icon`} />
//       <span styleName="value">
//         {comment_count || 0}
//       </span>
//     </div>
//     &nbsp;
//     <div styleName="label">
//       {/*<span styleName="icon view" />*/}
//       <FaCommenting styleName={`icon`} />
//       <span styleName="value">
//         {view_count || 0}
//       </span>
//     </div>
//   </div>;

// export const Tag = ({ tag }) =>
//   <span styleName="tag" className="capital">
//     {tag}
//   </span>;

// export const Preview = connect(state => ({
//   analyses: state.get("analyses"),
//   users: state.get("users")
// }))(function Preview({ analysisId, analyses, users, hasLine, showUpdateTime }) {
//   let analysis;
//   try {
//     analysis = analyses.get(analysisId).toJS();
//   } catch (err) {}

//   if (!analysis) return null;

//   const {
//     tags,
//     analysis_snapshot,
//     analysis_snapshot_code,
//     title,
//     content,
//     created_at,
//     updated_at,
//     creator,
//     view_count,
//     like_count,
//     comment_count
//   } = analysis;

//   const user = users.get(creator);
//   const avatar = user ? user.toJS().avatar : void 0;

//   return (
//     <div styleName="block">
//       <div>
//         {!hasLine && <div styleName="line" />}
//         <Tag tag={tags[0]} />
//         <Info
//           showUpdateTime={showUpdateTime}
//           updated_at={updated_at}
//           created_at={created_at}
//         />
//       </div>
//       <div styleName="preview">
//         {/*
//            <div styleName="avatar">
//            {avatar && (
//            <img
//            src={/^http/.test(avatar) ? avatar : `${apiHostname}${avatar}`}
//            alt="avatar"
//            styleName="avatar-img"
//            />
//            )}
//            </div>
//           */}
//         <Content title={title} content={content} />
//         <div styleName="chart">
//           <AnalysisDetailLinkWithoutSearch analysisId={analysisId}>
//             <img
//               src={`${apiHostname}${analysis_snapshot}?version=${analysis_snapshot_code}`}
//               alt="chart"
//               styleName="chart-img"
//             />
//           </AnalysisDetailLinkWithoutSearch>
//         </div>
//         <div styleName="bar">
//           {/*<img
//             src={dynamicResUrl + 'my_analysis_bar.png'}
//             alt="bar"
//             styleName="bar-img"
//           />*/}
//         </div>
//         <Labels
//           view_count={view_count}
//           like_count={like_count}
//           comment_count={comment_count}
//         />
//       </div>
//     </div>
//   );
// });

// const Line = ({ level }) =>
//   <div
//     styleName="line"
//     style={{
//       top: level ? -level * 420 - 15 + "px" : 0,
//       height: level ? level * 420 + 55 + "px" : "40px"
//     }}
//   />;

// export const Info = ({ created_at, showUpdateTime, updated_at }) =>
//   <div styleName="info">
//     {/* {showUpdateTime ? updated_at : created_at} */}
//     {created_at}
//   </div>;

// export default connect(state => ({
//   screenSize: state.get("screenSize")
// }))(({ screenSize, level }) => {
//   const extra =
//     screenSize !== MOBILE && screenSize !== TABLET
//       ? <div>
//           <Line level={level} />
//           <Tag />
//           <Info />
//         </div>
//       : undefined;

//   return <Preview extra={extra} />;
// });

import React, { Component } from "react";
import { connect } from "react-redux";
import "./preview.scss";
import { apiHostname } from "config/config";
import {
  MOBILE,
  TABLET,
  getTheShowingStrategy,
  isValidStrategy,
  STRATEGY_STAND_BY,
  STRATEGY_SUCCESS,
  STRATEGY_FAIL,
  STRATEGY_TREND_TO_SUCCESS,
  STRATEGY_USELESS,
  STRATEGY_TREND_TO_FAIL
} from "utils";
import FaThumbsUp from "react-icons/lib/fa/thumbs-up";
import FaCommenting from "react-icons/lib/fa/commenting";
import FaEye from "react-icons/lib/fa/eye";
import StrategyBar from "../strategyBar";
import { symbolValueHOC } from "../symbolComponents";
import { AnalysisDetailLinkWithoutSearch } from "../AnalysisDetailLink";
import { PreviewContent } from "../analysisContentComponents";

const Content = ({ title, content }) => (
  <div styleName="content">
    <div styleName="title">{title}</div>
    <PreviewContent styleName="words" content={content} />
  </div>
);

const Labels = ({ view_count, like_count, comment_count }) => (
  <div styleName="labels">
    <div styleName="label">
      {/*<span styleName="icon like" />*/}
      <FaThumbsUp styleName={`icon`} />
      <span styleName="value">{like_count || 0}</span>
    </div>
    &nbsp;
    <div styleName="label">
      {/*<span styleName="icon comment" />*/}
      <FaEye styleName={`icon`} />
      <span styleName="value">{comment_count || 0}</span>
    </div>
    &nbsp;
    <div styleName="label">
      {/*<span styleName="icon view" />*/}
      <FaCommenting styleName={`icon`} />
      <span styleName="value">{view_count || 0}</span>
    </div>
  </div>
);

export const Tag = ({ tag }) => (
  <span styleName="tag" className="capital">
    {tag}
  </span>
);

export const Preview = symbolValueHOC(symbolStore => {
  try {
    const { current } = symbolStore.tickValue;
    return { current };
  } catch (err) {
    return { current: 0.0 };
  }
})(
  connect(state => ({
    analyses: state.get("analyses"),
    users: state.get("users")
  }))(
    function Preview({
      analysisId,
      analyses,
      users,
      hasLine,
      showUpdateTime,
      current
    }) {
      let analysis;
      try {
        analysis = analyses.get(analysisId).toJS();
      } catch (err) {}
  
      if (!analysis) return null;
  
      const {
        tags,
        analysis_snapshot,
        analysis_snapshot_code,
        title,
        content,
        created_at,
        updated_at,
        creator,
        view_count,
        like_count,
        comment_count
      } = analysis;

      
  
      const user = users.get(creator);
      const avatar = user ? user.toJS().avatar : void 0;

      
      
      const strategies = analyses.getIn([analysisId, "strategies"]).toJS();

  
  
      if (strategies.length !== 0) {
        const strategy = getTheShowingStrategy(strategies);
        if (!isValidStrategy(strategy)) {
          return null;
        }
        console.log('1', strategy)
  
        const { entry, direction, stop_lost, take_profit, status } = strategy;
  
        let color;
  
        switch (status) {
          case STRATEGY_STAND_BY:
          case STRATEGY_USELESS:
            color = "default-status";
            break;
          case STRATEGY_TREND_TO_SUCCESS:
            color = "trend-to-success";
            break;
          case STRATEGY_SUCCESS:
            color = "success";
            break;
          case STRATEGY_TREND_TO_FAIL:
            color = "tend-to-fail";
            break;
          case STRATEGY_FAIL:
            color = "fail";
            break;
          default:
            color = "default-status";
        }

        console.log('2', color)
  
        return (
          <div>
            <div styleName={`preview ${color}`}>
              <Content title={title} content={content} />
              <div styleName="chart">
                <AnalysisDetailLinkWithoutSearch analysisId={analysisId}>
                  <img
                    src={`${apiHostname}${analysis_snapshot}?version=${analysis_snapshot_code}`}
                    alt="chart"
                    styleName="chart-img"
                  />
                </AnalysisDetailLinkWithoutSearch>
              </div>
              {/*<div styleName="bar">
                          <img
                           src={dynamicResUrl + 'my_analysis_bar.png'}
                           alt="bar"
                           styleName="bar-img"
                           />
                      </div>*/}
              <StrategyBar
                entry={entry}
                direction={direction}
                stop_lost={stop_lost}
                take_profit={take_profit}
                current={current}
                status={status}
              />
              <Labels
                view_count={view_count}
                like_count={like_count}
                comment_count={comment_count}
              />
            </div>
          </div>
        );
      } else {
        return (
          <div styleName="block">
            <div>
              {!hasLine && <div styleName="line" />}
              <Tag tag={tags[0]} />
              <Info
                showUpdateTime={showUpdateTime}
                updated_at={updated_at}
                created_at={created_at}
              />
            </div>
            <div styleName="preview">
              {/*
               <div styleName="avatar">
               {avatar && (
               <img
               src={/^http/.test(avatar) ? avatar : `${apiHostname}${avatar}`}
               alt="avatar"
               styleName="avatar-img"
               />
               )}
               </div>
              */}
              <Content title={title} content={content} />
              <div styleName="chart">
                <AnalysisDetailLinkWithoutSearch analysisId={analysisId}>
                  <img
                    src={`${apiHostname}${analysis_snapshot}?version=${analysis_snapshot_code}`}
                    alt="chart"
                    styleName="chart-img"
                  />
                </AnalysisDetailLinkWithoutSearch>
              </div>
              <div styleName="bar">
                {/*<img
                src={dynamicResUrl + 'my_analysis_bar.png'}
                alt="bar"
                styleName="bar-img"
              />*/}
              </div>
              <Labels
                view_count={view_count}
                like_count={like_count}
                comment_count={comment_count}
              />
            </div>
          </div>
        );
      }
    }



  )
);

const Line = ({ level }) => (
  <div
    styleName="line"
    style={{
      top: level ? -level * 420 - 15 + "px" : 0,
      height: level ? level * 420 + 55 + "px" : "40px"
    }}
  />
);

export const Info = ({ created_at, showUpdateTime, updated_at }) => (
  <div styleName="info">
    {/* {showUpdateTime ? updated_at : created_at} */}
    {created_at}
  </div>
);

// export default connect(state => ({
//   screenSize: state.get("screenSize")
// }))(({ screenSize, level }) => {
//   const extra =
//     screenSize !== MOBILE && screenSize !== TABLET
//       ? <div>
//           <Line level={level} />
//           <Tag />
//           <Info />
//         </div>
//       : undefined;

//   return <Preview extra={extra} />;
// });
