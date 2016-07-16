import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import {Organization} from '../../models/organization';

@Injectable()
export class GithubOrganizations {
  orgs: any = null;

  constructor(private http: Http) {}

  load() {
    if (this.orgs) {
      // already loaded data
      return Promise.resolve(this.orgs);
    }

    // don't have the data yet
    return new Promise(resolve => {
      this.http.get('https://api.github.com/organizations')
        .map(res => <Array<Organization>>(res.json()))
        .subscribe(orgs => {
          this.orgs = orgs;
          resolve(this.orgs);
        });
    });
  }

  loadDetails(org: string) {
    return new Promise(resolve => {
      this.http.get(`https://api.github.com/orgs/${org}`)
        .map(res => <Array<Organization>>(res.json()))
        .subscribe(org => {
           resolve(org);
        });
    })
  }
}

