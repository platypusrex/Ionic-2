import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import {GithubUsers} from '../../providers/github-users/github-users';
import {User} from '../../models/user';

@Component({
  templateUrl: 'build/pages/user-details/user-details.html',
  providers: [GithubUsers]
})
export class UserDetailsPage {
  login: string;
  user = null;

  constructor(private nav: NavController, navParams: NavParams, githubUsers: GithubUsers) {
    this.login = navParams.get('login');

    githubUsers.loadDetails(this.login)
      .then(user => this.user = user);
  }
}
