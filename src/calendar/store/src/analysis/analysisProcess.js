import {
  fetchLikeAnalysis,
  fetchDisLikeAnalysis,
  fetchFavouriteAnalysis,
  fetchUnFavouriteAnalysis,
  fetchShareAnalysis
} from "./service";
import {
  likeAnAnalysisInStore,
  disLikeAnAnalysisInStore,
  favouriteAnAnalysisInStore,
  unFavouriteAnAnalysisInStore,
  shareAnAnalysisInStore
} from "./actions";

const fetchingMap = {
  likeAnAnalysis: {},
  disLikeAnAnalysis: {},
  favouriteAnAnalysis: {},
  unFavouriteAnAnalysis: {},
  shareAnAnalysis: {}
};

export function generateAnalysisProcessActions({
  authenticated,
  popupAuthIfNotAuthenticated,
  dispatch
}) {
  function isValid({ analysisId }) {
    if (!analysisId) return;
    if (!authenticated) {
      popupAuthIfNotAuthenticated();
      return;
    }
    return true;
  }

  return {
    // likeAnAnalysis: async ({ analysisId }) => {
    //   if (isValid({ analysisId })) {
    //     if (fetchingMap.likeAnAnalysis[analysisId]) return;
    //     fetchingMap.likeAnAnalysis[analysisId] = true;
    //     try {
    //       await fetchLikeAnalysis({ analysisId });
    //       dispatch(likeAnAnalysisInStore({ analysisId }));
    //       fetchingMap.likeAnAnalysis[analysisId] = false;
    //     } catch (err) {
    //       fetchingMap.likeAnAnalysis[analysisId] = false;
    //     }
    //   }
    // },
    // disLikeAnAnalysis: async ({ analysisId }) => {
    //   if (isValid({ analysisId })) {
    //     if (fetchingMap.disLikeAnAnalysis[analysisId]) return;
    //     fetchingMap.disLikeAnAnalysis[analysisId] = true;
    //     try {
    //       await fetchDisLikeAnalysis({ analysisId });
    //       dispatch(disLikeAnAnalysisInStore({ analysisId }));
    //       fetchingMap.disLikeAnAnalysis[analysisId] = false;
    //     } catch (err) {
    //       fetchingMap.disLikeAnAnalysis[analysisId] = false;
    //     }
    //   }
    // },
    // favouriteAnAnalysis: async ({ analysisId }) => {
    //   if (isValid({ analysisId })) {
    //     if (fetchingMap.favouriteAnAnalysis[analysisId]) return;
    //     fetchingMap.favouriteAnAnalysis[analysisId] = true;
    //     try {
    //       await fetchFavouriteAnalysis({ analysisId });
    //       dispatch(favouriteAnAnalysisInStore({ analysisId }));
    //       fetchingMap.favouriteAnAnalysis[analysisId] = false;
    //     } catch (err) {
    //       fetchingMap.favouriteAnAnalysis[analysisId] = false;
    //     }
    //   }
    // },
    // unFavouriteAnAnalysis: async ({ analysisId }) => {
    //   if (isValid({ analysisId })) {
    //     if (fetchingMap.unFavouriteAnAnalysis[analysisId]) return;
    //     fetchingMap.unFavouriteAnAnalysis[analysisId] = true;
    //     try {
    //       await fetchUnFavouriteAnalysis({ analysisId });
    //       dispatch(unFavouriteAnAnalysisInStore({ analysisId }));
    //       fetchingMap.unFavouriteAnAnalysis[analysisId] = false;
    //     } catch (err) {
    //       fetchingMap.unFavouriteAnAnalysis[analysisId] = false;
    //     }
    //   }
    // },
    shareAnAnalysis: async ({ analysisId }) => {
      if (isValid({ analysisId })) {
        if (fetchingMap.shareAnAnalysis[analysisId]) return;
        fetchingMap.shareAnAnalysis[analysisId] = true;
        try {
          await fetchShareAnalysis({ analysisId });
          dispatch(shareAnAnalysisInStore({ analysisId }));
          fetchingMap.shareAnAnalysis[analysisId] = false;
        } catch (err) {
          fetchingMap.shareAnAnalysis[analysisId] = false;
        }
      }
    }
  };
}
