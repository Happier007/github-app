export class TokenModel {
    public access_token: string;
    public scope: string;
    public token_type: string;

    constructor(data: any = {}) {
        this.access_token = data.access_token || void 0;
        this.scope = data.scope || void 0;
        this.token_type = data.token_type || void 0;
    }
}
