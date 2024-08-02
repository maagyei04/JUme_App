declare module 'expo-speech-recognition' {
    export function startListeningAsync(options?: {
        partialResults?: boolean;
        language?: string;
    }, callback?: (result: RecognitionResult) => void): Promise<void>;

    export function stopListeningAsync(): Promise<void>;

    export function requestPermissionsAsync(): Promise<{ status: string }>;

    export interface RecognitionResult {
        transcriptions: string[];
        error?: string;
    }
}