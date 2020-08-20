export class OwnerModel {
  public login: string;
  public id: number;
  public nodeId: string;
  public avatarUrl: string;
  public gravatarId: string;
  public url: string;
  public htmlUrl: string;
  public followersUrl: string;
  public followingUrl: string;
  public gistsUrl: string;
  public starredUrl: string;
  public subscriptionsUrl: string;
  public organizationsUrl: string;
  public reposUrl: string;
  public eventsUrl: string;
  public receivedEventsUrl: string;
  public type: string;
  public siteAdmin: boolean;

  constructor(data: any = {}) {
    this.login = data.login || void 0;
    this.id = data.id || void 0;
    this.nodeId = data.nodeId || void 0;
    this.avatarUrl = data.avatarUrl || void 0;
    this.gravatarId = data.gravatarId || void 0;
    this.url = data.url || void 0;
    this.htmlUrl = data.htmlUrl || void 0;
    this.followersUrl = data.followersUrl || void 0;
    this.followingUrl = data.followingUrl || void 0;
    this.gistsUrl = data.gistsUrl || void 0;
    this.starredUrl = data.starredUrl || void 0;
    this.subscriptionsUrl = data.subscriptionsUrl || void 0;
    this.organizationsUrl = data.organizationsUrl || void 0;
    this.reposUrl = data.reposUrl || void 0;
    this.eventsUrl = data.eventsUrl || void 0;
    this.receivedEventsUrl = data.receivedEventsUrl || void 0;
    this.type = data.type || void 0;
    this.siteAdmin = data.siteAdmin || !!data.siteAdmin;
  }

}
