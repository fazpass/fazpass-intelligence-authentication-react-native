import { OtpAuthType } from '../enums/OtpAuthType';
import FiaReact from '../NativeFiaReact';

type OtpPromiseType = {
    transactionId: string
    authType: string
    hasException: boolean
    exception?: string
    digitCount?: number
}

export class OtpPromise {
    transactionId: string
    authType: OtpAuthType
    hasException: boolean
    exception?: string
    digitCount?: number

    constructor(obj: Object) {
        let fromType = obj as OtpPromiseType
        this.transactionId = fromType.transactionId
        this.hasException = fromType.hasException
        this.exception = fromType.exception
        this.digitCount = fromType.digitCount
        
        switch (fromType.authType) {
            case "Message": 
                this.authType = OtpAuthType.Message
                break
            case "Miscall":
                this.authType = OtpAuthType.Miscall
                break
            case "He":
                this.authType = OtpAuthType.He
                break
            case "FIA":
                this.authType = OtpAuthType.FIA
                break
            default:
                this.authType = OtpAuthType.Message
                break
        }
    }

    validate(
        otp: string,
        onError: ((stackTrace: string) => void) | null,
        onValidated: () => void
    ) {
        FiaReact.validateOtp(
            this.transactionId,
            otp,
            onError,
            onValidated
        )
    }

    validateHE(
        onError: ((stackTrace: string) => void) | null,
        onValidated: () => void
    ) {
        FiaReact.validateHE(
            this.transactionId,
            onError,
            onValidated
        )
    }

    listenToMiscall(
        callback: (otp: string) => void
    ) {
        FiaReact.listenToMiscall(
            this.transactionId,
            callback
        )
    }

    /**
     * Clean this object from memory.
     * 
     * Call this method when this object is not used anymore.
     */
    clean() {
        FiaReact.forgetPromise(this.transactionId)
    }
}