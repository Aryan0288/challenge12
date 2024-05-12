import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import { catchError, forkJoin, of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  // });
  // this.apiService.getUserRepo(this.userData.repos_url).subscribe(console.log)
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  userData: any;
  repoData: any
  repoLanguageData: any

  constructor(
    public apiService: ApiService
  ) { }

  ngOnInit() {
    // this.apiService.getUser('Aryan0288').subscribe(console.log)
    // this.apiService.getUser('Aryan0288').subscribe(data => {
    //   this.userData = data; // Assign the data to the property
    // });
    // this.apiService.getUserRepo(this.userData.repos_url).subscribe(console.log)
    var name=prompt("Enter your Github name: ");
    
    this.apiService.getUser(name || "Aryan0288").subscribe(data => {
      console.log(data); // Log the user data
      this.userData = data; // Assign the data to the property

      // Once user data is fetched, fetch user repositories using the repos_url
      this.apiService.getUserRepo(this.userData.repos_url).subscribe(repos => {
        console.log(repos); // Log the user repositories
        // Handle the repositories data as needed
        this.repoData = repos
        // this.apiService.getUserRepoLanguages(this.repoData.languages_url).subscribe(lan => {
        //   console.log(lan);
        //   this.repoLanguageData = lan || "not language"
        // })
        // if (this.repoData && this.repoData.languages_url) {
        //   this.apiService.getUserRepoLanguages(this.repoData.languages_url).subscribe(lan => {
        //     console.log(lan);
        //     this.repoLanguageData = lan;
        //   });
        // } else {
        //   console.log("Languages URL is not available");
        //   this.repoLanguageData = "not language";
        // }


        const observables = [];

        // Create observables for fetching languages data for each repository
        for (const repo of this.repoData) {
          if (repo.languages_url) {
            observables.push(
              this.apiService.getUserRepoLanguages(repo.languages_url)
                // Use catchError from 'rxjs/operators' to handle errors
                .pipe(
                  catchError(error => {
                    console.error(`Failed to fetch languages for repo: ${repo.name}`, error);
                    return of("not language");
                  })
                )
            );
          }
        }

        // Combine all observables and subscribe
        forkJoin(observables).subscribe(languagesData => {
          console.log(languagesData);
          this.repoLanguageData = languagesData;
        });

      });
    });




  }
  getApiService() {
    return this.apiService;
  }
}
