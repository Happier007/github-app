export interface IClient {
    clientId: string;
    redirectUri: string;
    clientSecret?: string;
    code?: string;
    login?: string;
}
