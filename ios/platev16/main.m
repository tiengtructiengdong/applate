#import <UIKit/UIKit.h>
#import <Firebase.h>

#import "AppDelegate.h"

int main(int argc, char * argv[]) {
  @autoreleasepool {
    if ([FIRApp defaultApp] == nil) {
        [FIRApp configure];
      }
    return UIApplicationMain(argc, argv, nil, NSStringFromClass([AppDelegate class]));
  }
}
