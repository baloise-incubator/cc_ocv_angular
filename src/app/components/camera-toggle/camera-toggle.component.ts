import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
declare var cv: any;

@Component({
	selector: 'ocv-camera-toggle',
	templateUrl: './camera-toggle.component.html',
	styleUrls: ['./camera-toggle.component.scss'],
})
export class OCVCameraToggleComponent implements OnInit {
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

	constructor(private renderer: Renderer2) {}

	ngOnInit() {
		this.startCamera();
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
}
