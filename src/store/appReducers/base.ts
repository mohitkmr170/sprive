import {createAction, handleActions} from 'redux-actions';

export class AppStoreData {
  constructor(name: string) {
    this.name = name;
    this.initialState = {
      data: null,
    };

    this.actions = {
      save: createAction(`Save_${this.name}`),
      clear: createAction(`Clear_${this.name}`),
    };

    this.reducers = handleActions(
      {
        [this.actions.save]: (state, action) => ({
          ...state,
          data: action.payload,
        }),
        [this.actions.clear]: state => ({
          ...state,
          data: null,
        }),
      },

      this.initialState,
    );
  }
}
