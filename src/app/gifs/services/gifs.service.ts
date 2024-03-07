import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.intefaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  public gifList: Gif[] = [];

  private _tagsHistory: string[] = [];
  private apiKey: string = 'OiwMlRMnW79Ca4m7nLP82cf1YjL8KEvP'
  private serviceUrl = 'https://api.giphy.com/v1/gifs'

  constructor(private http: HttpClient) {

    const gifs = localStorage.getItem('gifs');
    this._tagsHistory = JSON.parse(gifs || "[]");

    if (this._tagsHistory.length) this.searchTag(this._tagsHistory[0]);

  }

  get tagsHistory() {
    return [...this._tagsHistory];
  }

  searchTag( tag: string ): void {

    if (tag.length === 0) return;

    this.organizeHistory(tag);

    const params = new HttpParams()
    .set('api_key', this.apiKey)
    .set('limit', '10')
    .set('q', tag);

    this.http.get<SearchResponse>(`${ this.serviceUrl }/search`, { params })
      .subscribe( resp => {

        this.gifList = resp.data;
      })
  }

  private organizeHistory(tag: string) {

    tag = tag.toLowerCase();

    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter(x => x !== tag);
    }

    this._tagsHistory.unshift( tag );

    this._tagsHistory = this._tagsHistory.splice(0,10);

    localStorage.setItem('gifs',  JSON.stringify(this._tagsHistory))
  }
}
