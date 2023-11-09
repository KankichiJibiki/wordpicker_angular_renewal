export class AppConfigs{
    // Error
    static readonly SUCCESS: number = 200;
    static readonly BAD_REQUEST: number = 400;
    static readonly AUTH_ERROR: number = 401;
    static readonly INTERNAL_SERVER_ERROR: number = 500;

    //* AWS Cognito
    static readonly POOLID: string = "ap-northeast-1_ESjt6XGLR";
    static readonly POOL_CLIENT_ID: string = "lo5pn58onmf37bfgb04fa4hc7";

    //* Local storage Key
    static readonly USERNAME_KEY: string = "username";

    //* AWS S3
    static readonly S3_WORD_PICKER_BUCKET_NAME: string = "wordpicker-storage";
    static readonly S3_USER_ICON_KEY: string = "user-icon";
    static readonly S3_AUDIO_FILE_KEY: string = "audio-file";

    //* ChatGpt constant message
    static CHATGPT_DIRECT_JSON_FORMAT: string = "and please return only an answer that is in json format.";
}