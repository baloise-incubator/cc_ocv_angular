import { Component, ElementRef, OnInit, AfterViewInit, Renderer2, ViewChild, Input } from '@angular/core';
import * as handpose from '@tensorflow-models/handpose';
import '@tensorflow/tfjs-backend-webgl';

@Component({
	selector: 'ocv-handpose-tensorflow',
	templateUrl: './handpose-tensorflow.component.html',
	styleUrls: ['./handpose-tensorflow.component.scss'],
})
export class OCVHandposeTensorFlowComponent implements OnInit, AfterViewInit {
	@Input()
	set camera(c: MediaDeviceInfo) {
		if (c) this.changeCam(c.deviceId);
	}

	@ViewChild('video', { static: true }) videoElement: ElementRef;
	@ViewChild('canvas', { static: true }) canvas: ElementRef;

	// Video Vars
	videoWidth = 0;
	videoHeight = 0;
	currentStream: any;
	camerastarted = false;

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
		this.model = await handpose.load();
		this.loading = false;

		setInterval(async () => {
			if (this.camerastarted) {
				const predictions = await this.model.estimateHands(this.videoElement.nativeElement);

				this.renderer.setProperty(this.canvas.nativeElement, 'width', this.videoWidth);
				this.renderer.setProperty(this.canvas.nativeElement, 'height', this.videoHeight);
				this.canvas.nativeElement.getContext('2d').drawImage(this.videoElement.nativeElement, 0, 0);

				if (predictions.length > 0) {
					for (let i = 0; i < predictions.length; i++) {
						var ctx = this.canvas.nativeElement.getContext('2d');
						const keypoints = predictions[i].landmarks;

						// Log hand keypoints.
						for (let i = 0; i < keypoints.length; i++) {
							this.drawdot(ctx, keypoints[i]);
						}
						// Daumen
						this.drawline(ctx, keypoints[0], keypoints[1]);
						this.drawline(ctx, keypoints[1], keypoints[2]);
						this.drawline(ctx, keypoints[2], keypoints[3]);
						this.drawline(ctx, keypoints[3], keypoints[4]);
						//Zeigefinger
						this.drawline(ctx, keypoints[0], keypoints[5]);
						this.drawline(ctx, keypoints[5], keypoints[6]);
						this.drawline(ctx, keypoints[6], keypoints[7]);
						this.drawline(ctx, keypoints[7], keypoints[8]);
						//Mittelfinger
						this.drawline(ctx, keypoints[0], keypoints[9]);
						this.drawline(ctx, keypoints[9], keypoints[10]);
						this.drawline(ctx, keypoints[10], keypoints[11]);
						this.drawline(ctx, keypoints[11], keypoints[12]);
						//Ringfinger
						this.drawline(ctx, keypoints[0], keypoints[13]);
						this.drawline(ctx, keypoints[13], keypoints[14]);
						this.drawline(ctx, keypoints[14], keypoints[15]);
						this.drawline(ctx, keypoints[15], keypoints[16]);
						//Ringfinger
						this.drawline(ctx, keypoints[0], keypoints[17]);
						this.drawline(ctx, keypoints[17], keypoints[18]);
						this.drawline(ctx, keypoints[18], keypoints[19]);
						this.drawline(ctx, keypoints[19], keypoints[20]);
					}
				}
			}
		}, 100);
	}

	drawline(ctx, coords_from, coords_to) {
		ctx.beginPath();
		ctx.moveTo(coords_from[0], coords_from[1]);
		ctx.lineTo(coords_to[0], coords_to[1]);
		ctx.stroke();
	}

	drawdot(ctx, coords) {
		ctx.beginPath();
		ctx.arc(coords[0], coords[1], 5, 0, 2 * Math.PI);
		ctx.globalAlpha = 0.3;
		ctx.fillStyle = 'blue';
		ctx.fill();
		ctx.globalAlpha = 1;
		ctx.lineWidth = 5;
		ctx.strokeStyle = '#0000FF';
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
		this.camerastarted = true;
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
