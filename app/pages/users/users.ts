import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {User} from '../../models/user';
import {GithubUsers} from '../../providers/github-users/github-users';
import {UserDetailsPage} from '../user-details/user-details';

@Component({
  templateUrl: 'build/pages/users/users.html',
  providers: [GithubUsers]
})
export class UsersPage {
  users: User[];

  constructor(private nav: NavController, private githubUsers: GithubUsers) {
    githubUsers
    .load()
    .then(users => this.users = users);
  }

  goToDetails(event, login) {
    this.nav.push(UserDetailsPage, {
      login: login
    });
  }

  searchUser(val) {
    let searchTerm = val.target.value;

    if(searchTerm.trim() === '' || searchTerm.trim().length  < 5){
      this.githubUsers.load()
        .then(users => this.users = users);
    } else {
      this.githubUsers.searchUsers(searchTerm)
        .then(users => this.users = users);
    }
  }
}
