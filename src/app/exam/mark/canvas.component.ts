import { Component, OnInit, AfterViewInit, ViewChild, Renderer2, Input, OnChanges, Inject, forwardRef }  from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../../shared.service';
import { MarkComponent } from './mark.component';

@Component({
    selector: 'mark-canvas',
    templateUrl: 'canvas.component.html'
})

export class CanvasComponent implements OnInit {
    @Input() imgPath: string;
    @Input() editMode: string;
    @Input() score: string;
    curImgPath = '';

    /***** View *****/
    @ViewChild('markCanvas') markCanvas;

    rootContainerElement: any;
    container: any;
    canvas: any;
    cxt: any;
    img: any;
    //imgPath: string;

    // hidden canvas
    hCanvas: any;
    hCxt: any;

    // Draw Line
    isDrawingLine = false;

    // Draw Circle
    circleBeginX = 0;
    circleBeginY = 0;

    constructor(private _sharedService: SharedService, private renderer: Renderer2, private route: ActivatedRoute,
    @Inject(forwardRef(() => MarkComponent)) public parent: MarkComponent) {

    }

    ngOnInit(): void {

    }

    ngOnChanges(): void {
        if (this.curImgPath !== this.imgPath || this.editMode === 'Clear') {
            this.curImgPath = this.imgPath;
            this.loadPaper();
        } else if (this.editMode === 'Score') {
            this.addScore();
        }
    }

    ngAfterViewInit(): void {
        this.canvas = this.markCanvas.nativeElement;
        this.container = this.parent.markContainer.nativeElement;
        this.rootContainerElement = this.parent.rootContainer.nativeElement;
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

        this.cxt = this.canvas.getContext('2d');

        // hidden canvas
        this.hCanvas = document.createElement('canvas');
        this.hCxt = this.hCanvas.getContext('2d');

        //this.imgPath = 'assets/api/exams/exam01.png'
        this.loadPaper();
    }

    loadPaper(): void {

        this.img = new Image();

        const t = this;
        this.img.onload = function() {
            t.cxt.canvas.width = t.container.offsetWidth;
            t.cxt.canvas.height = t.img.height * (t.cxt.canvas.width / t.img.width);
            t.cxt.drawImage(t.img, 0, 0, t.img.width, t.img.height, 0, 0, t.cxt.canvas.width, t.cxt.canvas.height);
            //hidden canvas
            t.hCxt.canvas.width = t.cxt.canvas.width;
            t.hCxt.canvas.height = t.cxt.canvas.height;
        }
        this.img.src = this.imgPath;
    }

    clear(): void {
        const t = this;
        this.img.onload = function() {
            t.cxt.canvas.width = t.container.offsetWidth;
            t.cxt.canvas.height = t.img.height * (t.cxt.canvas.width / t.img.width);
            t.cxt.drawImage(t.img, 0, 0, t.img.width, t.img.height, 0, 0, t.cxt.canvas.width, t.cxt.canvas.height);
            //hidden canvas
            t.hCxt.canvas.width = t.cxt.canvas.width;
            t.hCxt.canvas.height = t.cxt.canvas.height;
        }
        this.img.src = this.imgPath;
    }

