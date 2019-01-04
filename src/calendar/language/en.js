import nav_bar from "./components/nav_bar/en";
import drop_down_nav from "./components/drop_down_nav/en";
import modals from "./components/modals/en";
import picks from "./components/picks/en";
import market_calendar from "./components/market_calendar/en";
import floatApp from "./components/floatApp/en";
import notification from "./components/notification/en";
import profile from "./components/profile/en";
import publish from "./components/publish/en";
import auth from "./components/auth/en";
import blog from "./components/blog/en";
import analysisDetail from "./components/analysisDetail/en";
import userBehavior from "./components/userBehavior/en";
import terms from "./terms/en";
import users from "./users/en";
import fullPageMyAnalysis from "./components/fullPageMyAnalysis/en";
import analysisSearchBar from "./components/analysisSearchBar/en";
import draft from "./components/draft/en";
import ecoCalendar from "./components/ecoCalendar/en";
import copyright from "./copyright/en";

export default {
  components: {
    nav_bar,
    modals,
    drop_down_nav,
    picks,
    market_calendar,
    floatApp,
    notification,
    profile,
    publish,
    auth,
    blog,
    analysisDetail,
    userBehavior,
    fullPageMyAnalysis,
    analysisSearchBar,
    draft,
    ecoCalendar
  },
  terms,
  users,
  tips: {
    httpError: "Network error, the code is : "
  },
  copyright
};
