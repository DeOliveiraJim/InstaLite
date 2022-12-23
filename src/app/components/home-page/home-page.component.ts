import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractComponent } from 'src/app/components/abstract.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent extends AbstractComponent  {

  constructor(public override ngZone: NgZone, public override router: Router) {
    super(ngZone, router);
  }

  ngOnInit(): void {}

}
