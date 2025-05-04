import FiaReact from './NativeFiaReact';
import { OtpSettings } from './objects/OtpSettings';

class FIA {

  /**
   * Initialize everything.
   *
   * Must be called once before calling any other methods.
   */
  initialize(merchantKey: string, merchantAppId: string): void {
    return FiaReact.initialize(merchantKey, merchantAppId);
  }

  /**
   * Creates an instance of `OtpSettings`.
   *
   * It can request an otp which you have to validate by yourself.
   */
  otp(): OtpSettings {
    // TODO: design communication between object
    return new OtpSettings();
  }
}

export default new FIA()