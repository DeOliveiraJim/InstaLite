import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PressService } from 'src/app/services/press/press.service';
import { PressInsertItem } from 'src/app/shared/press-insert-item';
import { AbstractComponent } from '../abstract.component';

@Component({
  selector: 'app-press-insert',
  templateUrl: './press-insert.component.html',
  styleUrls: ['./press-insert.component.css']
})
export class PressInsertComponent extends AbstractComponent implements OnInit {

  pressInsertItems : PressInsertItem[] = [];

  constructor(private pressService: PressService, public override ngZone: NgZone, public override router: Router) {
  super(ngZone, router);
  }

  ngOnInit(): void {
    this.pressService.getPress().subscribe( data => {
      var parser = new DOMParser()
      let parsed = parser.parseFromString(data, 'text/xml')
      let items = parsed.getElementsByTagName('item')
      for (let itemKey in Object.keys(items).filter(k => !isNaN(Number(k)))) {
        let item = items[itemKey]
        var pressInsertItem = {
          title: item.childNodes.item(0).textContent,
          pubDate: item.childNodes.item(1).textContent,
          description: item.childNodes.item(2).textContent,
          guid: item.childNodes.item(3).textContent,
          link: item.childNodes.item(4).textContent,
          media: (<Element>item.childNodes.item(5)).getAttribute('url')
        }
        this.pressInsertItems.push(pressInsertItem)
      }
    })
  }

}