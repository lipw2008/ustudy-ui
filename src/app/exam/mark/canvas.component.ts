import { Component, OnInit, AfterViewInit, ViewChild, Renderer2, Input, OnChanges, Inject, forwardRef, EventEmitter }  from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../../shared.service';
import { MarkComponent } from './mark.component';

@Component({
	selector: 'mark-canvas',
    templateUrl: 'canvas.component.html'
})

export class CanvasComponent implements OnInit {
	@Input() answer: any;
	@Input() editMode: string;
	@Input() score: string;
	@Input() questionName: string;
	@Input() isHidden: boolean;

	curPaperImg: string = null;
	isCanvasEnabled: boolean = true;

	/***** View *****/
	@ViewChild('markCanvas') markCanvas;

	rootContainerElement: any;
	container: any;
	canvas: any;
	ctx: any;
	imgData: any;

	// mark canvas
	hCanvas: any;
	hCtx: any;

	// stamp image
	img: any;

	// Draw Line
	isDrawingLine: boolean = false;

	// Draw Circle
	circleBeginX = 0;
	circleBeginY = 0;

	// Input Text
	textbox: any;

    constructor(private _sharedService: SharedService, private renderer: Renderer2, private route: ActivatedRoute,
	@Inject(forwardRef(()=>MarkComponent)) public parent: MarkComponent) {

    }

    ngOnInit(): void {

	}

	ngOnChanges(): void {
		console.log("ngOnChanges(): editmode:" + this.editMode);
		console.log("this.curPaperImg:" + this.curPaperImg);
		// console.log("this.answer.regions[0].ansImg:" + this.answer.regions[0].ansImg);
		// console.log("this.answer.regions[0].scale:" + this.answer.regions[0].scale);
		// console.log("this.answer.regions[0]" + this.answer.regions[0]);

		
		// the view is not inited yet OR it's a canvas not used
		if (this.canvas === undefined || this.isHidden === true) {
			return;
		}
		console.log("onchange -- this.answer.questionName" + this.answer.questionName);
		console.log("onchange -- this.questionName" + this.questionName);

		// change page OR clear enabled page or reload original page due to question selection change.
		if (this.curPaperImg !== this.answer.regions[0].ansImg || (this.editMode === 'Clear' && this.isCanvasEnabled === true)
			|| this.answer.regions[0].scale === undefined) {
			console.log("clear!!!");
			this.curPaperImg = this.answer.regions[0].ansImg;
			let promiseArray = this.loadPaper();
			Promise.all(promiseArray).then(() => {
				this.isCanvasEnabled = true;
				this.updateCanvasStatus();
			}).catch(() => {
				this.isCanvasEnabled = true;
				this.updateCanvasStatus();
				alert("无法加载试卷！");
				return;
			});
		} else if (this.editMode === "Score") {
			this.updateCanvasStatus();
			this.addScore();
		} else {
			this.updateCanvasStatus();
		}

		console.log("is hidden:" + this.isHidden);
		console.log("is enabled:" + this.isCanvasEnabled);
		console.log("edit mode:" + this.editMode);
		if (this.editMode === "BestAnswer") {
			this.addBestAnswer();
		} else if (this.editMode === "QueerAnswer") {
			this.addQueerAnswer();
		} else if (this.editMode === "FAQ") {
			this.addFAQ();
		}

		if (this.editMode === "BestAnswer" || this.editMode === "FAQ" || this.editMode === "QueerAnswer") {
			// restore editmode
			this.editMode = "None";
		}
	}

	ngAfterViewInit(): void {

		this.container = this.parent.markContainer.nativeElement;
		this.rootContainerElement = this.parent.rootContainer.nativeElement;

		this.canvas = this.markCanvas.nativeElement;
		this.ctx = this.canvas.getContext("2d");

		// hidden canvas
		this.hCanvas = document.createElement("canvas");
		this.hCtx = this.hCanvas.getContext("2d");


		// Bind events

    	this.renderer.listen(this.canvas, 'mousedown', (evt) => {
    		this.mouseDown(evt);
    	});
    	
    	this.renderer.listen(this.canvas, 'mouseup', (evt) => {
    		this.mouseUp(evt);
    	});
    	
    	this.renderer.listen(this.canvas, 'mousemove', (evt) => {
    		this.mouseMove(evt);
    	});

    	this.renderer.listen(this.canvas, 'mouseout', (evt) => {
    		this.mouseOut(evt);
    	});

		// it's a canvas not used
		if (this.answer.regions[0].ansImg !== null) {
			let promiseArray = this.loadPaper();
			Promise.all(promiseArray).then(() => {
				this.isCanvasEnabled = true;
				this.updateCanvasStatus();
			});
		}
	}

