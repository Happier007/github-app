// ANGULAR
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-gist-detail',
  templateUrl: './gist-detail.component.html',
  styleUrls: ['./gist-detail.component.scss']
})
export class GistDetailComponent implements OnInit {

  constructor(private _location: Location) {
  }

  ngOnInit() {
  }

  public goBack(): void {
    this._location.back();
  }
}
