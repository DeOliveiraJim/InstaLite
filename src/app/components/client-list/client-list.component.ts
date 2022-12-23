import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractComponent } from 'src/app/components/abstract.component';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css'],
})
export class ClientListComponent extends AbstractComponent implements OnInit {

  constructor(public override ngZone: NgZone, public override router: Router) {
    super(ngZone, router);
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
