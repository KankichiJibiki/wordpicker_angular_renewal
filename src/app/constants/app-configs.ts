export class AppConfigs{
    // Error
    static readonly BAD_REQUEST: number = 400;
    static readonly AUTH_ERROR: number = 401;
    static readonly INTERNAL_SERVER_ERROR: number = 500;

    //* AWS Cognito
    static readonly POOLID: String = "ap-northeast-1_HKaBEvlqi";
    static readonly POOL_CLIENT_ID: String = "1akr62cvj6trnh8de8crs1rfes";

    //* AWS S3
    static readonly S3_WORD_PICKER_BUCKET_NAME: string = "wordpicker-storage";
    static readonly S3_USER_ICON_KEY: string = "user-icon";
}