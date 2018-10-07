/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"
#import <React/RCTBundleURLProvider.h>

#import "RCCManager.h"

#import <React/RCTRootView.h>
#import <AVFoundation/AVFoundation.h>
UIBackgroundTaskIdentifier _bgTaskId;
@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSURL *jsCodeLocation;
#ifdef DEBUG
  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
  
  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  self.window.backgroundColor = [UIColor whiteColor];
  [[RCCManager sharedInstance] initBridgeWithBundleURL:jsCodeLocation launchOptions:launchOptions];
  return YES;
}

-(void)applicationWillResignActive:(UIApplication *)application
{
  //开启后台处理多媒体事件
  [[UIApplication sharedApplication] beginReceivingRemoteControlEvents];
  AVAudioSession *session=[AVAudioSession sharedInstance];
  [session setActive:YES error:nil];
  //后台播放
  [session setCategory:AVAudioSessionCategoryPlayback error:nil];
  //这样做，可以在按home键进入后台后 ，播放一段时间，几分钟吧。但是不能持续播放网络歌曲，若需要持续播放网络歌曲，还需要申请后台任务id，具体做法是：
  _bgTaskId=[AppDelegate backgroundPlayerID:_bgTaskId];
  //其中的_bgTaskId是后台任务UIBackgroundTaskIdentifier _bgTaskId;在appdelegate.m中定义的全局变量
}

+(UIBackgroundTaskIdentifier)backgroundPlayerID:(UIBackgroundTaskIdentifier)backTaskId
{
  //设置并激活音频会话类别
  AVAudioSession *session=[AVAudioSession sharedInstance];
  [session setCategory:AVAudioSessionCategoryPlayback
                 error:nil];
  [session setActive:YES error:nil];
  //允许应用程序接收远程控制
  [[UIApplication sharedApplication] beginReceivingRemoteControlEvents];
  //设置后台任务ID
  UIBackgroundTaskIdentifier newTaskId=UIBackgroundTaskInvalid;
  newTaskId=[[UIApplication sharedApplication] beginBackgroundTaskWithExpirationHandler:nil];
  if(newTaskId!=UIBackgroundTaskInvalid&&backTaskId!=UIBackgroundTaskInvalid)
  {
    [[UIApplication sharedApplication] endBackgroundTask:backTaskId];
  }
  return newTaskId;
}

////-->在通知中心注册一个事件中断的通知：
////处理中断事件的通知
//[[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(handleInterreption:) name:AVAudioSessionInterruptionNotification object:[AVAudioSession sharedInstance]];
////-->实现接收到中断通知时的方法
////处理中断事件
//-(void)handleInterreption:(NSNotification *)sender
//{
//    if(_played)
//    {
//      [self.playView.player pause];
//        _played=NO;
//    }
//    else
//    {
//        [self.playView.player play];
//        _played=YES;
//    }
//}

@end
