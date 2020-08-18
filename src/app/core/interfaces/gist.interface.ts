import { IFiles } from './files.interface';
import { IOwner } from './owner.interface';

export interface IGist {
  url: string;
  forksUrl: string;
  commitsUrl: string;
  id: string;
  nodeId: string;
  gitPullUrl: string;
  gitPushUrl: string;
  htmlUrl: string;
  files: IFiles;
  public: boolean;
  createdAt: string;
  updatedAt: string;
  description: string;
  comments: number;
  user: string;
  commentsUrl: string;
  owner: IOwner;
  truncated: boolean;
}


