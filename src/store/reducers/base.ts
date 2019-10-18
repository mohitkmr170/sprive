import {createAction, handleActions} from 'redux-actions';

export class StoreFetchableData {
  constructor(name: any, apiService: any) {
    this.name = name;
    this.apiService = apiService;

    this.initialState = {
      isFetching: false,
      response: null,
      error: false,
    };

    this.actions = {
      fetch: createAction(`FETCH_${this.name}`),
      response: createAction(`RESPONSE_${this.name}`),
      error: createAction(`ERROR_${this.name}`),
      clear: createAction(`CLEAR_${this.name}`),
    };

    this.reducers = handleActions(
      {
        [this.actions.fetch]: state => ({...state, isFetching: true}),
        [this.actions.response]: (state, action) => ({
          ...state,
          isFetching: false,
          response: action.payload,
          error: false,
        }),
        [this.actions.error]: (state, action) => ({
          ...state,
          isFetching: false,
          error: true,
          response: action.payload,
        }),
        [this.actions.clear]: state => ({
          ...state,
          isFetching: false,
          error: false,
          response: null,
        }),
      },
      this.initialState,
    );
  }

  fetchData(data: any, moreData: any) {
    const that = this;
    return new Promise((resolve, reject) => {
      that
        .apiService(data, moreData)
        .then(response => {
          resolve(response);
        })
        .catch(err => reject(err));
    });
  }
}
