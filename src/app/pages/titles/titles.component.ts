import { Component, OnInit } from '@angular/core';
import { OfferService } from '@services/offer.service';

@Component({
  selector: 'app-titles',
  templateUrl: './titles.component.html',
  styleUrls: ['./titles.component.scss'],
})
export class TitlesComponent implements OnInit {
  titles: string[] = [];
  constructor(private offerService: OfferService) {}

  loadTitles = () => {
    this.offerService.getTitles().subscribe((data) => {
      this.titles = data.content;
    });
  };

  ngOnInit(): void {
    this.loadTitles();
  }
}
