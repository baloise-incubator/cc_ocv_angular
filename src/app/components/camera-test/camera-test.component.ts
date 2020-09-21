import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';

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
	cv: any;

	streaming: boolean = false;
	openCVLoaded: boolean = false;

	constraints = {
		video: {
			facingMode: 'environment',
			width: { ideal: 4096 },
			height: { ideal: 2160 },
		},
	};

	constructor(private renderer: Renderer2) {}

	ngOnInit() {
		this.startCamera();
		this.cv = this.addJsToElement('/assets/opencv.js').onload = (teste) => {
			console.log('OpenCV.js loaded', teste);
			this.openCVLoaded = true;
			this.faceDetect();
		};
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

	addJsToElement(src: string): HTMLScriptElement {
		const script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = src;
		this.renderer.appendChild(document.body, script);
		return script;
	}

	faceDetect() {
		let video: any = document.getElementById('video');
		let src = new this.cv.Mat(video.height, video.width, this.cv.CV_8UC4);
		let dst = new this.cv.Mat(video.height, video.width, this.cv.CV_8UC4);
		let gray = new this.cv.Mat();
		let cap = new this.cv.VideoCapture(video);
		let faces = new this.cv.RectVector();
		let classifier = new this.cv.CascadeClassifier();

		console.log('Video', video);
		console.log('src', src);
		console.log('dst', dst);
		console.log('gray', gray);
		console.log('cap', cap);
		console.log('faces', faces);
		console.log('classifier', classifier);

		// load pre-trained classifiers
		classifier.load('/assets/haarcascade_frontalface_default.xml');

		const FPS = 3;
		function processVideo() {
			try {
				if (!this.streaming) {
					// clean and stop.
					src.delete();
					dst.delete();
					gray.delete();
					faces.delete();
					classifier.delete();
					return;
				}
				let begin = Date.now();
				// start processing.
				cap.read(src);
				src.copyTo(dst);
				this.cv.cvtColor(dst, gray, this.cv.COLOR_RGBA2GRAY, 0);
				// detect faces.
				classifier.detectMultiScale(gray, faces, 1.1, 3, 0);
				// draw faces.
				for (let i = 0; i < faces.size(); ++i) {
					let face = faces.get(i);
					let point1 = new this.cv.Point(face.x, face.y);
					let point2 = new this.cv.Point(face.x + face.width, face.y + face.height);
					this.cv.rectangle(dst, point1, point2, [255, 0, 0, 255]);
				}
				this.cv.imshow('canvas', dst);
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
