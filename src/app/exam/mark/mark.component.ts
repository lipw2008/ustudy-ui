import { Component, OnInit, AfterViewInit, ViewChild, Renderer2 }  from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../../shared.service';

@Component({
    templateUrl: 'mark.component.html'
})

export class MarkComponent implements OnInit {

	/***** Model *****/

	markId: string;
	mark: any;

	/***** View *****/
	@ViewChild('markCanvas') markCanvas;
	@ViewChild('markContainer') markContainer;
	@ViewChild('rootContainer') rootContainer;

	rootContainerElement: any;
	container: any;
	canvas: any;
	cxt: any;
	img: any;

	// hidden canvas
	hCanvas: any;
	hCxt: any;

	editMode: string = 'None';

	// Draw Line
	isDrawingLine: boolean = false;

	// Draw Circle
	circleBeginX = 0;
	circleBeginY = 0;

    constructor(private _sharedService: SharedService, private renderer: Renderer2, private route: ActivatedRoute) {

    }

    ngOnInit(): void {
    	this.markId = this.route.snapshot.params.markId;
    	this.reload();
	}

	reload(): void {
		this._sharedService.makeRequest('GET', 'assets/api/exams/mark.json', '').then((data: any) => {
			//cache the list
			console.log("data: " + JSON.stringify(data));
			this.mark = data;
		}).catch((error: any) => {
			console.log(error.status);
			console.log(error.statusText);
		});
	}

	ngAfterViewInit(): void {
		this.container = this.markContainer.nativeElement;
		this.canvas = this.markCanvas.nativeElement;
		this.rootContainerElement = this.rootContainer.nativeElement;
		console.log(this.canvas);
		
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

		this.cxt = this.canvas.getContext("2d");

		// hidden canvas
		this.hCanvas = document.createElement("canvas");
		this.hCxt = this.hCanvas.getContext("2d");

		this.img = new Image();

		let t = this;
		this.img.onload = function() {
			t.cxt.canvas.width = t.container.offsetWidth;
			t.cxt.canvas.height = t.img.height * (t.cxt.canvas.width/t.img.width);
			t.cxt.drawImage(t.img, 0, 0, t.img.width, t.img.height, 0, 0, t.cxt.canvas.width, t.cxt.canvas.height);
			//hidden canvas
			t.hCxt.canvas.width = t.cxt.canvas.width;
			t.hCxt.canvas.height = t.cxt.canvas.height;
		}
		this.img.src = 'assets/api/exams/exam01.png';
	}

	clear(): void {
		let t = this;
		this.img.onload = function() {
			t.cxt.canvas.width = t.container.offsetWidth;
			t.cxt.canvas.height = t.img.height * (t.cxt.canvas.width/t.img.width);
			t.cxt.drawImage(t.img, 0, 0, t.img.width, t.img.height, 0, 0, t.cxt.canvas.width, t.cxt.canvas.height);
			//hidden canvas
			t.hCxt.canvas.width = t.cxt.canvas.width;
			t.hCxt.canvas.height = t.cxt.canvas.height;
		}
		this.img.src = 'assets/api/exams/exam01.png';
	}

