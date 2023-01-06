import { HttpHeaders } from '@angular/common/http';
import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from 'src/app/services/search/search.service';
import { AbstractComponent } from '../abstract.component';

@Component({
  selector: 'app-weekend',
  templateUrl: './weekend.component.html',
  providers: [SearchService],
  styleUrls: ['./weekend.component.css']
})
export class WeekendComponent extends AbstractComponent implements OnInit {

  weekendStatus: string | undefined = "";

  constructor(private searchService: SearchService, public override ngZone: NgZone, public override router: Router) {
  super(ngZone, router);
  }

  ngOnInit(): void {
    this.searchService.getWeekend().subscribe(result => {
      var parser = new DOMParser()
      var parsed = parser.parseFromString(result, 'text/html')
      let msg = parsed.getElementsByClassName("msg").item(0)?.innerHTML;

      this.weekendStatus = msg
    })
  }

}
