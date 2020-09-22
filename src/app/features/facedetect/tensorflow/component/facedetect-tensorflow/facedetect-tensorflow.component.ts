import { Component, ElementRef, OnInit, AfterViewInit, Renderer2, ViewChild, Input } from '@angular/core';
import * as blazeface from '@tensorflow-models/blazeface';
import '@tensorflow/tfjs-backend-webgl';

@Component({
	selector: 'ocv-facedetect-tensorflow',
	templateUrl: './facedetect-tensorflow.component.html',
	styleUrls: ['./facedetect-tensorflow.component.scss'],
})
export class OCVFacedetectTensorFlowComponent implements OnInit, AfterViewInit {
	@Input()
	set camera(c: MediaDeviceInfo) {
		this.changeCam(c.deviceId);
	}

	@ViewChild('video', { static: true }) videoElement: ElementRef;
	@ViewChild('canvas', { static: true }) canvas: ElementRef;

	// Video Vars
	videoWidth = 0;
	videoHeight = 0;
	currentStream: any;

	constraints = {
		video: {
			facingMode: 'environment',
			width: { ideal: 1024 },
			height: { ideal: 768 },
			deviceId: null,
			aspectRatio: 1.3333333,
		},
	};

	//width: { ideal: 4096 },
	//height: { ideal: 2160 },

	// Model Vars
	model: any;
	loading: boolean;

	constructor(private renderer: Renderer2) {}

	ngOnInit() {
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
				for (let i = 0; i < predictions.length; i++) {
					const start = predictions[i].topLeft;
					const end = predictions[i].bottomRight;
					const size = [end[0] - start[0], end[1] - start[1]];

					const eye_right = predictions[i].landmarks[0];
					const eye_left = predictions[i].landmarks[1];
					const nose = predictions[i].landmarks[2];
					const mouth = predictions[i].landmarks[3];
					const ear_right = predictions[i].landmarks[4];
					const ear_left = predictions[i].landmarks[5];

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
		ctx.arc(coords[0], coords[1], 50, 0, 2 * Math.PI);
		ctx.globalAlpha = 0.3;
		ctx.fillStyle = 'blue';
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

	changeCam(deviceId) {
		console.log('DeviceId', deviceId);
		if (typeof this.currentStream !== 'undefined') {
			this.currentStream.getTracks().forEach((track) => {
				track.stop();
			});
		}
		if (deviceId === '') {
			this.constraints.video.facingMode = 'environment';
			this.constraints.video.deviceId = null;
		} else {
			this.constraints.video.deviceId = { exact: deviceId };
		}
		this.startCamera();
	}
}
