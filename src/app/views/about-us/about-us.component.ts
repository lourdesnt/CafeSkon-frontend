import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { MapService } from 'app/services/map.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss', '../../../styles.scss'],
  providers: [NgbCarouselConfig]
})
export class AboutUsComponent implements OnInit {

  showNavigationArrows = true;
  showNavigationIndicators = true;

  constructor(private map: MapService) { }

  ngOnInit(): void {
    this.map.buildMap(); //Para construir mapa
  }

}
