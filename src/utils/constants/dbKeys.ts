export const DB_KEYS = {
  USER_INFO_NAME: 'response.data.name',
  USER_INFO: 'getUserInfo.response',
  USER_INFO_EMAIL: 'getUserInfo.response.data.email',
  RESPONSE_MESSAGE: 'response.message',
  NAVIGATION_PARAMS: 'state.params',
  ACCESS_DATA_TOKEN: 'response.data.accessToken',
  ACCESS_TOKEN: 'response.accessToken',
  IS_FETCHING: 'isFetching',
  IS_POLICY_UPDATE_RECEIVED: 'isPolicyUpdateReceived',
  META_TOTAL: 'response.meta.total',
  META_SKIP: 'response.meta.skip',
  TOTAL_INTEREST: 'response.data.totalInterest',
  AUTH_STATUS: 'status',
  IS_NOTIFICATION_RECEIVED: 'isNotificationReceived',
  CURRENT_USER_EMAIL: 'response.data.email',
  DATA_ID: 'response.data.id',
  DATA_OF_ZERO_ID: 'response.data[0].id',
  NEW_MORTGAGE_TERM: 'response.data[0].new_mortgage_term',
  GOAL_OVERPAYMENT: 'response.data[0].monthly_overpayment_amount',
  GOAL_INTEREST_SAVED: 'response.data[0].total_interest_saved',
  MORTGAGE_BALANCE: 'response.data[0].mortgage_balance',
  MORTGAGE_PAYMENT: 'response.data[0].mortgage_payment',
  MORTGAGE_TERM: 'response.data[0].mortgage_term',
  ERROR: 'error',
  FORM_MORTGAGE_MORTGAGE_AMOUNT: 'MortgageInput.values.mortgageAmount',
  FORM_MORTGAGE_TIMEPERIOD: 'MortgageInput.values.timePeriod',
  OUTSTANDING_MORTGAGE_BALANCE: 'response.data.outstanding_mortgage_balance',
  FORM_MORTGAGE_MONTHLY_MORTGAGE_AMOUNT:
    'MortgageInput.values.monthlyMortgagePayment',
  USER_ID: 'response.data.id', //Same
  BALANCE_AMOUNT: 'response.data.balance_amount',
  MONTHLY_TARGET: 'response.data.monthly_target',
  RESPONSE_DATA: 'response.data',
  CREATED_AT: 'response.data[0].createdAt',
  UPDATE_AT: 'response.data[0].updatedAt',
  SNACKBAR_ERRORS: 'response.data.errors',
  BE_EMAIL_ERROR: 'response.response.data.errors.email',
  BE_PASSWORD_ERROR: 'response.response.data.errors.password',
  RESPONSE: 'response',
  MORTGAGE_BALANCE_ERROR: 'response.response.data.errors.mortgage_balance',
  MORTGAGE_TERM_ERROR: 'response.response.data.errors.mortgage_term',
  MORTGAGE_PAYMENT_ERROR: 'response.response.data.errors.mortgage_payment',
  SIGNUP_PASSWORD: 'signup.values.password',
  SUCCESS: 'Success',
  VERIFICATION_ERROR_MESSAGE: 'response.response.data.message',
  ADDRESS_RESPONSE: 'response.data.address',
  USER_ADDRESS_ID: 'response.data.address.id',
  LTV: 'response.data[0].ltv',
  HOME_VALUATION: 'response.data[0].home_valuation',
  PROJECTED: {
    INTEREST_SAVING: 'response.data.projected_data.projected_interest_savings',
    YEARS_SAVED: 'response.data.projected_data.projected_time_savings.years',
    MONTHS_SAVED: 'response.data.projected_data.projected_time_savings.months',
  },
  PROJECTED_DATA: {
    PROJECTED_TIME_YEARS: 'response.data.projected_time_savings.years',
    PROJECTED_TIME_MONTHS: 'response.data.projected_time_savings.months',
    INTEREST_SAVING: 'response.data.projected_interest_savings',
    ESTIMATED_TIME_YEARS: 'response.data.projected_mortgage_free_in.years',
    ESTIMATED_TIME_MONTHS: 'response.data.projected_mortgage_free_in.months',
  },
  INTRO_CAROUSEL: {
    IMAGE: 'image',
    TITLE: 'title',
    SUB_TITLE: 'subTitle',
  },
  ERROR_MESSAGE: 'response.data.message',
  PAYMENT_HISTORY: {
    AMOUNT: 'amount',
    PAYMENT_DATE: 'payment_date',
    REFERENCE_NUMBER: 'reference_number',
    ID: 'id',
    IS_OVERPAYMENT: 'is_overpayment',
  },
  REPORT_ISSUE: {
    ISSUE_CATEGORY_BUG: 'Issue/Bug',
    ISSUE_CATEGORY_BUG_VALUE: 1,
    ISSUE_CATEGORY_LABEL_KEY: 'label',
    ISSUE_CATEGORY_ID_KEY: 'id',
    ISSUE_CATEGORY_VALUE_KEY: 'value',
  },
  VERIFICATION_FLOW: {
    IS_VERIFIED: 'data.is_verified',
    IS_BLOCKED: 'data.is_blocked',
    DATA_OF_IS_VERIFIED: 'response.data.is_verified',
    GET_USERO_INFO_ISBLOCKED: 'getUserInfo.response.data.is_blocked',
  },
  FORGOT_PASSWORD_EMAIL: 'forgotPassword.values.email',
  DEEPLINK_CONFIGS: {
    VERIFICATION_TOKEN: 'verification_token',
    PASSWORD_RESET_TOKEN: 'password_reset_key',
    FORGOT_PASSWORD: 'forgot_password',
    SCREEN: 'screen',
  },
  RESET_PASSWORD: {
    PASSWORD: 'password',
    CONFIRM_PASSWORD: 'confirmPassword',
    BLOCKED_TYPE: 'navigation.state.params.blockedType',
    PASSWORD_RESET: 'password_reset',
  },
  UPDATE_PASSWORD: {
    EXISTING_PASSWORD: 'exitingPassword',
    NEW_PASSWORD: 'newPassword',
    RETYPE_PASSWORD: 'retypePassword',
  },
  LOGIN_EMAIL: 'form.logIn.values.email',
  RESET_PASSWORD_FORM: 'resetPassword.values.password',
  UPDATE_PASSWORD_FORM: 'updatePassword.values.newPassword',
  FORM: {
    RESET_PASSWORD: 'resetPassword',
    UPDATE_PASSWORD: 'updatePassword',
  },
  USER_PROFILE: {
    FIRST_NAME: 'userProfile.values.firstName',
    LAST_NAME: 'userProfile.values.lastName',
    DOB: 'userProfile.values.dateOfBirth',
    ADDRESS: 'userProfile.values.address',
  },
  USER_PROFILE_VIEW_MODE: {
    FIRST_NAME: 'userProfileViewMode.values.firstName',
    LAST_NAME: 'userProfileViewMode.values.lastName',
    DOB: 'userProfileViewMode.values.dateOfBirth',
    ADDRESS: 'userProfileViewMode.values.address',
  },
  USER_ADDRESS: {
    FLAT_NUMBER: 'userAddress.values.flatNumber',
    STREET_NAME: 'userAddress.values.streetName',
    CITY: 'userAddress.values.city',
    POST_CODE: 'userAddress.values.postCode',
  },
  IS_BLOCKED: 'response.data.errors.is_blocked',
  USER_INFO_RESPONSE_IS_BLOCKED: 'response.response.data.errors.is_blocked',
  PUSH_NOTIFICATION: 'response.data.push_notification_id',
  ONE_SIGNAL_NOTIFICATION: {
    BODY: 'payload.body',
    ADDITIONAL_DATA: 'payload.additionalData',
    IS_APP_IN_FOCUS: 'isAppInFocus',
    RECEIVED: 'received',
    OPENED: 'opened',
    IDS: 'ids',
  },
  /*
  NOTES : This is to be refactored as per the branch `update/api-response`
  */
  PENDING_TASK: {
    IS_PENDING_TASK: 'response.data.is_pending_task',
    USER_INFO: {
      F_NAME: 'response.data.first_name',
      L_NAME: 'response.data.last_name',
      DATE_OF_BIRTH: 'response.data.dob',
      FIRST_NAME: 'getUserInfo.response.data.first_name',
      LAST_NAME: 'getUserInfo.response.data.last_name',
      DOB: 'getUserInfo.response.data.dob',
      ADDRESS: {
        CITY: 'response.data.address.city',
      },
    },
    OVERALL_PROGRESS_PERCENTAGE: 'response.data.overall_progress_percentage',
    TASKS: 'response.data.tasks',
    COMPLETION_PERCENTAGE: 'completion_percentage',
    TASK_STAGES: 'task_stages',
    TASK_ID: 'task_id',
    ID: 'id',
    STAGE_ID: 'stageId',
    TASK_NAME: 'tasks.name',
    TIME_TO_COMPLETE: 'time_to_complete',
  },
  GET_USER_INFO: {
    HOUSE_NUMBER: 'getUserInfo.response.data.address.house_number',
    STREET_NAME: 'getUserInfo.response.data.address.street_name',
    CITY: 'getUserInfo.response.data.address.city',
    POST_CODE: 'getUserInfo.response.data.address.post_code',
  },
  GET_ADDRESS: {
    DISPLAY_ADDRESS: 'display_address',
  },
};
