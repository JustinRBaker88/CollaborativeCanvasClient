import "phaser";
import { CanvasTile } from '../gameobjects/tile';
import { CameraUtil } from '../util/cameraUtil';
import { CameraDragController } from '../controllerobjects/cameraDragController';

export class Canvas extends Phaser.Scene {

  canvasGroup: Array<Array<CanvasTile>>;
  mCamera: Phaser.Cameras.Scene2D.Camera;

  cameraDragController : CameraDragController;

  minZoom: number = 5;
  maxZoom: number = 70;

  zoomPercent : number;


  readonly CANVASWIDTH: number = 100;
  readonly CANVASHEIGHT: number = 100;


  constructor() {
    super({
      key: "Canvas"
    });
  }

  init(startData : Object): void {
    this.scene.launch("CanvasUI");
  }


  preload(): void {
  }

  create(startData: Object ): void {
    this.initCamera();
    this.initCanvas();
    this.initEvents();

    this.cameraDragController = new CameraDragController(this.mCamera, this); 

  }

  update(time: number, delta: number): void {
    this.cameraDragController.update(delta);
  }

  private initCanvas() {
    this.canvasGroup = new Array<Array<CanvasTile>>();

    for (let i = 1; i <= this.CANVASWIDTH; i++) {
      let row: Array<CanvasTile>  = new Array<CanvasTile>();
      for (let j = 1; j <= this.CANVASHEIGHT; j++) {
        let tile = new CanvasTile(this, i, j);
        this.add.existing(tile);
        tile.randomizeColor();
        row.push(tile);
      }
      this.canvasGroup.push(row);
    }
  }

  private initEvents() : void {
    this.input.on(Phaser.Input.Events.POINTER_DOWN, this.pointerDownHandler, this);
    this.input.on(Phaser.Input.Events.POINTER_WHEEL, this.scrollWheelHandler, this);
  }

  private initCamera() : void {
    this.mCamera = this.cameras.main;

    CameraUtil.setCameraWidth(this.mCamera,this.CANVASWIDTH);
    this.mCamera.centerOn(50,50);
    this.mCamera.setBounds(0, 0, 100,100);
    this.zoomPercent = this.zoomValueToPercent(this.mCamera.zoom);
    console.log("Starting percent zoom: " + this.zoomPercent);
  }

  private pointerDownHandler(pointer : Phaser.Input.Pointer) {
    if (pointer.primaryDown) {

      let coordinates : Phaser.Math.Vector2 = new Phaser.Math.Vector2(); 
      pointer.positionToCamera(this.mCamera, coordinates);
      const x: number = Math.floor(pointer.worldX);
      const y: number = Math.floor(pointer.worldY);

      if (x < this.CANVASWIDTH && y < this.CANVASHEIGHT) {
        let tile = this.canvasGroup[x][y] as CanvasTile;
        if (tile != null) {
          tile.randomizeColor();
        }
      }
    }
  }

  private zoomPercentToValue(percent : number) : number {
    return this.minZoom * Math.exp(percent*(Math.log(this.maxZoom/this.minZoom)/100));
  }

  private zoomValueToPercent(zoom : number) : number {
    return (100*Math.log(zoom/this.minZoom))/Math.log(this.maxZoom/this.minZoom);
  }

  private scrollWheelHandler(pointer : Phaser.Input.Pointer) {
    const deltaZoom = Math.abs(pointer.deltaY);
    let percent = this.zoomValueToPercent(this.mCamera.zoom);

    // mouse wheel down, zoom out
    if (pointer.deltaY > 0) {
      percent = Phaser.Math.Clamp(percent - deltaZoom, 0 , 100);
    }
    // mouse wheel up, zoom in
    else if (pointer.deltaY < 0) {
      percent = Phaser.Math.Clamp(percent + deltaZoom, 0 , 100);
    }

    this.mCamera.setZoom(this.zoomPercentToValue(percent));
    this.zoomPercent = percent;
  }
};
