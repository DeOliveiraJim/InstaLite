import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FilesService } from 'src/app/services/files.service';
import { AbstractComponent } from '../abstract.component';

@Component({
  selector: 'app-files-display',
  templateUrl: './files-display.component.html',
  styleUrls: ['./files-display.component.css'],
})
export class FilesDisplayComponent extends AbstractComponent implements OnInit {
  pages: number = 1;

  filesList: Array<any> = [];

  constructor(
    private uploadService: FilesService,
    ngZone: NgZone,
    router: Router
  ) {
    super(ngZone, router);
  }

  ngOnInit(): void {
    this.loadFiles();
  }

  loadFiles() {
    return this.uploadService.getAllFiles().subscribe({
      next: (data) => {
        if (data) {
          this.filesList = new Array();
          this.filesList.push(...data);
        }
      },
      error: (err) => {
        this.showErrorAlert(err, '/files');
      },
    });
  }
}