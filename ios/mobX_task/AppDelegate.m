/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"

#import "RNNotifications.h"
#import "RNCPushNotificationIOS.h"
#import "UserNotifications/UserNotifications.h"

#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>

#import "GoogleMaps/GoogleMaps.h"
#import "GooglePlaces/GooglePlaces.h"

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  [GMSServices provideAPIKey:@"AIzaSyAuKr8SQ2YiI0bkKjgbH27SbKdRENpOETw"];
  [GMSPlacesClient provideAPIKey:@"AIzaSyAuKr8SQ2YiI0bkKjgbH27SbKdRENpOETw"];
  
  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                   moduleName:@"mobX_task"
                                            initialProperties:nil];

  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  
  if ([application respondsToSelector:@selector(registerUserNotificationSettings:)]) {
         NSLog(@"Requesting permission for push notifications..."); // iOS 8
         UIUserNotificationSettings *settings = [UIUserNotificationSettings settingsForTypes:
             UIUserNotificationTypeAlert | UIUserNotificationTypeBadge |
             UIUserNotificationTypeSound categories:nil];
         [UIApplication.sharedApplication registerUserNotificationSettings:settings];
     } else {
         NSLog(@"Registering device for push notifications..."); // iOS 7 and earlier
         [UIApplication.sharedApplication registerForRemoteNotificationTypes:
             UIRemoteNotificationTypeAlert | UIRemoteNotificationTypeBadge |
             UIRemoteNotificationTypeSound];
     }
     return YES;
 
  return YES;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

- (void)application:(UIApplication *)application
    didRegisterUserNotificationSettings:(UIUserNotificationSettings *)settings
{
    NSLog(@"Registering device for push notifications..."); // iOS 8
    [application registerForRemoteNotifications];
}

- (void)application:(UIApplication *)application
    didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)token
{
    NSLog(@"Registration successful, bundle identifier: %@, mode: %@, device token: %@",
        [NSBundle.mainBundle bundleIdentifier], [self modeString], token);
}

- (void)application:(UIApplication *)application
    didFailToRegisterForRemoteNotificationsWithError:(NSError *)error
{
    NSLog(@"Failed to register: %@", error);
}

- (void)application:(UIApplication *)application handleActionWithIdentifier:(NSString *)identifier
    forRemoteNotification:(NSDictionary *)notification completionHandler:(void(^)())completionHandler
{
    NSLog(@"Received push notification: %@, identifier: %@", notification, identifier); // iOS 8
    completionHandler();
}

- (void)application:(UIApplication *)application
    didReceiveRemoteNotification:(NSDictionary *)notification
{
    NSLog(@"Received push notification: %@", notification); // iOS 7 and earlier
}

- (NSString *)modeString
{
#if DEBUG
    return @"Development (sandbox)";
#else
    return @"Production";
#endif
}
@end