    mouseDown(evt): void {
        const t = this;
        const x = (evt.offsetX == undefined || evt.offsetX == 0 ? evt.layerX : evt.offsetX);
        const y = (evt.offsetY == undefined || evt.offsetY == 0 ? evt.layerY : evt.offsetY);

        switch (this.editMode) {
            case 'Line':
                this.cxt.beginPath();
                this.cxt.moveTo(x, y);

                //hidden canvas
                this.hCxt.beginPath();
                this.hCxt.moveTo(x, y);

                this.isDrawingLine = true;
                break;
            case 'Circle':
                this.cxt.beginPath();

                //hidden canvas
                this.hCxt.beginPath();

                this.circleBeginX = x;
                this.circleBeginY = y;
                break;
            case 'Text':
                const textbox = document.createElement('input');
                textbox.type = 'text';
                textbox.style.position = 'absolute';
                textbox.style.left = evt.clientX + 'px';
                textbox.style.top = evt.clientY + 'px';
                textbox.style.display = 'inline';
                textbox.setAttribute('autofocus', '');
                const tEvt = evt;
                this.renderer.listen(textbox, 'keyup', (evt) => {
                    if (evt.keyCode == 13) {
                        console.log(textbox.value);
                        this.cxt.font = '36px serif';
                        this.cxt.fillStyle = 'red';
                        this.cxt.fillText(textbox.value, x, y + 36);

                        //hidden canvas
                        this.hCxt.font = '36px serif';
                        this.hCxt.fillStyle = 'red';
                        this.hCxt.fillText(textbox.value, x, y + 36);

                        console.log(tEvt.layerX);
                        console.log(tEvt.offsetX);
                        textbox.parentNode.removeChild(textbox);
                    }
                });
                this.rootContainerElement.appendChild(textbox);
                textbox.focus();
                console.log(textbox);
                console.log('x: ' + evt.clientX + ' y: ' + evt.clientY);
                // console.log(this.canvas.offsetLeft);
                break;
            case 'Help':
                this.img = new Image();
                this.img.onload = function() {
                    t.cxt.drawImage(t.img, x, y, t.img.width, t.img.height);

                    //hidden canvas
                    t.hCxt.drawImage(t.img, x, y, t.img.width, t.img.height);
                }
                this.img.src = 'assets/images/icon-help.png';
                break;
            case 'Like':
                this.img = new Image();
                this.img.onload = function() {
                    t.cxt.drawImage(t.img, x, y, t.img.width, t.img.height);

                    //hidden canvas
                    t.hCxt.drawImage(t.img, x, y, t.img.width, t.img.height);
                }
                this.img.src = 'assets/images/icon-like.png';
                break;
            case 'BestAnswer':
                this.img = new Image();
                this.img.onload = function() {
                    console.log('img height:' + t.img.height);
                    t.cxt.drawImage(t.img, 0, 0, t.img.width, t.img.height);

                    //hidden canvas
                    t.hCxt.drawImage(t.img, 0, 0, t.img.width, t.img.height);
                }
                this.img.src = 'assets/images/icon-bestanswer.png';
                break;
            case 'FAQ':
                this.img = new Image();
                this.img.onload = function() {
                    t.cxt.drawImage(t.img, 90, 0, t.img.width, t.img.height);

                    //hidden canvas
                    t.hCxt.drawImage(t.img, 90, 0, t.img.width, t.img.height);
                }
                this.img.src = 'assets/images/icon-faq.png';
                break;
            case 'QueerAnswer':
                this.img = new Image();
                this.img.onload = function() {
                    t.cxt.drawImage(t.img, 180, 0, t.img.width, t.img.height);

                    //hidden canvas
                    t.hCxt.drawImage(t.img, 180, 0, t.img.width, t.img.height);
                }
                this.img.src = 'assets/images/icon-queerflower.png';
                break;
            default:
                console.log('x: ' + evt.clientX + ' y: ' + evt.clientY);
                //Do Nothing
        }
    }

