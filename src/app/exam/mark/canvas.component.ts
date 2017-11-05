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

	curPaperImg: string = "";

	/***** View *****/
	@ViewChild('markCanvas') markCanvas;

	rootContainerElement: any;
	container: any;
	canvas: any;
	ctx: any;
	img: any;

	// hidden canvas
	hCanvas: any;
	hCtx: any;

	// Draw Line
	isDrawingLine: boolean = false;

	// Draw Circle
	circleBeginX = 0;
	circleBeginY = 0;

    constructor(private _sharedService: SharedService, private renderer: Renderer2, private route: ActivatedRoute,
	@Inject(forwardRef(()=>MarkComponent)) public parent: MarkComponent) {

    }

    ngOnInit(): void {

	}

	ngOnChanges(): void {
		if (this.curPaperImg !== this.answer.paperImg || this.editMode === 'Clear') {
			this.curPaperImg = this.answer.paperImg;
			this.loadPaper();
		} else if (this.editMode === "Score") {
			this.addScore();
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

		this.loadPaper();
	}

	loadPaper(): void {

		this.img = new Image();

		this.img.crossOrigin = "anonymous";
		let t = this;
		this.img.onload = function() {
			t.ctx.canvas.width = t.container.offsetWidth;
			t.ctx.canvas.height = t.img.height * (t.ctx.canvas.width/t.img.width);
			t.ctx.drawImage(t.img, 0, 0, t.img.width, t.img.height, 0, 0, t.ctx.canvas.width, t.ctx.canvas.height);
			//hidden canvas
			t.hCtx.canvas.width = t.ctx.canvas.width;
			t.hCtx.canvas.height = t.ctx.canvas.height;
		}
		this.img.src = this._sharedService.getImgUrl(this.answer.paperImg, this.answer.region);
	}

	clear(): void {
		let t = this;
		this.img.onload = function() {
			t.ctx.canvas.width = t.container.offsetWidth;
			t.ctx.canvas.height = t.img.height * (t.ctx.canvas.width/t.img.width);
			t.ctx.drawImage(t.img, 0, 0, t.img.width, t.img.height, 0, 0, t.ctx.canvas.width, t.ctx.canvas.height);
			//hidden canvas
			t.hCtx.canvas.width = t.ctx.canvas.width;
			t.hCtx.canvas.height = t.ctx.canvas.height;
		}
		this.img.src = this._sharedService.getImgUrl(this.answer.paperImg, this.answer.region);
	}

	mouseDown(evt): void {
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
				let textbox = document.createElement("input");
				textbox.type = "text";
				textbox.style.position = "absolute";
				textbox.style.left = evt.clientX + "px";
				textbox.style.top = evt.clientY + "px";
				textbox.style.display = "inline";
				textbox.setAttribute("autofocus", "");
				let tEvt = evt;
				this.renderer.listen(textbox, 'keyup', (evt) => {
    				if(evt.keyCode == 13) {
    					console.log(textbox.value);
    					this.ctx.font = '36px serif';
    					this.ctx.fillStyle = "red";
    					this.ctx.fillText(textbox.value, x, y + 36);

						//hidden canvas
    					this.hCtx.font = '36px serif';
    					this.hCtx.fillStyle = "red";
    					this.hCtx.fillText(textbox.value, x, y + 36);

						console.log(tEvt.layerX);
						console.log(tEvt.offsetX);
						textbox.parentNode.removeChild(textbox);
					}
    			});
				this.rootContainerElement.appendChild(textbox);
				textbox.focus();
				console.log(textbox);
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
			case 'BestAnswer':
				this.img = new Image();
				this.img.onload = function() {
					console.log("img height:" + t.img.height);
					t.ctx.drawImage(t.img, 0, 0, t.img.width, t.img.height);

					//hidden canvas
					t.hCtx.drawImage(t.img, 0, 0, t.img.width, t.img.height);
				}
				this.img.src = 'assets/images/icon-bestanswer.png';
				break;
			case 'FAQ':
				this.img = new Image();
				this.img.onload = function() {
					t.ctx.drawImage(t.img, 90, 0, t.img.width, t.img.height);

					//hidden canvas
					t.hCtx.drawImage(t.img, 90, 0, t.img.width, t.img.height);
				}
				this.img.src = 'assets/images/icon-faq.png';
				break;
			case 'QueerAnswer':
				this.img = new Image();
				this.img.onload = function() {
					t.ctx.drawImage(t.img, 180, 0, t.img.width, t.img.height);

					//hidden canvas
					t.hCtx.drawImage(t.img, 180, 0, t.img.width, t.img.height);
				}
				this.img.src = 'assets/images/icon-queerflower.png';
				break;
			default:
				console.log("x: " + evt.clientX + " y: " + evt.clientY);
				//Do Nothing
		}
	}

	mouseUp(evt): void {
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
		switch(this.editMode) {
			case 'Line':
				break;
			default:
				//Do Nothing
		}
	}

	mouseOut(evt): void {
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

	saveImage(): void {
		let dataUrl = this.canvas.toDataURL("image/png");
		window.open(dataUrl);
		let hDataUrl = this.hCanvas.toDataURL("image/png");
		window.open(hDataUrl);
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
		this.img = new Image();
		let t = this;
		this.img.onload = function() {
			t.ctx.drawImage(t.img, 0, 0, t.img.width, t.img.height);

			//hidden canvas
			t.hCtx.drawImage(t.img, 0, 0, t.img.width, t.img.height);
		}
		this.img.src = 'assets/images/icon-bestanswer.png';
	}

	addFAQ(): void {
		this.img = new Image();
		let t = this;
		this.img.onload = function() {
			t.ctx.drawImage(t.img, 80, 0, t.img.width, t.img.height);

			//hidden canvas
			t.hCtx.drawImage(t.img, 80, 0, t.img.width, t.img.height);
		}
		this.img.src = 'assets/images/icon-faq.png';
	}

	addQueerAnswer(): void {
		this.img = new Image();
		let t = this;
		this.img.onload = function() {
			t.ctx.drawImage(t.img, 160, 0, t.img.width, t.img.height);

			//hidden canvas
			t.hCtx.drawImage(t.img, 160, 0, t.img.width, t.img.height);
		}
		this.img.src = 'assets/images/icon-queerflower.png';
	}

	addScore(): void {
		this.ctx.font = '28px serif';
		this.ctx.fillStyle = "red";
		this.ctx.fillText(this.score, 250, 28);

		//hidden canvas
		this.hCtx.font = '28px serif';
		this.hCtx.fillStyle = "red";
		this.hCtx.fillText(this.score, 250, 28);
		// TO Do: resize to resume the original size
		if (this.answer.paperImg !== "") {
			this.answer.answerImgData = this.canvas.toDataURL("image/png");
			this.answer.markImgData = this.hCanvas.toDataURL("image/png");
			this.parent.updatePaper();
		}
	}
}