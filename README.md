# fia-react

FIA React Native by Fazpass.
Visit [official website](https://fazpass.com) for more information about the product and see documentation at [github documentation](https://github.com/fazpass/fia-documentation/blob/main/README.ReactNative.md) for more technical details.

## Installation

```sh
npm install fia-react
```

## Usage

```ts
import FIA, { OtpPromise, OtpAuthType } from 'fia-react';

// initialize
FIA.initialize("MERCHANT_KEY", "MERCHANT_APP_ID");

// request OTP with login purpose
var otpPromise: OtpPromise
FIA.otp().login("PHONE", (promise) => {
    if (promise.hasException) {
        let exception = promise.exception
        // handle exception here
        return
    }
    otpPromise = promise
});

// check OTP authentication type
switch (otpPromise.authType) {
    case OtpAuthType.Message:
        // on message...
        break
    case OtpAuthType.Miscall:
        // on miscall...
        break
    case OtpAuthType.He:
        // on He...
        break
    case OtpAuthType.FIA:
        // on FIA...
        break
};

// validate Message or Miscall OTP
otpPromise.validate(
    "OTP", 
    (err) => {
        // on error
    },
    () => {
        // on validated
    }
);

// validate HE
otpPromise.validateHe(
    (err) => {
        // on error
    },
    () => {
        // on validated
    }
);
```

## License

[MIT](LICENSE)
