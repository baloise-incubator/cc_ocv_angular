import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
declare var cv: any;

@Component({
	selector: 'ocv-facedetect-tensorflow',
	templateUrl: './facedetect-tensorflow.component.html',
	styleUrls: ['./facedetect-tensorflow.component.scss'],
})
export class OCVFacedetectTensorFlowComponent implements OnInit {
	@ViewChild('video', { static: true }) videoElement: ElementRef;
	@ViewChild('canvas', { static: true }) canvas: ElementRef;
	@ViewChild('select', { static: true }) select: ElementRef;

	videoWidth = 0;
	videoHeight = 0;

	actualCam = 0;

	currentStream: any;

	streaming: boolean = false;
	openCVLoaded: boolean = false;

	constraints = {
		video: {
			facingMode: 'environment',
			width: { ideal: 4096 },
			height: { ideal: 2160 },
			deviceId: null,
		},
	};

	constructor(private renderer: Renderer2) {}

	ngOnInit() {
		this.startCamera();
		this.listCameras();
	}

	startCamera() {
		if (!!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
			navigator.mediaDevices
				.getUserMedia(this.constraints)
				.then((stream) => {
					this.attachVideo(stream);
					this.currentStream = stream;
					console.log('');
				})
				.catch(this.handleError);
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

	listCameras() {
		var select = this.select.nativeElement;
		select.innerHtml = '';
		//select.appendChild(document.createElement('option'));
		let count = 1;
		navigator.mediaDevices.enumerateDevices().then((md) => {
			md.forEach((mediaDevice) => {
				if (mediaDevice.kind === 'videoinput') {
					const option = document.createElement('option');
					option.value = mediaDevice.deviceId;
					const label = mediaDevice.label || `Camera ${count++}`;
					const textNode = document.createTextNode(label);
					option.appendChild(textNode);
					select.appendChild(option);
				}
			});
		});
	}

	changeCam() {
		var select = this.select.nativeElement;
		if (typeof this.currentStream !== 'undefined') {
			this.currentStream.getTracks().forEach((track) => {
				track.stop();
			});
		}
		if (select.value === '') {
			this.constraints.video.facingMode = 'environment';
			this.constraints.video.deviceId = null;
		} else {
			this.constraints.video.deviceId = { exact: select.value };
		}
		this.startCamera();
	}
}