	loadPaper() {
		var promiseArray = [];
		console.log("loadPaper()");
		// total canvas width
		let canvasW = this.container.clientWidth - 20; //leave 20px for the scroll bar

		// total canvas height
		let canvasH = 0;

		for (let region of this.answer.regions) {
			region.scale = canvasW/region.w; 
			region.canvasH = region.h * region.scale;
			region.canvasY = canvasH;
			canvasH += region.canvasH;
		}

		// set the total size of the canvas
		this.ctx.canvas.width = canvasW;
		this.ctx.canvas.height = canvasH;
		// hidden canvas
		this.hCtx.canvas.width = this.ctx.canvas.width;
		this.hCtx.canvas.height = this.ctx.canvas.height;

		// load images
		for (let region of this.answer.regions) {

			let promise = new Promise((resolve, reject) =>  {
				let paperImg = new Image();

				paperImg.crossOrigin = "anonymous";
				let t = this;
				paperImg.onload = function() {
					t.ctx.drawImage(paperImg, 0, 0, paperImg.width, paperImg.height, 0, region.canvasY, t.ctx.canvas.width, region.canvasH);
					//load marking record image
					if (region.markImg !== null) {
						let markImg = new Image();
						markImg.crossOrigin = "anonymous";
						markImg.onload = function() {
							t.ctx.drawImage(markImg, 0, 0, markImg.width, markImg.height, 0, region.canvasY, t.ctx.canvas.width, region.canvasH);

							// hidden canvas
							t.hCtx.drawImage(markImg, 0, 0, markImg.width, markImg.height, 0, region.canvasY, t.hCtx.canvas.width, region.canvasH);
							resolve();
						}
						markImg.onerror = function() {
							reject();
						}
						markImg.src = t._sharedService.getImgUrl(region.markImg, "");
					} else if (region.markImgRecords[0] !== null && region.markImgRecords[1] !== null){
						console.log("mark image record: " +  region.markImgRecords[0] + " " + region.markImgRecords[1]);
						let markImg1 = new Image();
						markImg1.crossOrigin = "anonymous";
						markImg1.onload = function() {
							let tmpCanvas = document.createElement("canvas");
							t.changeImgData(tmpCanvas, markImg1, true);
							t.ctx.drawImage(tmpCanvas, 0, 0, markImg1.width, markImg1.height, 0, region.canvasY, t.ctx.canvas.width, region.canvasH);

							// hidden canvas
							t.hCtx.drawImage(tmpCanvas, 0, 0, markImg1.width, markImg1.height, 0, region.canvasY, t.hCtx.canvas.width, region.canvasH);

							let markImg2 = new Image();
							markImg2.crossOrigin = "anonymous";
							markImg2.onload = function() {
								let tmpCanvas = document.createElement("canvas");
								t.changeImgData(tmpCanvas, markImg2, false);
								t.ctx.drawImage(tmpCanvas, 0, 0, markImg2.width, markImg2.height, 0, region.canvasY, t.ctx.canvas.width, region.canvasH);

								// hidden canvas
								t.hCtx.drawImage(tmpCanvas, 0, 0, markImg2.width, markImg2.height, 0, region.canvasY, t.hCtx.canvas.width, region.canvasH);
								resolve();
							}
							markImg2.onerror = function() {
								reject();
							}
							markImg2.src = t._sharedService.getImgUrl(region.markImgRecords[1].markImg, "");

						}
						markImg1.onerror = function() {
							reject();
						}
						markImg1.src = t._sharedService.getImgUrl(region.markImgRecords[0].markImg, "");
					} else {
						resolve();
					}
				}
				paperImg.onerror = function() {
					reject();
				}
				paperImg.src = this._sharedService.getImgUrl(region.ansImg, region);
			});
			promiseArray.push(promise);
		}
		return promiseArray;
	}

