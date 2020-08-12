export class PlanModel {
    public name: string;
    public space: number;
    public collaborators: number;
    public private_repos: number;

    constructor(data: any = {}) {
        this.name = data.name || void 0;
        this.space = data.space || void 0;
        this.collaborators = data.collaborators || void 0;
        this.private_repos = data.private_repos || void 0;
    }
}
