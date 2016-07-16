import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {Repo} from '../../models/repo';
import {GithubRepos} from '../../providers/github-repos/github-repos';
import {RepoDetailsPage} from '../repo-details/repo-details';

@Component({
  templateUrl: 'build/pages/repos/repos.html',
  providers: [GithubRepos]
})
export class ReposPage {
  repos: any;


  constructor(private nav: NavController, private githubRepos: GithubRepos) {
    this.githubRepos.load()
      .then(repos => this.repos = repos);
  }

  goToDetails(event, repo) {
    this.nav.push(RepoDetailsPage, {
      repoName: repo.name,
      userName: repo.owner.login
    });
  }

  searchRepos(val) {
    let searchTerm = val.target.value;
    console.log(searchTerm);
    if(searchTerm.trim() === '' || searchTerm.trim().length  < 5){
      this.githubRepos.load()
          .then(repos => this.repos = repos);
    } else {
      this.githubRepos.searchRepos(searchTerm)
          .then(repos => this.repos = repos);
    }
  }
}
