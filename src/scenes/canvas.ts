import "phaser";
import { CanvasTile } from '../gameobjects/tile';
import { CameraUtil } from '../util/cameraUtil';

export class Canvas extends Phaser.Scene {

  canvasGroup: Array<Array<CanvasTile>>;
  mCamera: Phaser.Cameras.Scene2D.Camera;

  readonly CANVASWIDTH: number = 20;
  readonly CANVASHEIGHT: number = 20;


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
    this.input.on(Phaser.Input.Events.POINTER_WHEEL, this.scrollWheelHandler, this);
  }

  update(time: number, delta: number): void {
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
    this.input.on(Phaser.Input.Events.POINTER_DOWN, this.pointerDownHandler, this);
  }

  private initCamera() : void {
    this.mCamera = this.cameras.main;

    CameraUtil.setCameraWidth(this.mCamera,this.CANVASWIDTH);
    this.mCamera.setBounds(0,0,this.CANVASWIDTH + 1,this.CANVASHEIGHT + 1);
    this.mCamera.centerOn(5,5);
    this.input.on(Phaser.Input.Events.DRAG, this.dragHandler, this);
  }

  private pointerDownHandler(pointer : Phaser.Input.Pointer) {
    if (pointer.primaryDown) {
      let coordinates : Phaser.Math.Vector2 = new Phaser.Math.Vector2(); 
      pointer.positionToCamera(this.mCamera, coordinates);
      const x: number = Math.floor(pointer.worldX);
      const y: number = Math.floor(pointer.worldY);
      let tile = this.canvasGroup[x][y] as CanvasTile;
      tile.randomizeColor();
    }
  }

  private dragHandler(pointer : Phaser.Input.Pointer) {
    console.log("In drag event handler");
    this.mCamera.setScroll(this.mCamera.x + pointer.deltaX, this.mCamera.y + pointer.deltaY);
  }

  private scrollWheelHandler(pointer : Phaser.Input.Pointer) {

    if (pointer.deltaY > 0) {
      this.mCamera.zoom -= 1;
    }
    else if (pointer.deltaY < 0) {
      this.mCamera.zoom += 1;
    }
  }
};
