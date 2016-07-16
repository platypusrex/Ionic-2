import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import {Repo} from '../../models/repo';
import {User} from '../../models/user';

@Injectable()
export class GithubRepos {
  githubRepos: any = null;

  constructor(private http: Http) {}

  load() {
    if (this.githubRepos) {
      // already loaded data
      return Promise.resolve(this.githubRepos);
    }

    // don't have the data yet
    return new Promise(resolve => {
      this.http.get('https://api.github.com/repositories')
        .map(res => <Array<Repo>>(res.json()))
        .subscribe(repos => {
          this.githubRepos = repos;
          resolve(this.githubRepos);
        });
    });
  }

  loadDetails(username, reponame) {
    return new Promise(resolve => {
      this.http.get(`https://api.github.com/repos/${username}/${reponame}`)
        .map(res => <Array<User>>(res.json()))
        .subscribe(repo => {
          resolve(repo);
      });
    });
  }

  searchRepos(username) {
    return new Promise(resolve => {
      this.http.get(`https://api.github.com/users/${username}/repos`)
        .map(res => <Array<Repo>>(res.json()))
        .subscribe(repos => {
           resolve(repos);
        });
    });
  }
}