	changeImgData(tmpCanvas, markImg, flag): void {
		let tmpCtx = tmpCanvas.getContext("2d");
		tmpCtx.canvas.width = markImg.width;
		tmpCtx.canvas.height = markImg.height;
		tmpCtx.drawImage(markImg, 0, 0);
		var imgData = tmpCtx.getImageData(0, 0, tmpCtx.canvas.width, tmpCtx.canvas.height);
		for(var i=0; i<imgData.data.length; i+=4) {
			if (imgData.data[i+3] !== 0) {
				if(imgData.data[i+0] === 255 && imgData.data[i+1] === 0 && imgData.data[i+2] === 65) {
					imgData.data[i+0] = 0;
					imgData.data[i+1] = 0;
					imgData.data[i+2] = 0;
					imgData.data[i+3] = 0;
				} else if (flag === true) {
					imgData.data[i+0] = 255;
					imgData.data[i+1] = 191;
					imgData.data[i+2] = 24;
					imgData.data[i+3] = 200;
				} else {
					imgData.data[i+0] = 255;
					imgData.data[i+1] = 192;
					imgData.data[i+2] = 182;
					imgData.data[i+3] = 200;
				}
			}
		}
		tmpCtx.putImageData(imgData,0,0);
	}
	mouseDown(evt): void {
		if (this.isHidden === true || this.isCanvasEnabled === false) {
			return;
		}
		var t = this;
		var x = (evt.offsetX == undefined || evt.offsetX == 0 ? evt.layerX: evt.offsetX);
		var y = (evt.offsetY == undefined || evt.offsetY == 0 ? evt.layerY: evt.offsetY);

		switch(this.editMode) {
			case 'Line':
				this.ctx.beginPath();
				this.ctx.moveTo(x, y);
				
				//hidden canvas
				this.hCtx.beginPath();
				this.hCtx.moveTo(x, y);
				
				this.isDrawingLine = true;
				break;
			case 'Circle':
				this.ctx.beginPath();

				//hidden canvas
				this.hCtx.beginPath();

				this.circleBeginX = x;
				this.circleBeginY = y;
				break;
			case 'Text':
				console.log("this.textbox:" + this.textbox);
				if (this.textbox !== undefined && this.textbox !== null) {
					this.textbox.parentNode.removeChild(this.textbox);
				}
				this.textbox = document.createElement("input");
				this.textbox.type = "text";
				this.textbox.style.position = "absolute";
				this.textbox.style.left = evt.clientX + "px";
				this.textbox.style.top = evt.clientY + "px";
				this.textbox.style.display = "inline";
				this.textbox.setAttribute("autofocus", "");
				let tEvt = evt;
				this.renderer.listen(this.textbox, 'keyup', (evt) => {
    				if(evt.keyCode == 13) {
    					console.log(this.textbox.value);
    					this.ctx.font = '36px serif';
    					this.ctx.fillStyle = "red";
    					this.ctx.fillText(this.textbox.value, x, y + 36);

						//hidden canvas
    					this.hCtx.font = '36px serif';
    					this.hCtx.fillStyle = "red";
    					this.hCtx.fillText(this.textbox.value, x, y + 36);

						console.log(tEvt.layerX);
						console.log(tEvt.offsetX);
						this.textbox.parentNode.removeChild(this.textbox);
						this.textbox = null;
					}
    			});
				this.rootContainerElement.appendChild(this.textbox);
				this.textbox.focus();
				console.log(this.textbox);
				console.log("x: " + evt.clientX + " y: " + evt.clientY);
				// console.log(this.canvas.offsetLeft);
				break;
			case 'Help':
				this.img = new Image();
				this.img.onload = function() {
					t.ctx.drawImage(t.img, x, y, t.img.width, t.img.height);

					//hidden canvas
					t.hCtx.drawImage(t.img, x, y, t.img.width, t.img.height);
				}
				this.img.src = 'assets/images/icon-help.png';
				break;
			case 'Like':
				this.img = new Image();
				this.img.onload = function() {
					t.ctx.drawImage(t.img, x, y, t.img.width, t.img.height);

					//hidden canvas
					t.hCtx.drawImage(t.img, x, y, t.img.width, t.img.height);
				}
				this.img.src = 'assets/images/icon-like.png';
				break;
			default:
				console.log("x: " + evt.clientX + " y: " + evt.clientY);
				//Do Nothing
		}
	}

