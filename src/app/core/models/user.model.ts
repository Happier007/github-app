import { PlanModel } from './plan.model';

export class UserModel {
    public avatar_url: string;
    public bio: string;
    public blog: string;
    public collaborators: number;
    public company: string;
    public created_at: string;
    public disk_usage: number;
    public email: string;
    public events_url: string;
    public followers: number;
    public followers_url: string;
    public following: number;
    public following_url: string;
    public gists_url: string;
    public gravatar_id: string;
    public hireable: string;
    public html_url: string;
    public id: number;
    public location: string;
    public login: string;
    public name: string;
    public node_id: string;
    public organizations_url: string;
    public owned_private_repos: number;
    public plan: PlanModel;
    public private_gists: number;
    public public_gists: number;
    public public_repos: number;
    public received_events_url: string;
    public repos_url: string;
    public site_admin: boolean;
    public starred_url: string;
    public subscriptions_url: string;
    public total_private_repos: number;
    public two_factor_authentication: boolean;
    public type: string;
    public updated_at: string;
    public url: string;

    constructor(data: any = {}) {
        this.avatar_url = data.avatar_url || void 0;
        this.bio = data.bio || void 0;
        this.blog = data.blog || void 0;
        this.collaborators = data.collaborators || void 0;
        this.company = data.company || void 0;
        this.created_at = data.created_at || void 0;
        this.disk_usage = data.disk_usage || void 0;
        this.email = data.email || void 0;
        this.events_url = data.events_url || void 0;
        this.followers = data.followers || void 0;
        this.followers_url = data.followers_url || void 0;
        this.following = data.following || void 0;
        this.following_url = data.following_url || void 0;
        this.gists_url = data.gists_url || void 0;
        this.gravatar_id = data.gravatar_id || void 0;
        this.hireable = data.hireable || void 0;
        this.html_url = data.html_url || void 0;
        this.id = data.id || void 0;
        this.location = data.location || void 0;
        this.login = data.login || void 0;
        this.name = data.name || void 0;
        this.node_id = data.node_id || void 0;
        this.organizations_url = data.organizations_url || void 0;
        this.owned_private_repos = data.owned_private_repos || void 0;
        this.plan = data.plan || void 0;
        this.private_gists = data.private_gists || void 0;
        this.public_gists = data.public_gists || void 0;
        this.public_repos = data.public_repos || void 0;
        this.received_events_url = data.received_events_url || void 0;
        this.repos_url = data.repos_url || void 0;
        this.site_admin = data.site_admin || void 0;
        this.starred_url = data.starred_url || void 0;
        this.subscriptions_url = data.subscriptions_url || void 0;
        this.total_private_repos = data.total_private_repos || void 0;
        this.two_factor_authentication = data.two_factor_authentication || void 0;
        this.type = data.type || void 0;
        this.updated_at = data.updated_at || void 0;
        this.url = data.url || void 0;
    }
}
