import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getUser(githubUsername: string) {
    return this.httpClient.get(`https://api.github.com/users/${githubUsername}`);
  }
  getUserRepo(repos_url: string) {
    return this.httpClient.get(repos_url);
  }
  getUserRepoLanguages(repos_url: string) {
    console.log(repos_url);
    return this.httpClient.get(repos_url);
  }

  // implement getRepos method by referring to the documentation. Add proper types for the return type and params 
}
