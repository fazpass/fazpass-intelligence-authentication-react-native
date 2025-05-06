import FIA, { OtpPromise } from "fia-react"
import type { FiaVerificationStatus } from "./data_objects/FiaVerificationStatus"

export class FiaService {

    private constructor() {}
    private static readonly instance = new FiaService()
    static getInstance(): FiaService { return FiaService.instance }
    
    private readonly MERCHANT_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGlmaWVyIjo5NzcwfQ.RTOdNJK-P3iKnVOP8m_xnCet7OcuG5GETdYlPM0FIpo"
    private readonly MERCHANT_APP_ID = "1e51f4e5-227d-4ff4-b4db-ccf33465727d"

    lastPromise?: OtpPromise
    phone?: string

    initialize() {
        FIA.initialize(this.MERCHANT_KEY, this.MERCHANT_APP_ID)
    }

    requestOtp(
        phone: string, 
        onError: (err?: string) => void,
        onSuccess: () => void
    ) {
        FIA.otp().login(phone, async (promise) => {
            if (promise.hasException) {
                onError(promise.exception)
                return
            }
            this.phone = phone
            this.lastPromise = promise
            onSuccess()
        })
    }

    validateOtp(
        otp: string,
        onError: (err?: string) => void,
        onSuccess: () => void
    ) {
        this.lastPromise?.validate(otp, onError, async () => {
            try {
                let status = await this.checkVerificationStatus(this.lastPromise!.transactionId)
                if (status) onSuccess()
                else onError('Failed to verify user.')
            } catch (e) {
                onError(e as string)
            }
            this.lastPromise!.clean()
        })
    }

    validateHe(
        onError: (err?: string) => void,
        onSuccess: () => void
    ) {
        this.lastPromise?.validateHE(onError, async () => {
            try {
                let status = await this.checkVerificationStatus(this.lastPromise!.transactionId)
                if (status) onSuccess()
                else onError('Failed to verify user.')
            } catch (e) {
                onError(e as string)
            }
            this.lastPromise!.clean()
        })
    }

    private async checkVerificationStatus(transactionId: string): Promise<boolean> {
        let response = await fetch(`https://api.fazpass.com/v1/otp/fia/verification-status/${transactionId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.MERCHANT_KEY
            }
        })
        let json = await response.json()
        let status = json as FiaVerificationStatus
        
        if (status.data == null) {
            throw status.message
        }
        return status.data.is_verified
    }
}

