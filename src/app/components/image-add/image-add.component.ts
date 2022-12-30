import { Component, OnInit, NgZone } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { ImageService } from '../../services/image.service';
import { AbstractComponent } from '../abstract.component';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-image-add',
  templateUrl: './image-add.component.html',
  styleUrls: ['./image-add.component.css'],
})
export class ImageAddComponent extends AbstractComponent implements OnInit {
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  pages: number = 1;

  filesList: Array<any> = [];

  constructor(
    private uploadService: ImageService,
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
          console.log(data);
          this.filesList.push(...data);
        }
      },
      error: (err) => {
        this.showErrorAlert(err, '/files');
      },
    });
  }

  selectFile(event: any): void {
    this.message = '';
    this.progress = 0;
    this.selectedFiles = event.target.files;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;
        const reader = new FileReader();
        reader.readAsDataURL(this.currentFile);
      }
    }
  }

  upload(): void {
    this.progress = 0;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;
        this.uploadService.upload(this.currentFile).subscribe({
          next: (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round((100 * event.loaded) / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              this.loadFiles();
            }
          },
          error: (err: any) => {
            console.log(err);
            this.progress = 0;
            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the image!';
            }
            this.currentFile = undefined;
          },
        });
      }

      this.selectedFiles = undefined;
    }
  }

  // Delete user
  deleteImage(data: any) {
    return this.uploadService.deleteFile(data.id).subscribe({
      next: (res) => {
        let index = this.filesList
          .map((file: { name: string }) => {
            return file.name;
          })
          .indexOf(data.name);
        this.filesList!.splice(index, 1);
        this.showSuccesAlert('/files');
      },
      error: (err) => {
        this.showErrorAlert(err, '/files');
      },
    });
  }

  showChoiceAlert(file: any) {
    Swal.fire({
      title: 'Question',
      text: "Voulez supprimer ou télécharger l'image ?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Télécharger',
      cancelButtonText: 'Supprimer',
    }).then((result) => {
      if (result.isConfirmed) {
        this.downloadFile(file.url, file.type);
      } else if (result.isDismissed) {
        this.deleteImage(file);
      }
    });
  }

  downloadFile(data: BlobPart, dataType: string) {
    console.log(dataType);
    const blob = new Blob([data], { type: 'image/jpeg;charset=utf8"' });
    const url = window.URL.createObjectURL(blob);
    window.open(url);
  }
}
