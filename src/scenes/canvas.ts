import "phaser";
import { CanvasTile } from '../gameobjects/tile';
import { CameraUtil } from '../util/cameraUtil';
import { CameraDragController } from '../controllerobjects/cameraDragController';
import { CameraZoomController } from '../controllerobjects/cameraZoomController';

export class Canvas extends Phaser.Scene {

  canvasGroup: Array<Array<CanvasTile>>;
  mCamera: Phaser.Cameras.Scene2D.Camera;

  cameraDragController : CameraDragController;
  cameraZoomController : CameraZoomController;

  debugText : Phaser.GameObjects.Text;

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
    this.cameraZoomController = new CameraZoomController(this.mCamera, this);

    // this.debugText = this.scene.get("CanvasUI").add.text(0, 0, "test").setScrollFactor(0);
    // this.debugText.setShadow(1, 1, '#000000', 2);

    // this.debugText.scale = 3;
  }

  update(time: number, delta: number): void {
    this.cameraDragController.update(delta);

    // this.debugText.setText(['x       : ' + this.mCamera.scrollX.toFixed(1), 
    //                         'y       : ' + this.mCamera.scrollY.toFixed(1),
    //                         'zoom    : ' + this.mCamera.zoom.toFixed(1),
    //                         'midpoint: ' + "[" + this.mCamera.midPoint.x.toFixed(1) +", " + this.mCamera.midPoint.y.toFixed(1),
    //                         'DspSize : ' + "[" +  this.mCamera.displayWidth.toFixed(1) + ", " + this.mCamera.displayHeight.toFixed(1) + "]",
    //                         'pointer : ' + "[" + (this.input.x/this.mCamera.width).toFixed(3) + ", " + (this.input.y/this.mCamera.height).toFixed(3) +"]",
    //                         'wPointer: ' + "[" + this.input.activePointer.worldX.toFixed(1) + ", " +this.input.activePointer.worldY.toFixed(1) +"]"]);
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
  }

  private initCamera() : void {
    this.mCamera = this.cameras.main;

    CameraUtil.setCameraWidth(this.mCamera,this.CANVASWIDTH);
    //this.mCamera.setBounds(-100, -100, 500,500);
    this.mCamera.centerOn(0,0);
  }

  private pointerDownHandler(pointer : Phaser.Input.Pointer) {
    if (pointer.primaryDown) {

      let coordinates : Phaser.Math.Vector2 = new Phaser.Math.Vector2(); 
      pointer.positionToCamera(this.mCamera, coordinates);
      const x: number = Math.floor(pointer.worldX);
      const y: number = Math.floor(pointer.worldY);

      if (x < this.CANVASWIDTH && y < this.CANVASHEIGHT && x >= 0 && y >= 0) {
        let tile = this.canvasGroup[x][y] as CanvasTile;
        if (tile != null) {
          tile.randomizeColor();
        }
      }
    }
  }
};
