import { Component, OnInit, AfterViewInit, ViewChild, Renderer2 }  from '@angular/core';

import { SharedService } from '../../shared.service';

@Component({
    templateUrl: 'mark.component.html'
})

export class MarkComponent implements OnInit {

	@ViewChild('markCanvas') markCanvas;
	@ViewChild('markContainer') markContainer;

	container: any;
	canvas: any;
	cxt: any;
	img: any;

	editMode: string = 'None';

	// Draw Line
	isDrawingLine: boolean = false;

	// Draw Circle
	circleBeginX = 0;
	circleBeginY = 0;

    constructor(private _sharedService: SharedService, private renderer: Renderer2) {

    }

    ngOnInit(): void {
	}	

	ngAfterViewInit(): void {
		this.container = this.markContainer.nativeElement;
		this.canvas = this.markCanvas.nativeElement;
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

		this.img = new Image();

		let t = this;
		this.img.onload = function() {
			// If the size of image is small, scale it to fit the container.
			console.log("image width:" + t.img.width + " container.width:" + t.container.style.width);
			// TODO: change 800 to real time container width later.
			if (t.img.width < 800) {
				t.cxt.canvas.width = 800;
				t.cxt.canvas.height = t.img.height * (800/t.img.width);
				t.cxt.drawImage(t.img, 0, 0, t.img.width, t.img.height, 0, 0, t.cxt.canvas.width, t.cxt.canvas.height);
			} else {
				t.cxt.canvas.width = t.img.width;
				t.cxt.canvas.height = t.img.height;
				t.cxt.drawImage(t.img, 0, 0, t.img.width, t.img.height);				
			}
		}
		this.img.src = 'assets/api/exams/exam01.png';
	}

	mouseDown(evt): void {
		switch(this.editMode) {
			case 'Line':
				this.cxt.beginPath();
				this.cxt.moveTo(evt.offsetX, evt.offsetY);
				this.isDrawingLine = true;
				break;
			case 'Circle':
				this.cxt.beginPath();
				this.circleBeginX = evt.offsetX;
				this.circleBeginY = evt.offsetY;
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
    					this.cxt.fillText(textbox.value, tEvt.offsetX, tEvt.offsetY + 36);
						textbox.parentNode.removeChild(textbox);
					}
    			});
				this.container.appendChild(textbox);
				textbox.focus();
				console.log(textbox);
				console.log(this.canvas.offsetLeft + ' ' + evt.offsetX);
				break;
			default:
				//Do Nothing
		}
	}

	mouseUp(evt): void {
		switch(this.editMode) {
			case 'Line':
				if (this.isDrawingLine === true) {
					this.isDrawingLine = false;
					this.cxt.lineTo(evt.offsetX, evt.offsetY);
					this.cxt.lineWidth = 3;
					this.cxt.strokeStyle = "red";
					this.cxt.stroke();
					this.cxt.closePath();
				}
				break;
			case 'Circle':
				let circleEndX = 0;
				let circleEndY = 0;
				// Deal with drawing from right to left
				if (this.circleBeginX > evt.offsetX) {
					circleEndX = this.circleBeginX;
					this.circleBeginX = evt.offsetX;
				} else {
					circleEndX = evt.offsetX;
				}
				// Deal with drawing from bottom to top
				if (this.circleBeginY > evt.offsetY) {
					circleEndY = this.circleBeginY;
					this.circleBeginY = evt.offsetY;
				} else {
					circleEndY = evt.offsetY;
				}
				let calX = circleEndX - this.circleBeginX;
				let calY = circleEndY - this.circleBeginY;
				let r = Math.pow(calX * calX + calY * calY, 0.5)/2;
				let centerX = this.circleBeginX + calX/2;
				let centerY = this.circleBeginY + calY/2;
				this.cxt.arc(centerX, centerY, r, 0, 2*Math.PI);
				this.cxt.lineWidth = 3;
				this.cxt.strokeStyle = "red";
				this.cxt.stroke();
				this.cxt.closePath();
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

	saveImage(): void {
		let dataUrl = this.canvas.toDataURL("image/png");
		window.open(dataUrl);
	}
}