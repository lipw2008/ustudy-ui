import { Component, OnInit, AfterViewInit, ViewChild, Renderer2, Input, OnChanges, Inject, forwardRef, EventEmitter }  from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../../shared.service';
import { ProblemComponent } from './problem.component';

@Component({
	selector: 'paper-canvas',
    templateUrl: 'expaper.component.html'
})

export class ExpaperComponent implements OnInit {
	@Input() paperImg: string;

	/***** View *****/
	@ViewChild('paperCanvas') paperCanvas;

	container: any;
	canvas: any;
	ctx: any;

    constructor(private _sharedService: SharedService, private renderer: Renderer2, private route: ActivatedRoute,
    	@Inject(forwardRef(()=>ProblemComponent)) public parent: ProblemComponent) {

    }

    ngOnInit(): void {
    	console.log("canvas init" + this.paperImg);

	}

	ngOnChanges(): void {
		console.log("canvas change"  + this.paperImg);
		if (this.canvas === undefined) {
			return;
		}
		console.log("canvas before load paper"  + this.paperImg);
		this.loadPaper();
	}

	ngAfterViewInit(): void {
		console.log("canvas afterview" + this.paperImg);
		this.container = this.parent.paperContainer.nativeElement;

		this.canvas = this.paperCanvas.nativeElement;
		this.ctx = this.canvas.getContext("2d");

		this.loadPaper();
	}

	loadPaper() {
		var promiseArray = [];
		console.log("loadPaper()");
		// total canvas width
		let canvasW = this.container.clientWidth - 20; //leave 20px for the scroll bar

		// total canvas height
		let canvasH = 0;

		// set the total size of the canvas
		this.ctx.canvas.width = canvasW;

		let paperImg = new Image();

		paperImg.crossOrigin = "anonymous";
		let t = this;
		paperImg.onload = function() {
			t.ctx.canvas.height = (t.ctx.canvas.width/paperImg.width) * paperImg.height ;
			t.ctx.drawImage(paperImg, 0, 0, paperImg.width, paperImg.height, 0, 0, t.ctx.canvas.width, t.ctx.canvas.height);
		}
		paperImg.onerror = function() {
			alert("无法加载试卷！");
		}
		paperImg.src = this._sharedService.getImgUrl(this.paperImg, '');
	}
}
