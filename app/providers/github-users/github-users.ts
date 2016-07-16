import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import {User} from '../../models/user';

@Injectable()
export class GithubUsers {
  githubUsers: any = null;

  constructor(public http: Http) {}

  load() {
    if (this.githubUsers) {
      // already loaded data
      return Promise.resolve(this.githubUsers);
    }

    // don't have the data yet
    return new Promise(resolve => {
      this.http.get('https://api.github.com/users')
        .map(res => <Array<User>>(res.json()))
        .subscribe(users => {
          this.githubUsers = users;
          resolve(this.githubUsers);
        });
    });
  }

  loadDetails(login: string) {
    return new Promise (resolve => {
      this.http.get(`https://api.github.com/users/${login}`)
        .map(res => <Array<User>>(res.json()))
        .subscribe(user => {
           resolve(user);
        });
    });
  }

  searchUsers(searchParam: string) {
    return new Promise<Array<User>> (resolve => {
      this.http.get(`https://api.github.com/search/users?q=${searchParam}`)
        .map(res => <Array<User>>(res.json().items))
        .subscribe(users => {
          resolve(users);
        })
    });
  }
}

