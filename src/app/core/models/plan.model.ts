export class PlanModel {
  public name: string;
  public space: number;
  public collaborators: number;
  public privateRepos: number;

  constructor(data: any = {}) {
    this.name = data.name || void 0;
    this.space = data.space || void 0;
    this.collaborators = data.collaborators || void 0;
    this.privateRepos = data.privateRepos || void 0;
  }
}
