export class TokenModel {
    public access_token: string;
    public scope: string;
    public token_type: string;

    constructor(data: any = {}) {
        this.access_token = this.access_token || void 0;
        this.scope = this.scope || void 0;
        this.token_type = this.token_type || void 0;
    }
}
