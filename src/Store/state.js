const StoreState = {
  profile: {
    user: {},
    loadingUserInfo: false,
    UserInfoRequestError: ''
  },
  batches: {
    batchStatus: {},
    loadingStatus: false,
    errorStatus: '',
    isPolling: false
  }
};

export default StoreState