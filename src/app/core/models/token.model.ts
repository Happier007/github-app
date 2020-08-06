export class TokenModel {
    constructor(public access_token: string,
                public scope: string,
                public token_type: string) {

    }
}
