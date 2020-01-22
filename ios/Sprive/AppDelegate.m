/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

@import Firebase;
#import "AppDelegate.h"

#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <React/RCTLinkingManager.h>
#import "RNSplashScreen.h"
#import <CodePush/CodePush.h>

@implementation AppDelegate
@synthesize oneSignal = _oneSignal;

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSURL *jsCodeLocation;
  self.oneSignal = [[RCTOneSignal alloc] initWithLaunchOptions:launchOptions
                                                       appId:@"ce763fbb-0f60-4f44-b709-30eedbf62388"];
  if ([FIRApp defaultApp] == nil) {
      [FIRApp configure];
  }
  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                   moduleName:@"Sprive"
                                            initialProperties:nil];

  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  [RNSplashScreen show];
  return YES;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  return [CodePush bundleURL];
#endif
}
- (BOOL)application:(UIApplication *)app openURL:(NSURL *)url
            options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options
{
  BOOL handled = NO;
  FIRDynamicLink *dynamicLink = [[FIRDynamicLinks dynamicLinks]   
      dynamicLinkFromCustomSchemeURL:url];
    if (dynamicLink) {
      if (dynamicLink.url) {
        handled = [RCTLinkingManager application:app
          openURL:dynamicLink.url options:options];
          // || [[RNFirebaseLinks instance] application:application 
          // openURL:dynamicLink.url options:options];
        }
    }
  if(!handled) {
    handled = [RCTLinkingManager application:app openURL:url
        options:options];
  }
  return handled;
  // return [RCTLinkingManager application:app openURL:url options:options];
}
//*********************Dynamic Linking Section********************
- (BOOL)application:(UIApplication *)application
continueUserActivity:(nonnull NSUserActivity *)userActivity
 restorationHandler:
#if defined(__IPHONE_12_0) && (__IPHONE_OS_VERSION_MAX_ALLOWED >= __IPHONE_12_0)
(nonnull void (^)(NSArray<id<UIUserActivityRestoring>> *_Nullable))restorationHandler {
#else
    (nonnull void (^)(NSArray *_Nullable))restorationHandler {
#endif  // __IPHONE_12_0
  BOOL handled = [[FIRDynamicLinks dynamicLinks] handleUniversalLink:userActivity.webpageURL
                                                          completion:^(FIRDynamicLink * _Nullable dynamicLink,
                                                                       NSError * _Nullable error) {
                                                            // ...
                                                          }];
  return handled;
  // BOOL handled = [[FIRDynamicLinks dynamicLinks]
  //     handleUniversalLink:userActivity.webpageURL
  //     completion:^(FIRDynamicLink * _Nullable dynamicLink,
  //     NSError * _Nullable error) {
  //   if (!error) {
  //     [RCTLinkingManager application:application
  //           openURL:dynamicLink.url options:nil];
  //     // [[RNFirebaseLinks instance] application:application 
  //     //       openURL:dynamicLink.url options:nil];
  //    }
  // }];
  // if(!handled) {
  // handled = [RCTLinkingManager application:application 
  //      continueUserActivity:userActivity 
  //      restorationHandler:restorationHandler];
  // }
  // return handled;
}

@end
