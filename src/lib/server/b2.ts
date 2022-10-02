const API_VERISON = 2;

export default class B2Client {
    applicationKeyId: string;
    applicationKey: string;
    apiUrl?: URL;

    constructor(config: { applicationKeyId: string; applicationKey: string }) {
        console.log(JSON.stringify(config));
        ({ applicationKeyId: this.applicationKeyId, applicationKey: this.applicationKey } = config);
    }

    async authorize() {
        const response = await fetch('https://api.backblazeb2.com/b2api/v2/b2_authorize_account', {
            method: 'GET',
            headers: new Headers({
                Authorization: btoa(`${this.applicationKeyId}:${this.applicationKey}`)
            })
        });

        const authorization: AuthorizationResponse = await response.json();

        return authorization;
    }
}

type CapabilityOptions =
    | 'listKeys'
    | 'writeKeys'
    | 'deleteKeys'
    | 'listBuckets'
    | 'writeBuckets'
    | 'deleteBuckets'
    | 'listFiles'
    | 'readFiles'
    | 'shareFiles'
    | 'writeFiles'
    | 'deleteFiles';

interface AuthorizationResponse {
    readonly accountId: string;
    readonly authorizationToken: string;
    readonly allowed: {
        readonly capabilities: Array<CapabilityOptions>;
        readonly bucketId?: string;
        readonly bucketName?: string;
        readonly namePrefix?: string;
    };
    apiUrl: string | URL;
    downloadUrl: string | URL;
    recommendedPartSize: number;
    absoluteMinimumPartSize: number;
    s3ApiUrl: string | URL;
}
