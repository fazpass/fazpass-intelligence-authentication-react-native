
export type FiaVerificationStatus = {
    status: boolean
    message: string
    code: string
    data?: {
        is_verified: boolean
    }
}