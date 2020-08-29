// ANGULAR
import { Component, Input, OnInit } from '@angular/core';

// CORE
import { Observable } from 'rxjs';

// CORE
import { StatisticsApiService } from '@core/services';
import { CommentsActivityModel, UserModel } from '@core/models';


@Component({
  selector: 'app-user-overview',
  templateUrl: './user-overview.component.html',
  styleUrls: ['./user-overview.component.scss']
})
export class UserOverviewComponent implements OnInit {

  @Input() user: UserModel;

  public commentsActivity$: Observable<CommentsActivityModel[]>;

  constructor(private _statisticsApiService: StatisticsApiService) {
  }

  public ngOnInit(): void {
    this._fetchStatistic();
  }

  private _fetchStatistic(): void {
    this.commentsActivity$ = this._statisticsApiService.getUserCommitActivity(this.user.login);
  }
}
