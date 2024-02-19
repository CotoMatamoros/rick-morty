import { Injectable } from '@angular/core';
import { Apollo, gql} from 'apollo-angular';
import { BehaviorSubject, from } from 'rxjs';
import {take, tap} from 'rxjs';
import { Character, Episode } from '../Interfaces/data.interface';
const QUERY = gql `
 {
   episodes {
    results{
      name
      episode
    }
   }
   characters() {
     results {
       name
       status
       species
       gender
       origin{
        name
       }
       location {
        name
       }
       image
     }
   }
 }
`;
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private episodeSubject = new BehaviorSubject<Episode[]>([]);
  episode$ = this.episodeSubject.asObservable();

 private charactersSubject = new BehaviorSubject<Character[]>([]);
  character$ = this.charactersSubject.asObservable();

 constructor(private apollo: Apollo) {
    this.getDataApi();
  }

 private getDataApi():void{
   this.apollo.watchQuery<any>({
    query: QUERY
   }).valueChanges.pipe(
    take(1),
    tap(({data})  => {
      const { characters, episodes } = data;
      this.charactersSubject.next(characters.results);
      this.episodeSubject.next(episodes.results);
    })
   ).subscribe();
 }
}
