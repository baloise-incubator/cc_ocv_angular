import { Component, ElementRef, OnInit, AfterViewInit, Renderer2, ViewChild } from '@angular/core';
import * as blazeface from '@tensorflow-models/blazeface';
import '@tensorflow/tfjs-backend-webgl';

@Component({
	selector: 'ocv-facedetect-tensorflow',
	templateUrl: './facedetect-tensorflow.component.html',
	styleUrls: ['./facedetect-tensorflow.component.scss'],
})
export class OCVFacedetectTensorFlowComponent implements OnInit, AfterViewInit {
	@ViewChild('video', { static: true }) videoElement: ElementRef;
	@ViewChild('canvas', { static: true }) canvas: ElementRef;
	@ViewChild('select', { static: true }) select: ElementRef;

	// Video Vars
	videoWidth = 0;
	videoHeight = 0;
	currentStream: any;

	constraints = {
		video: {
			facingMode: 'environment',
			width: { ideal: 4096 },
			height: { ideal: 2160 },
			deviceId: null,
		},
	};

	// Model Vars
	model: any;
	loading: boolean;

	constructor(private renderer: Renderer2) {}

	ngOnInit() {
		this.listCameras();
		this.loadModel();
	}

	async ngAfterViewInit() {
		this.startCamera();
	}

	async loadModel() {
		this.loading = true;
		this.model = await blazeface.load();
		this.loading = false;

		setInterval(async () => {
			//blazeface
			const returnTensors = false; // Pass in `true` to get tensors back, rather than values.
			const predictions = await this.model.estimateFaces(this.videoElement.nativeElement, returnTensors);

			this.renderer.setProperty(this.canvas.nativeElement, 'width', this.videoWidth);
			this.renderer.setProperty(this.canvas.nativeElement, 'height', this.videoHeight);
			this.canvas.nativeElement.getContext('2d').drawImage(this.videoElement.nativeElement, 0, 0);

			if (predictions.length > 0) {
				/*
				`predictions` is an array of objects describing each detected face, for example:

				[
				{
					topLeft: [232.28, 145.26],
					bottomRight: [449.75, 308.36],
					probability: [0.998],
					landmarks: [
					[295.13, 177.64], // right eye
					[382.32, 175.56], // left eye
					[341.18, 205.03], // nose
					[345.12, 250.61], // mouth
					[252.76, 211.37], // right ear
					[431.20, 204.93] // left ear
					]
				}
				]
				*/

				for (let i = 0; i < predictions.length; i++) {
					const start = predictions[i].topLeft;
					const end = predictions[i].bottomRight;
					const size = [end[0] - start[0], end[1] - start[1]];

					const eye_right = predictions[i].landmarks[0];
					const eye_left = predictions[i].landmarks[1];

					// Render a rectangle over each detected face.
					var ctx = this.canvas.nativeElement.getContext('2d');
					//ctx.globalAlpha = 0.3;
					//ctx.fillStyle = 'blue';
					//ctx.fillRect(start[0], start[1], size[0], size[1]);
					this.drawdot(ctx, eye_right);
					this.drawdot(ctx, eye_left);
				}
			}
		}, 100);
	}

	drawdot(ctx, coords) {
		ctx.beginPath();
		ctx.arc(coords[0], coords[1], 70, 0, 2 * Math.PI);
		ctx.globalAlpha = 0.3;
		ctx.fill();
		ctx.globalAlpha = 1;
		ctx.lineWidth = 5;
		ctx.strokeStyle = '#FFFFFF';
		ctx.stroke();
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
