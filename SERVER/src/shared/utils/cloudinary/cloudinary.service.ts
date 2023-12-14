// cloudinary.service.ts

import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryResponse } from './interface/cloudinary.response';
const streamifier = require('streamifier');

@Injectable()
export class CloudinaryService {
  // xử lý 1 ảnh
  uploadSingleFile(file: Express.Multer.File): Promise<CloudinaryResponse> {
    return new Promise<CloudinaryResponse>((resolve, reject) => {
      const uploadOptions = {
        folder: 'Project-NestJs',
      };
      const uploadStream = cloudinary.uploader.upload_stream(
        uploadOptions,
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }
  // xử lý nhiều ảnh
  uploadMultipleFiles(files: Express.Multer.File[]): any {
    return Promise.all(
      files.map((file) => {
        return new Promise<CloudinaryResponse>((resolve, reject) => {
          const uploadOptions = {
            folder: 'Project-NestJs',
          };
          const uploadStream = cloudinary.uploader.upload_stream(
            uploadOptions,
            (error, result) => {
              if (error) return reject(error);
              resolve(result);
            },
          );
          streamifier.createReadStream(file.buffer).pipe(uploadStream);
        });
      }),
    );
  }
}