	mouseUp(evt): void {
		if (this.isHidden === true || this.isCanvasEnabled === false) {
			return;
		}
		switch(this.editMode) {
			case 'Line':
				if (this.isDrawingLine === true) {
					this.isDrawingLine = false;
					this.ctx.lineTo(evt.offsetX == undefined? evt.layerX: evt.offsetX, evt.offsetY == undefined? evt.layerY: evt.offsetY);
					this.ctx.lineWidth = 3;
					this.ctx.strokeStyle = "red";
					this.ctx.stroke();
					this.ctx.closePath();

					//hidden canvas
					this.hCtx.lineTo(evt.offsetX == undefined? evt.layerX: evt.offsetX, evt.offsetY == undefined? evt.layerY: evt.offsetY);
					this.hCtx.lineWidth = 3;
					this.hCtx.strokeStyle = "red";
					this.hCtx.stroke();
					this.hCtx.closePath();
					
				}
				break;
			case 'Circle':
				let circleEndX = 0;
				let circleEndY = 0;
				// Deal with drawing from right to left
				if (this.circleBeginX > (evt.offsetX == undefined? evt.layerX: evt.offsetX)) {
					circleEndX = this.circleBeginX;
					this.circleBeginX = evt.offsetX == undefined? evt.layerX: evt.offsetX;
				} else {
					circleEndX = evt.offsetX == undefined? evt.layerX: evt.offsetX;
				}
				// Deal with drawing from bottom to top
				if (this.circleBeginY > (evt.offsetY == undefined? evt.layerY: evt.offsetY)) {
					circleEndY = this.circleBeginY;
					this.circleBeginY = evt.offsetY == undefined? evt.layerY: evt.offsetY;
				} else {
					circleEndY = evt.offsetY == undefined? evt.layerY: evt.offsetY;
				}
				let calX = circleEndX - this.circleBeginX;
				let calY = circleEndY - this.circleBeginY;
				let r = Math.pow(calX * calX + calY * calY, 0.5)/2;
				let a = r;
				let b = r/2;
				let centerX = this.circleBeginX + calX/2;
				let centerY = this.circleBeginY + calY/2;
				let radioX = a/r;
				let radioY = b/r;
				this.ctx.save();
				this.ctx.scale(radioX, radioY);
				this.ctx.beginPath();
				this.ctx.lineWidth = 3;
				this.ctx.strokeStyle = "red";
				this.ctx.moveTo((centerX+a)/radioX, centerY/radioY);
				this.ctx.arc(centerX/radioX, centerY/radioY, r, 0, 2*Math.PI);
				this.ctx.closePath();
				this.ctx.stroke();
				this.ctx.restore();

				// hidden canvas
				this.hCtx.save();
				this.hCtx.scale(radioX, radioY);
				this.hCtx.beginPath();
				this.hCtx.lineWidth = 3;
				this.hCtx.strokeStyle = "red";
				this.hCtx.moveTo((centerX+a)/radioX, centerY/radioY);
				this.hCtx.arc(centerX/radioX, centerY/radioY, r, 0, 2*Math.PI);
				this.hCtx.closePath();
				this.hCtx.stroke();
				this.hCtx.restore();

				break;
			default:
				//Do Nothing
		}
	}

	mouseMove(evt): void {
		if (this.isHidden === true || this.isCanvasEnabled === false) {
			return;
		}
		switch(this.editMode) {
			case 'Line':
				break;
			default:
				//Do Nothing
		}
	}

	mouseOut(evt): void {
		if (this.isHidden === true || this.isCanvasEnabled === false) {
			return;
		}
		switch(this.editMode) {
			case 'Line':
				if (this.isDrawingLine === true) {
					this.mouseUp(evt);
				}
				break;
			default:
				//Do Nothing
		}
	}

