import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
declare var cv: any;

@Component({
	selector: 'ocv-camera-test',
	templateUrl: './camera-test.component.html',
	styleUrls: ['./camera-test.component.scss'],
})
export class OCVCameraTestComponent implements OnInit {
	@ViewChild('video', { static: true }) videoElement: ElementRef;
	@ViewChild('canvas', { static: true }) canvas: ElementRef;

	videoWidth = 0;
	videoHeight = 0;

	streaming: boolean = false;
	openCVLoaded: boolean = false;

	constraints = {
		video: {
			facingMode: 'environment',
			width: { ideal: 4096 },
			height: { ideal: 2160 },
		},
	};

	/**
	 * Loads a JavaScript file and returns a Promise for when it is loaded
	 */
	loadScript = (src) => {
		return new Promise((resolve, reject) => {
			const script = document.createElement('script');
			script.type = 'text/javascript';
			script.onload = resolve;
			script.onerror = reject;
			script.src = src;
			document.head.append(script);
		});
	};

	createFileFromUrl = function (path, url, cvc, callback) {
		let request = new XMLHttpRequest();
		request.open('GET', url, true);
		request.responseType = 'arraybuffer';
		request.onload = function (ev) {
			if (request.readyState === 4) {
				if (request.status === 200) {
					let data = new Uint8Array(request.response);
					cvc.FS_createDataFile('/', path, data, true, false, false);
					callback();
				} else {
					console.error('Failed to load ' + url + ' status: ' + request.status);
				}
			}
		};
		request.send();
	};

	constructor(private renderer: Renderer2) {}

	ngOnInit() {
		this.startCamera();
		this.loadScript('/assets/opencv.js').then((x) => {
			console.log('OpenCV geladen');
			console.log('cv', cv);
			cv.then((x) => {
				let faceCascadeFile = 'haarcascade_frontalface_default.xml';
				this.createFileFromUrl(faceCascadeFile, 'assets/' + faceCascadeFile, x, () => {
					console.log('cascade ready to load.');
					console.log('x', x);
					this.openCVLoaded = true;
					this.faceDetect(x);
				});
			});
		});
		// let cvTemp = (this.addJsToElement('/assets/opencv.js').onload = (teste) => {
		// 	console.log('OpenCV.js loaded', teste);
		// 	this.openCVLoaded = true;
		// 	console.log('cv', cv);
		// 	console.log('cv2', cvTemp);

		// 	this.faceDetect();
		// });
	}

	startCamera() {
		if (!!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
			navigator.mediaDevices.getUserMedia(this.constraints).then(this.attachVideo.bind(this)).catch(this.handleError);
		} else {
			alert('Sorry, camera not available.');
		}
	}

	handleError(error) {
		console.log('Error: ', error);
	}

	attachVideo(stream) {
		this.renderer.setProperty(this.videoElement.nativeElement, 'srcObject', stream);
		this.renderer.listen(this.videoElement.nativeElement, 'play', (event) => {
			this.videoHeight = this.videoElement.nativeElement.videoHeight;
			this.videoWidth = this.videoElement.nativeElement.videoWidth;
		});
	}

	capture() {
		this.renderer.setProperty(this.canvas.nativeElement, 'width', this.videoWidth);
		this.renderer.setProperty(this.canvas.nativeElement, 'height', this.videoHeight);
		this.canvas.nativeElement.getContext('2d').drawImage(this.videoElement.nativeElement, 0, 0);
	}

	toggleStream() {
		this.streaming = !this.streaming;
	}

	changeCam() {
		//TODO
	}

	faceDetect(cv: any) {
		let video: any = this.videoElement.nativeElement;
		video.height = video.videoHeight;
		video.width = video.videoWidth;
		let src = new cv.Mat(video.height, video.width, cv.CV_8UC4);
		let dst = new cv.Mat(video.height, video.width, cv.CV_8UC4);
		let gray = new cv.Mat();
		let cap = new cv.VideoCapture(video);
		let faces = new cv.RectVector();
		let classifier = new cv.CascadeClassifier();

		// load pre-trained classifiers
		const loaded = classifier.load('haarcascade_frontalface_default.xml');
		console.log('classifier', loaded, classifier);
		const FPS = 1;
		function processVideo() {
			console.log('streaming', this.streaming);
			try {
				// if (!this.streaming) {
				// 	// clean and stop.
				// 	src.delete();
				// 	dst.delete();
				// 	gray.delete();
				// 	faces.delete();
				// 	classifier.delete();
				// 	return;
				// }
				let begin = Date.now();
				// start processing.
				cap.read(src);
				src.copyTo(dst);
				cv.cvtColor(dst, gray, cv.COLOR_RGBA2GRAY, 0);
				// detect faces.
				classifier.detectMultiScale(gray, faces, 1.1, 3, 0);
				// draw faces.
				for (let i = 0; i < faces.size(); ++i) {
					let face = faces.get(i);
					let point1 = new cv.Point(face.x, face.y);
					let point2 = new cv.Point(face.x + face.width, face.y + face.height);
					cv.rectangle(dst, point1, point2, [255, 0, 0, 255]);
				}
				cv.imshow('canvasOutput', dst);
				// schedule the next one.
				let delay = 1000 / FPS - (Date.now() - begin);
				setTimeout(processVideo, delay);
			} catch (err) {
				console.log(err);
			}
		}

		// schedule the first one.
		setTimeout(processVideo, 0);
	}
}
