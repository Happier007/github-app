export interface IClient {
    client_id: string;
    redirect_uri: string;
    client_secret?: string;
    code?: string;
    login?: string;
}
