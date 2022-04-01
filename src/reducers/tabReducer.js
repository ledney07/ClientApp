import { TAB_REFRESH } from "../actions/types";

const initialState = {
  selected: 0,
};

export default function tabReducer(state = initialState, action) {
  switch (action.type) {
    case TAB_REFRESH:
      const { refreshSelected } = state;
      let oldSelected;
      if (action.payload === "/data_read_in" && refreshSelected !== 0)
        oldSelected = 0;
      else if (action.payload === "/qtl_analysis" && refreshSelected !== 1)
        oldSelected = 1;
      else if (action.payload === "/nqtl_analysis" && refreshSelected !== 2)
        oldSelected = 2;
      return {
        ...state,
        selected: oldSelected,
      };
    default:
      return state;
  }
}
