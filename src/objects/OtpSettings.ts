import FiaReact from '../NativeFiaReact';
import { OtpPurpose } from '../enums/OtpPurpose';
import { OtpPromise } from './OtpPromise';

export class OtpSettings {

  login(phone: string, callback: (promise: OtpPromise) => void) {
    FiaReact.otp(OtpPurpose.Login, phone, (promise) => callback(new OtpPromise(promise)));
  }

  register(phone: string, callback: (promise: OtpPromise) => void) {
    FiaReact.otp(OtpPurpose.Register, phone, (promise) => callback(new OtpPromise(promise)));
  }

  transaction(phone: string, callback: (promise: OtpPromise) => void) {
    FiaReact.otp(OtpPurpose.Transaction, phone, (promise) => callback(new OtpPromise(promise)));
  }

  forgetPassword(phone: string, callback: (promise: OtpPromise) => void) {
    FiaReact.otp(OtpPurpose.ForgetPassword, phone, (promise) => callback(new OtpPromise(promise)));
  }
}
