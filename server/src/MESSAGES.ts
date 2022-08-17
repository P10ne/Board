const MESSAGES = {
    COMMON: {
        UNEXPECTED_ERROR: 'Unexpected error',
        INSTANCE_NOT_FOUND: 'Instance not found'
    },
    AUTH: {
        INPUT_IS_INCORRECT: 'Email or password is incorrect',
        FINGERPRINT_IS_WRONG: 'Fingerprint is wrong',
        TOKEN_IS_NOT_VALID: 'Token is not valid'
    }
}

export type TMessages = typeof MESSAGES;

export default MESSAGES;
