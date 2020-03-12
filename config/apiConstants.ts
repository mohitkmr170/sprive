export default {
  BASE_HEADER: {
    'Content-Type': 'application/json',
  },
  TIMEOUT: 20000,
  API_END_POINT_PREFIX: '/api',
  API_VERSION: '/v1',
  API_END_POINTS: {
    INTEREST_CALCULATOR: '/cumulative-interest-calculator',
    GET_USER_INFO: '/get-user-info',
    LOGIN: '/authentication',
    SIGNUP: '/register',
    USER_MORTGAGE: '/mortgage',
    UPDATE_MORTGAGE: '/update-mortgage',
    GOAL: '/goal',
    GET_GRAPH_DATA: '/monthly-payment-record',
    OVERPAYMENT: '/overpayment',
    ISSUE_CATEGORY: '/issue-category',
    ISSUES: '/issues',
    GET_PROJECTED_DATA: '/projected-data',
    VERIFY_EMAIL: '/verify-email',
    RESEND_EMAIL: '/send-verification-link',
    RESET_PASSWORD_LINK: '/send-reset-password-link',
    RESET_PASSWORD: '/reset-password',
    PUSH_NOTIFICATION: '/push-notification',
    PENDING_TASK: '/pending-tasks',
    GET_ADDRESS: '/get-address',
    TASK_HANDLER: '/task-handler',
    GET_USER_ADDRESS: '/addresses',
    UPDATE_USER_PROFILE: '/users',
    OUTSTANDING_MORTGAGE_BALABCE: '/outstanding-mortgage-balance-calculator',
  },
};
