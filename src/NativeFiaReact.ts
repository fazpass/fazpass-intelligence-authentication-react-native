import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  
  initialize(merchantKey: string, merchantAppId: string): void;

  otp(
    purpose: string,
    phone: string,
    callback: (promise: Object) => void
  ): void;

  validateOtp(
    transactionId: string,
    otp: string,
    onError: ((stackTrace: string) => void) | null,
    onValidated: () => void
  ): void;

  validateHE(
    transactionId: string,
    onError: ((stackTrace: string) => void) | null,
    onValidated: () => void
  ): void;

  listenToMiscall(
    transactionId: string,
    callback: (otp: string) => void
  ): void;

  forgetPromise(transactionId: string): void;
}

export default TurboModuleRegistry.getEnforcing<Spec>('FiaReact');
