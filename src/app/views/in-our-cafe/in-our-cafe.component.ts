import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-in-our-cafe',
  templateUrl: './in-our-cafe.component.html',
  styleUrls: ['./in-our-cafe.component.scss', '../../../styles.scss'],
  providers: [NgbCarouselConfig]
})
export class InOurCafeComponent implements OnInit {

  showNavigationArrows = true;
  showNavigationIndicators = true;

  favourites: boolean[]; //Lista que corresponde a si cada evento tiene favorito o no

  constructor() {
    var favs = localStorage.getItem('events_favourites');
    if(favs) {
      this.favourites = JSON.parse(favs);
    } else {
      this.favourites = [false, false, false, false, false];
      localStorage.setItem('events_favourites', JSON.stringify(this.favourites));
    }
    
  }

  ngOnInit(): void {
  }

  //Método que establece el favorito del primer evento
  setFavourite1(fav: boolean){
    this.favourites[0] = fav;
    localStorage.setItem('events_favourites', JSON.stringify(this.favourites));
    console.log(this.favourites[0]);
  }

  //Método que establece el favorito del segundo evento
  setFavourite2(fav: boolean){
    this.favourites[1] = fav;
    localStorage.setItem('events_favourites', JSON.stringify(this.favourites));
    console.log(this.favourites[1]);
  }

  //Método que establece el favorito del tercer evento
  setFavourite3(fav: boolean){
    this.favourites[2] = fav;
    localStorage.setItem('events_favourites', JSON.stringify(this.favourites));
    console.log(this.favourites[2]);
  }

  //Método que establece el favorito del cuarto evento
  setFavourite4(fav: boolean){
    this.favourites[3] = fav;
    localStorage.setItem('events_favourites', JSON.stringify(this.favourites));
    console.log(this.favourites[3]);
  }

  //Método que establece el favorito del quinto evento
  setFavourite5(fav: boolean){
    this.favourites[4] = fav;
    localStorage.setItem('events_favourites', JSON.stringify(this.favourites));
    console.log(this.favourites[4]);
  }

}
