export class ApiUrls{
    static readonly WORDLIST_URL: string = "Words";
        static readonly WORDLIST_ACTION_URL_GET_WORD_TYPES: string = "GetWordTypes";
        static readonly WORDLIST_ACTION_URL_GET_WORDS: string = "GetWordsList";
        static readonly WORDLIST_ACTION_URL_CREATE: string = "CreateWordList";
        static readonly WORDLIST_ACTION_URL_REMOVE: string = "RemoveWordsList";
        static readonly WORDLIST_ACTION_URL_MODIFY: string = "ModifyWordList";
        static readonly WORDLIST_ACTION_URL_COUNT_WORD_BY_TYPE: string = "GetWordCountByWordType";
        
    static readonly S3_URL: string = "S3";
        static readonly S3_ACTION_URL_REGISTER: string = "UploadImage";

    static readonly OPENAI_URL: string = "OpenAi";
        static readonly OPENAI_ACTION_URL_GET_ANSWERS: string = "GetAnswers";
}