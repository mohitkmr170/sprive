/**
 * @description It is a wrapper function which is used by each screen for sending firebase-analytics(google-analytics) events.
 */
import analytics from '@react-native-firebase/analytics';

/**
 * @description Tracking screen names
 * https://invertase.io/oss/react-native-firebase/v6/analytics/quick-start#tracking-screen-names
 * @param screen
 */
export async function _gaSetCurrentScreen(screen: string) {
  await analytics().setCurrentScreen(screen, screen);
}

/**
 * @description Custom events
 * https://invertase.io/oss/react-native-firebase/v6/analytics/quick-start#custom-events
 * @param event_name
 * @param payload
 */
export async function _gaLogEvent(event_name: string, payload: any) {
  await analytics().logEvent(event_name, payload);
}

/**
 * @description Attaching user data
 * https://invertase.io/oss/react-native-firebase/v6/analytics/quick-start#attaching-user-data
 * @param user_id
 */
export async function _gaSetUserId(user_id: string | null) {
  await analytics().setUserId(user_id);
}

/**
 * @description Resetting analytics data
 * https://invertase.io/oss/react-native-firebase/v6/analytics/quick-start#resetting-analytics-data
 */
export async function _gaResetAnalyticsData() {
  await analytics().resetAnalyticsData();
}