	mouseDown(evt): void {
		switch(this.editMode) {
			case 'Line':
				this.cxt.beginPath();
				this.cxt.moveTo(evt.offsetX == undefined? evt.layerX: evt.offsetX, evt.offsetY == undefined? evt.layerY: evt.offsetY);
				
				//hidden canvas
				this.hCxt.beginPath();
				this.hCxt.moveTo(evt.offsetX == undefined? evt.layerX: evt.offsetX, evt.offsetY == undefined? evt.layerY: evt.offsetY);
				
				this.isDrawingLine = true;
				break;
			case 'Circle':
				this.cxt.beginPath();

				//hidden canvas
				this.hCxt.beginPath();

				this.circleBeginX = evt.offsetX == undefined? evt.layerX: evt.offsetX;
				this.circleBeginY = evt.offsetY == undefined? evt.layerY: evt.offsetY;
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
    					this.cxt.font = '36px serif';
    					this.cxt.fillStyle = "red";
    					this.cxt.fillText(textbox.value, (tEvt.offsetX == undefined || tEvt.offsetX == 0) ? tEvt.layerX: tEvt.offsetX, 
						((tEvt.offsetY == undefined || tEvt.offsetY == 0) ? tEvt.layerY: tEvt.offsetY) + 36);

						//hidden canvas
    					this.hCxt.font = '36px serif';
    					this.hCxt.fillStyle = "red";
    					this.hCxt.fillText(textbox.value, (tEvt.offsetX == undefined || tEvt.offsetX == 0) ? tEvt.layerX: tEvt.offsetX, 
						((tEvt.offsetY == undefined || tEvt.offsetY == 0) ? tEvt.layerY: tEvt.offsetY) + 36);

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
				// console.log(evt.offsetX == undefined? evt.layerX: evt.offsetX);
				break;
			case 'Help':
				this.img = new Image();
				let t = this;
				this.img.onload = function() {
					t.cxt.drawImage(t.img, evt.offsetX == undefined? evt.layerX: evt.offsetX, evt.offsetY == undefined? evt.layerY: evt.offsetY, t.img.width, t.img.height);

					//hidden canvas
					t.hCxt.drawImage(t.img, evt.offsetX == undefined? evt.layerX: evt.offsetX, evt.offsetY == undefined? evt.layerY: evt.offsetY, t.img.width, t.img.height);
				}
				this.img.src = 'assets/images/icon-help.png';
				break;
			case 'Like':
				this.img = new Image();
				t = this;
				this.img.onload = function() {
					t.cxt.drawImage(t.img, evt.offsetX == undefined? evt.layerX: evt.offsetX, evt.offsetY == undefined? evt.layerY: evt.offsetY, t.img.width, t.img.height);

					//hidden canvas
					t.hCxt.drawImage(t.img, evt.offsetX == undefined? evt.layerX: evt.offsetX, evt.offsetY == undefined? evt.layerY: evt.offsetY, t.img.width, t.img.height);
				}
				this.img.src = 'assets/images/icon-like.png';
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
					this.cxt.lineTo(evt.offsetX == undefined? evt.layerX: evt.offsetX, evt.offsetY == undefined? evt.layerY: evt.offsetY);
					this.cxt.lineWidth = 3;
					this.cxt.strokeStyle = "red";
					this.cxt.stroke();
					this.cxt.closePath();

					//hidden canvas
					this.hCxt.lineTo(evt.offsetX == undefined? evt.layerX: evt.offsetX, evt.offsetY == undefined? evt.layerY: evt.offsetY);
					this.hCxt.lineWidth = 3;
					this.hCxt.strokeStyle = "red";
					this.hCxt.stroke();
					this.hCxt.closePath();
					
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
				this.cxt.save();
				this.cxt.scale(radioX, radioY);
				this.cxt.beginPath();
				this.cxt.lineWidth = 3;
				this.cxt.strokeStyle = "red";
				this.cxt.moveTo((centerX+a)/radioX, centerY/radioY);
				this.cxt.arc(centerX/radioX, centerY/radioY, r, 0, 2*Math.PI);
				this.cxt.closePath();
				this.cxt.stroke();
				this.cxt.restore();

				// hidden canvas
				this.hCxt.save();
				this.hCxt.scale(radioX, radioY);
				this.hCxt.beginPath();
				this.hCxt.lineWidth = 3;
				this.hCxt.strokeStyle = "red";
				this.hCxt.moveTo((centerX+a)/radioX, centerY/radioY);
				this.hCxt.arc(centerX/radioX, centerY/radioY, r, 0, 2*Math.PI);
				this.hCxt.closePath();
				this.hCxt.stroke();
				this.hCxt.restore();

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

	drawLine(): void {
		this.editMode = 'Line';
	}

	drawCircle(): void {
		this.editMode = 'Circle';
	}

	drawText(): void {
		this.editMode = 'Text';
	}

	addLike(): void {
		this.editMode = 'Like';
	}

	addHelp(): void {
		this.editMode = 'Help';
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
			t.cxt.drawImage(t.img, 0, 150, t.img.width, t.img.height-150, 0, 150, t.cxt.canvas.width, t.cxt.canvas.height-150);
		}
		this.img.src = 'assets/api/exams/hidden.png';
	}

	addBestAnswer(): void {
		this.img = new Image();
		let t = this;
		this.img.onload = function() {
			t.cxt.drawImage(t.img, 0, 0, t.img.width, t.img.height);

			//hidden canvas
			t.hCxt.drawImage(t.img, 0, 0, t.img.width, t.img.height);
		}
		this.img.src = 'assets/images/icon-bestanswer.png';
	}

	addFAQ(): void {
		this.img = new Image();
		let t = this;
		this.img.onload = function() {
			t.cxt.drawImage(t.img, 80, 0, t.img.width, t.img.height);

			//hidden canvas
			t.hCxt.drawImage(t.img, 80, 0, t.img.width, t.img.height);
		}
		this.img.src = 'assets/images/icon-faq.png';
	}

	addQueerAnswer(): void {
		this.img = new Image();
		let t = this;
		this.img.onload = function() {
			t.cxt.drawImage(t.img, 160, 0, t.img.width, t.img.height);

			//hidden canvas
			t.hCxt.drawImage(t.img, 160, 0, t.img.width, t.img.height);
		}
		this.img.src = 'assets/images/icon-queerflower.png';
	}
}