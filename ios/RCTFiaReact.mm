#import "RCTFiaReact.h"
#import "FiaReact-Swift.h"

@implementation RCTFiaReact {
  FiaReact *fia;
}

- (id) init {
  if (self = [super init]) {
    fia = [FiaReact new];
  }
  return self;
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeFiaReactSpecJSI>(params);
}

- (void)initialize:(nonnull NSString *)merchantKey merchantAppId:(nonnull NSString *)merchantAppId {
  [fia initializeFor:merchantKey merchantAppId:merchantAppId];
}

- (void)otp:(nonnull NSString *)purpose phone:(nonnull NSString *)phone callback:(nonnull RCTResponseSenderBlock)callback {
  [fia otpFor:purpose phone:phone callback:callback];
}

- (void)validateOtp:(nonnull NSString *)transactionId otp:(nonnull NSString *)otp onError:(nonnull RCTResponseSenderBlock)onError onValidated:(nonnull RCTResponseSenderBlock)onValidated {
  [fia validateOtpFor:transactionId otp:otp onError:onError onValidated:onValidated];
}

- (void)validateHE:(nonnull NSString *)transactionId onError:(nonnull RCTResponseSenderBlock)onError onValidated:(nonnull RCTResponseSenderBlock)onValidated {
  [fia validateHEFor:transactionId onError:onError onValidated:onValidated];
}

- (void)listenToMiscall:(nonnull NSString *)transactionId callback:(nonnull RCTResponseSenderBlock)callback {
  [fia listenToMiscallFor:transactionId callback:callback];
}

- (void)forgetPromise:(nonnull NSString *)transactionId {
  [fia forgetPromiseFor:transactionId];
}

+ (NSString *)moduleName {
  return @"FiaReact";
}

@end
