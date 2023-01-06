import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageService } from 'src/app/services/image.service';
import { Status } from 'src/app/shared/status';
import { AbstractComponent } from '../abstract.component';

@Component({
  selector: 'app-files-edit',
  templateUrl: './files-edit.component.html',
  styleUrls: ['./files-edit.component.css']
})
export class FilesEditComponent extends AbstractComponent implements OnInit {
  updateFileForm!: FormGroup;
  id !: string;
  file !: any;
  

  ngOnInit() {
  }
  constructor(
    private actRoute: ActivatedRoute,
    public fb: FormBuilder,
    public fileService : ImageService,
    ngZone: NgZone,
    router: Router,
  ) {
    super(ngZone, router);
    this.id = this.actRoute.snapshot.paramMap.get('id')!;
    this.getFile();
  }

  get currentFile() {
    return this.file;
  }

  getFile() {
    console.log("je get");
    this.fileService.getFileInfo(this.id).subscribe({
      
      next: (data) => {
        this.file = data;
      },
      error: (err) => {
        this.showErrorAlert(err, '/files');
      },
    });
  }

  submitForm() {
    
    var s = <'hidden' | 'public' | 'private'>(<HTMLSelectElement>document.getElementById('status')).value
    // On évite les injections ici.
    if(!(<any>Object).values(Status).includes(s)) {
      return;
    } 
    console.log("Je récup "+ s );
    this.fileService
      .updateStatus(this.id, s )
      .subscribe({
        next: (user) => {
          this.showSuccesAlert('/files');
        },
        error: (err) => {
          this.showErrorAlert(err, '/files');
        },
      });
  }
}