    mouseUp(evt): void {
        switch (this.editMode) {
            case 'Line':
                if (this.isDrawingLine === true) {
                    this.isDrawingLine = false;
                    this.cxt.lineTo(evt.offsetX == undefined ? evt.layerX : evt.offsetX, evt.offsetY == undefined ? evt.layerY : evt.offsetY);
                    this.cxt.lineWidth = 3;
                    this.cxt.strokeStyle = 'red';
                    this.cxt.stroke();
                    this.cxt.closePath();

                    //hidden canvas
                    this.hCxt.lineTo(evt.offsetX == undefined ? evt.layerX : evt.offsetX, evt.offsetY == undefined ? evt.layerY : evt.offsetY);
                    this.hCxt.lineWidth = 3;
                    this.hCxt.strokeStyle = 'red';
                    this.hCxt.stroke();
                    this.hCxt.closePath();

                }
                break;
            case 'Circle':
                let circleEndX = 0;
                let circleEndY = 0;
                // Deal with drawing from right to left
                if (this.circleBeginX > (evt.offsetX == undefined ? evt.layerX : evt.offsetX)) {
                    circleEndX = this.circleBeginX;
                    this.circleBeginX = evt.offsetX == undefined ? evt.layerX : evt.offsetX;
                } else {
                    circleEndX = evt.offsetX == undefined ? evt.layerX : evt.offsetX;
                }
                // Deal with drawing from bottom to top
                if (this.circleBeginY > (evt.offsetY == undefined ? evt.layerY : evt.offsetY)) {
                    circleEndY = this.circleBeginY;
                    this.circleBeginY = evt.offsetY == undefined ? evt.layerY : evt.offsetY;
                } else {
                    circleEndY = evt.offsetY == undefined ? evt.layerY : evt.offsetY;
                }
                const calX = circleEndX - this.circleBeginX;
                const calY = circleEndY - this.circleBeginY;
                const r = Math.pow(calX * calX + calY * calY, 0.5) / 2;
                const a = r;
                const b = r / 2;
                const centerX = this.circleBeginX + calX / 2;
                const centerY = this.circleBeginY + calY / 2;
                const radioX = a / r;
                const radioY = b / r;
                this.cxt.save();
                this.cxt.scale(radioX, radioY);
                this.cxt.beginPath();
                this.cxt.lineWidth = 3;
                this.cxt.strokeStyle = 'red';
                this.cxt.moveTo((centerX + a) / radioX, centerY / radioY);
                this.cxt.arc(centerX / radioX, centerY / radioY, r, 0, 2 * Math.PI);
                this.cxt.closePath();
                this.cxt.stroke();
                this.cxt.restore();

                // hidden canvas
                this.hCxt.save();
                this.hCxt.scale(radioX, radioY);
                this.hCxt.beginPath();
                this.hCxt.lineWidth = 3;
                this.hCxt.strokeStyle = 'red';
                this.hCxt.moveTo((centerX + a) / radioX, centerY / radioY);
                this.hCxt.arc(centerX / radioX, centerY / radioY, r, 0, 2 * Math.PI);
                this.hCxt.closePath();
                this.hCxt.stroke();
                this.hCxt.restore();

                break;
            default:
                //Do Nothing
        }
    }

    mouseMove(evt): void {
        switch (this.editMode) {
            case 'Line':
                break;
            default:
                //Do Nothing
        }
    }

    mouseOut(evt): void {
        switch (this.editMode) {
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
        const dataUrl = this.canvas.toDataURL('image/png');
        window.open(dataUrl);
        const hDataUrl = this.hCanvas.toDataURL('image/png');
        window.open(hDataUrl);
    }

    addImage(): void {
        this.img = new Image();
        const t = this;
        this.img.onload = function() {
            // If the size of image is small, scale it to fit the container.
            console.log('image width:' + t.img.width + ' container.width:' + t.container.style.width);
            // TODO: change 800 to real time container width later.
            t.cxt.drawImage(t.img, 0, 150, t.img.width, t.img.height - 150, 0, 150, t.cxt.canvas.width, t.cxt.canvas.height - 150);
        }
        this.img.src = 'assets/api/exams/hidden.png';
    }

    addBestAnswer(): void {
        this.img = new Image();
        const t = this;
        this.img.onload = function() {
            t.cxt.drawImage(t.img, 0, 0, t.img.width, t.img.height);

            //hidden canvas
            t.hCxt.drawImage(t.img, 0, 0, t.img.width, t.img.height);
        }
        this.img.src = 'assets/images/icon-bestanswer.png';
    }

    addFAQ(): void {
        this.img = new Image();
        const t = this;
        this.img.onload = function() {
            t.cxt.drawImage(t.img, 80, 0, t.img.width, t.img.height);

            //hidden canvas
            t.hCxt.drawImage(t.img, 80, 0, t.img.width, t.img.height);
        }
        this.img.src = 'assets/images/icon-faq.png';
    }

    addQueerAnswer(): void {
        this.img = new Image();
        const t = this;
        this.img.onload = function() {
            t.cxt.drawImage(t.img, 160, 0, t.img.width, t.img.height);

            //hidden canvas
            t.hCxt.drawImage(t.img, 160, 0, t.img.width, t.img.height);
        }
        this.img.src = 'assets/images/icon-queerflower.png';
    }

    addScore(): void {
        this.cxt.font = '28px serif';
        this.cxt.fillStyle = 'red';
        this.cxt.fillText(this.score, 250, 28);

        //hidden canvas
        this.hCxt.font = '28px serif';
        this.hCxt.fillStyle = 'red';
        this.hCxt.fillText(this.score, 250, 28);
    }
}