	updateCanvasStatus() {
		console.log("isCanvasEnabled:" + this.isCanvasEnabled);
		if (this.answer.questionName === this.questionName && this.isCanvasEnabled === false) {
			this.ctx.putImageData(this.imgData, 0, 0);
			console.log("set canvas to true");
			this.isCanvasEnabled = true;
		} else if (this.answer.questionName !== this.questionName && this.isCanvasEnabled === true) {
			this.imgData = this.ctx.getImageData(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
			this.ctx.globalAlpha = 0.9;
			this.ctx.fillStyle = "#808080";
			this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
			this.ctx.globalAlpha = 1;
			console.log("set canvas to false" + this.ctx.canvas.width + " " + this.ctx.canvas.height);
			this.isCanvasEnabled = false;
		}
		// enable canvas before adding score
		if (this.isCanvasEnabled === false && this.editMode === "Score") {
			this.ctx.putImageData(this.imgData, 0, 0);
			console.log("set canvas to true");
			this.isCanvasEnabled = true;			
		}
	}

	setDataUrl(region: any): any {
		// console.log("set data url for :" + region.ansImg);
		// console.log("region is: " + JSON.stringify(region));
		let tmpCanvas = document.createElement("canvas");
		let tmpCtx = tmpCanvas.getContext("2d");
		tmpCtx.canvas.width = region.w;
		tmpCtx.canvas.height = region.h;
		tmpCtx.drawImage(this.hCanvas, 0, region.canvasY, this.hCtx.canvas.width, region.canvasH, 0, 0, tmpCtx.canvas.width, tmpCtx.canvas.height);
		region.markImgData = tmpCanvas.toDataURL("image/png");
		// tmpCtx.clearRect(0, 0, tmpCtx.canvas.width, tmpCtx.canvas.height);
		// tmpCtx.drawImage(this.canvas, 0, region.canvasY, this.ctx.canvas.width, region.canvasH, 0, 0, tmpCtx.canvas.width, tmpCtx.canvas.height);
		// region.ansMarkImgData = tmpCanvas.toDataURL("image/png");	
	}

	addImage(): void {
		this.img = new Image();
		let t = this;
		this.img.onload = function() {
			// If the size of image is small, scale it to fit the container.
			console.log("image width:" + t.img.width + " container.width:" + t.container.style.width);
			// TODO: change 800 to real time container width later.
			t.ctx.drawImage(t.img, 0, 150, t.img.width, t.img.height-150, 0, 150, t.ctx.canvas.width, t.ctx.canvas.height-150);
		}
		this.img.src = 'assets/api/exams/hidden.png';
	}

	addBestAnswer(): void {
		if (this.isHidden === true || this.isCanvasEnabled === false) {
			return;
		}
		console.log("add best answer...");
		let t = this;
		this.img = new Image();
		this.img.onload = function() {
			console.log("img height:" + t.img.height);
			t.ctx.clearRect(0, 0, t.img.width, t.img.height);
			t.ctx.drawImage(t.img, 0, 0, t.img.width, t.img.height);

			//hidden canvas
			t.hCtx.clearRect(0, 0, t.img.width, t.img.height);
			t.hCtx.drawImage(t.img, 0, 0, t.img.width, t.img.height);

			t.answer.answerType = "BEST";
		}
		this.img.src = 'assets/images/icon-bestanswer.png';
	}

	addFAQ(): void {
		if (this.isHidden === true || this.isCanvasEnabled === false) {
			return;
		}
		let t = this;
		this.img = new Image();
		this.img.onload = function() {
			t.ctx.clearRect(0, 0, t.img.width, t.img.height);
			t.ctx.drawImage(t.img, 0, 0, t.img.width, t.img.height);

			//hidden canvas
			t.hCtx.clearRect(0, 0, t.img.width, t.img.height);
			t.hCtx.drawImage(t.img, 0, 0, t. img.width, t.img.height);

			t.answer.answerType = "FAQ";
		}
		this.img.src = 'assets/images/icon-faq.png';
	}

	addQueerAnswer(): void {
		if (this.isHidden === true || this.isCanvasEnabled === false) {
			return;
		}
		let t = this;
		this.img = new Image();
		this.img.onload = function() {
			t.ctx.clearRect(0, 0, t.img.width, t.img.height);
			t.ctx.drawImage(t.img, 0, 0, t.img.width, t.img.height);

			//hidden canvas
			t.hCtx.clearRect(0, 0, t.img.width, t.img.height);
			t.hCtx.drawImage(t.img, 0, 0, t.img.width, t.img.height);

			t.answer.answerType = "BAD";
		}
		this.img.src = 'assets/images/icon-queerflower.png';
	}

	addScore(): void {

		if(this.score === "") {
			return;
		}
		
		this.ctx.font = '64px Arial';
		this.ctx.fillStyle = "red";
		this.ctx.fillText(this.score, 400, 64);

		//hidden canvas
		this.hCtx.font = '64px Arial';
		this.hCtx.fillStyle = 'rgba(255, 0, 65, 1)';
		this.hCtx.fillText(this.score, 400, 64);

		for (let region of this.answer.regions) {
			this.setDataUrl(region);
		}
		this.parent.updatePaper();
	}
}
