import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import {GithubRepos} from '../../providers/github-repos/github-repos';
import {Repo} from '../../models/repo';

@Component({
  templateUrl: 'build/pages/repo-details/repo-details.html',
  providers: [GithubRepos]
})
export class RepoDetailsPage {
  repoName: string;
  userName: string;
  repo = null;

  constructor(private nav: NavController, navParams: NavParams, githubRepos: GithubRepos) {
    this.repoName = navParams.get('repoName');
    this.userName = navParams.get('userName');

    githubRepos.loadDetails(this.userName, this.repoName)
      .then(repo => this.repo = repo);
  }

}
