import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JobLocation, MinMaxResponse, Offer, PageableResponse } from '../types';

@Injectable({
  providedIn: 'root',
})
export class OfferService {
  private url = 'http://localhost:8080/api/offers';
  constructor(private http: HttpClient) {}

  getLatestOffers(job: string) {
    return this.http.get<PageableResponse<Offer>>(
      `${this.url}?page=0&size=5&sort=createdAt,desc&search=${job}`
    );
  }

  getOffers(page: number, size: number, search: string) {
    return this.http.get<PageableResponse<Offer>>(
      `${this.url}?page=${page}&size=${size}&sort=createdAt,desc&search=${search}`
    );
  }

  getOffersByTitle(page: number, size: number, title: string, search: string) {
    return this.http.get<PageableResponse<Offer>>(
      `${this.url}/titles/${title}?page=${page}&size=${size}&sort=createdAt,desc&search=${search}`
    );
  }

  getTitles(limit?: number) {
    return this.http.get<PageableResponse<string>>(
      `${this.url}/titles?size=${limit}`
    );
  }

  getMinMax(title: string, location: string) {
    return this.http.get<MinMaxResponse>(
      `${this.url}/min-max?title=${title}&location=${location}`
    );
  }

  getLocations() {
    return this.http.get<PageableResponse<JobLocation>>(
      `${this.url}/locations`
    );
  }

  getOffer(id: number) {
    return this.http.get<Offer>(`${this.url}/${id}`);
  }

  createOffer(offer: Partial<Offer>) {
    return this.http.post<Offer>(`${this.url}`, offer);
  }
}
