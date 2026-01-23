export class MobileUploadOptimizer {
  constructor() {
    this.isMobile = typeof navigator !== 'undefined' ? 
      /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) : false;
    this.connectionType = this.getConnectionType();
  }

  getConnectionType() {
    if (typeof navigator === 'undefined') return '4g';
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    return connection ? connection.effectiveType : '4g';
  }

  async compressVideo(file) {
    if (!this.isMobile) return file; // Skip if not mobile
    
    console.log(`Mobile detected: Compressing ${file.size / (1024*1024)}MB file`);
    
    
    
    console.log('Video compression not implemented - using original file');
    return file;
    
    
  }

  async uploadWithChunks(file, uploadUrl, onProgress) {

    if (file.size < 10 * 1024 * 1024) { 
      return this.directUpload(file, uploadUrl, onProgress);
    } else {
      return this.optimizedUpload(file, uploadUrl, onProgress);
    }
  }

  async directUpload(file, uploadUrl, onProgress) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      
      xhr.open('PUT', uploadUrl, true);
      xhr.setRequestHeader('x-ms-blob-type', 'BlockBlob');
      xhr.setRequestHeader('Content-Type', file.type);
      
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentComplete = Math.round((event.loaded / event.total) * 100);
          onProgress(percentComplete);
        }
      };
      
      xhr.onload = () => xhr.status < 300 ? resolve() : reject(new Error('Upload failed'));
      xhr.onerror = () => reject(new Error('Network error during upload'));
      
      xhr.send(file);
    });
  }

  async optimizedUpload(file, uploadUrl, onProgress) {
    const startTime = Date.now();
    console.log(`Starting upload: ${(file.size / (1024*1024)).toFixed(1)}MB file`);
    
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      
      xhr.open('PUT', uploadUrl, true);
      xhr.setRequestHeader('x-ms-blob-type', 'BlockBlob');
      xhr.setRequestHeader('Content-Type', file.type);
      
      xhr.timeout = this.isMobile ? 300000 : 120000; // 5min vs 2min timeout
      
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentComplete = Math.round((event.loaded / event.total) * 100);
          const elapsed = (Date.now() - startTime) / 1000;
          const speed = (event.loaded / (1024 * 1024)) / elapsed; // MB/s
          console.log(`Upload: ${percentComplete}% - ${speed.toFixed(1)} MB/s`);
          onProgress(percentComplete);
        }
      };
      
      xhr.onload = () => {
        const totalTime = (Date.now() - startTime) / 1000;
        const avgSpeed = (file.size / (1024 * 1024)) / totalTime;
        console.log(`Upload complete: ${totalTime.toFixed(1)}s - Avg: ${avgSpeed.toFixed(1)} MB/s`);
        xhr.status < 300 ? resolve() : reject(new Error('Upload failed'));
      };
      
      xhr.onerror = () => reject(new Error('Network error during upload'));
      xhr.ontimeout = () => reject(new Error('Upload timeout'));
      
      xhr.send(file);
    });
  }
}