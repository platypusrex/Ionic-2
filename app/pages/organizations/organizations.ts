import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {Organization} from '../../models/organization';
import {GithubOrganizations} from '../../providers/github-organizations/github-organizations';
import {OrganizationDetailsPage} from '../organization-details/organization-details';

@Component({
  templateUrl: 'build/pages/organizations/organizations.html',
  providers: [GithubOrganizations]
})
export class OrganizationsPage {
  orgs: any = null;

  constructor(private nav: NavController, private githubOrgs: GithubOrganizations) {
    githubOrgs.load()
      .then(orgs => this.orgs = orgs);
  }

  goToDetails(login) {
    this.nav.push(OrganizationDetailsPage, {login: login})
  }

  searchOrgs(val) {
    let searchTerm = val.target.value;
    console.log(searchTerm);
    if(searchTerm.trim() === '' || searchTerm.trim().length < 5){
      this.githubOrgs.load()
        .then(orgs => this.orgs = orgs);
    } else {
      this.githubOrgs.loadDetails(searchTerm)
        .then(orgs => this.orgs = orgs);
    }
  }
}
