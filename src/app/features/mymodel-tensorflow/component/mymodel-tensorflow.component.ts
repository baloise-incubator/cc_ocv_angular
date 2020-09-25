import { Component, ElementRef, OnInit, AfterViewInit, Renderer2, ViewChild, Input } from '@angular/core';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-webgl';
import * as tmImage from '@teachablemachine/image';

@Component({
	selector: 'ocv-mymodel-tensorflow',
	templateUrl: './mymodel-tensorflow.component.html',
	styleUrls: ['./mymodel-tensorflow.component.scss'],
})
export class OCVMyModelTensorFlowComponent implements OnInit, AfterViewInit {
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

	modelURL = 'assets/image-segmentation/model.json';
	metadataURL = 'assets/image-segmentation/metadata.json';

	constructor(private renderer: Renderer2) {}

	ngOnInit() {
		this.loadModel();
	}

	async ngAfterViewInit() {
		this.startCamera();
	}

	async loadModel() {
		this.loading = true;

		//this.model = await tmImage.load(this.modelURL, this.metadataURL);
		this.model = await tf.loadLayersModel(this.modelURL);

		//this.model = await tf.loadLayersModel(this.MODEL_URL);
		console.log('model', this.model);

		this.loading = false;

		setInterval(async () => {
			if (this.camerastarted) {
				const predictions = await this.model.predict(this.videoElement.nativeElement);
				console.log('predictions', predictions);
			}
		}, 1000);
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
			console.log('play', event);

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
