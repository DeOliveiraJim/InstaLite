import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ImageService } from 'src/app/services/image.service';
import { AbstractComponent } from '../abstract.component';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  providers: [NavbarComponent],
  selector: 'app-files-display',
  templateUrl: './files-display.component.html',
  styleUrls: ['./files-display.component.css']
})
export class FilesDisplayComponent extends AbstractComponent implements OnInit {
  
  files: any[] = []

  constructor(
    public override ngZone: NgZone,
    public override router: Router,
    private imageService: ImageService,
    private navbar: NavbarComponent) {
      super(ngZone, router)
    }

  ngOnInit(): void {
    if(this.navbar.isConnected()) {
      this.imageService.getAllFiles().subscribe(
        files => {
          this.files = files
        }
      )
    }
  }

}
