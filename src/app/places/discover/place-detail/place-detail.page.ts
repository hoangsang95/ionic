import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';

import { Place } from '../../place.model';
import { PlacesService } from '../../places.service';
import { CreateBookingComponent } from 'src/app/bookings/create-booking/create-booking.component';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss']
})
export class PlaceDetailPage implements OnInit {
  place: Place;
  constructor(
    private placesService: PlacesService,
    private navController: NavController,
    private route: ActivatedRoute,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('placeId')) {
        this.navController.navigateBack('/places/tabs/discover');
      }
      const placeId = paramMap.get('placeId');
      this.place = this.placesService.getPlace(placeId);
    });
  }

  onBookPlace() {
    this.modalController
      .create({
        component: CreateBookingComponent,
        componentProps: { selectedPlace: this.place }
      })
      .then(modalEl => {
        modalEl.present();
        return modalEl.onDidDismiss();
      })
      .then(resultData => {
        if (resultData.role === 'confirm') {
          console.log('BOOKED!');
        }
      });
  }
}
