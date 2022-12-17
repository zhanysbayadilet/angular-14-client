import { Injectable } from '@angular/core';
import {User} from "../_models/user";
import {FileHandle} from "../_models/file-handle.model";
import {DomSanitizer} from "@angular/platform-browser";

@Injectable({
  providedIn: 'root'
})
export class ImageProcessingService {

  constructor(private sanitizer: DomSanitizer) { }

  public createImages(user: User) {
    const userImages: any[] = user.userImages;
    const userImagesToFileHandle: FileHandle[] = [];

    for (let i = 0; i < userImages.length; i++) {
      const imageFileData = userImages[i];
      console.log(imageFileData);
      const imageBlob = this.dataURItoBlob(imageFileData.picByte, imageFileData.type);

      const imageFile = new File([imageBlob], imageFileData.name, {type: imageFileData.type});

      const finalFileHandle: FileHandle = {
        file: imageFile,
        url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imageFile))
      };

      userImagesToFileHandle.push(finalFileHandle);
    }

    user.userImages = userImagesToFileHandle;
    return user;
  }

  public dataURItoBlob(picBytes: any, imageType: any) {
    const byteString = window.atob(picBytes);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }

    return new Blob([int8Array], {type: imageType});
  }
}
