export class QueryParamsModel {
    public page: string;
    public per_page: string;
    public q?: string;

    constructor(data: any = {}) {
        this.page = data.pageIndex || '0';
        this.per_page = data.pageSize || '1';
        this.q = data.q || void 0;
    }
}
