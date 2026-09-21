import { isAxiosError } from "axios";


export function getApiErrorMessage(error: unknown, fallbackMessage: string): string {
    if (isAxiosError<{message?: string | string[]}>(error)) {
        const message=error?.response?.data?.message;

        if(Array.isArray(message)) return message[0] as string ?? fallbackMessage;

        if(typeof message === 'string') return message ?? fallbackMessage;
    }

    return fallbackMessage;
}