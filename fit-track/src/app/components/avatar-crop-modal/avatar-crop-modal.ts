import { Component, EventEmitter, Output } from '@angular/core';
import { ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';

@Component({
  selector: 'app-avatar-crop-modal',
  imports: [ImageCropperComponent],
  templateUrl: './avatar-crop-modal.html',
  styleUrl: './avatar-crop-modal.css'
})
export class AvatarCropModal {
  @Output() imageCropped = new EventEmitter<Blob>();
  @Output() close = new EventEmitter<void>();

  imageChangedEvent: any = '';
  croppedImage: any = '';
  modalTitle: string = 'Upload Profile Picture'; // <-- New property

  onFileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    if (event.target.files && event.target.files.length > 0) {
      this.modalTitle = 'Crop Your Picture'; // <-- Update title once file is chosen
    } else {
      this.modalTitle = 'Upload Profile Picture'; // Reset if file selection is cleared
    }
  }

  onImageCropped(event: ImageCroppedEvent): void {
    if (event.blob) {
      this.croppedImage = event.blob;
    }
  }

  saveCroppedImage(): void {
    this.imageCropped.emit(this.croppedImage);
    this.close.emit();
  }
}
