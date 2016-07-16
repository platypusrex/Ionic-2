import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import {GithubOrganizations} from '../../providers/github-organizations/github-organizations';

@Component({
  templateUrl: 'build/pages/organization-details/organization-details.html',
  providers: [GithubOrganizations]
})
export class OrganizationDetailsPage {
  login: string;
  org = null;

  constructor(private nav: NavController, navParams: NavParams, githubOrgs: GithubOrganizations) {
    this.login = navParams.get('login');

    githubOrgs.loadDetails(this.login)
      .then(org => this.org = org);
  }

}
