export class TokenModel {
    public accessToken: string;
    public scope: string;
    public tokenType: string;

    constructor(data: any = {}) {
        this.accessToken = data.accessToken || void 0;
        this.scope = data.scope || void 0;
        this.tokenType = data.tokenType || void 0;
    }
}
