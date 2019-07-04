import "phaser";
import { CanvasTile } from '../gameobjects/tile';
import { CameraUtil } from '../util/cameraUtil';

export class Canvas extends Phaser.Scene {

  canvasGroup: Array<Array<CanvasTile>>;
  mCamera: Phaser.Cameras.Scene2D.Camera;
  // cameraController: Phaser.Cameras.Controls.SmoothedKeyControl;

  readonly CANVASWIDTH: number = 10;
  readonly CANVASHEIGHT: number = 10;


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
    // Set up the arrows to control the camera
    // const cursors = this.input.keyboard.createCursorKeys();
    // const controlConfig : Phaser.Types.Cameras.Controls.SmoothedKeyControlConfig= {
    //   camera: this.cameras.main,
    //   left: cursors.left,
    //   right: cursors.right,
    //   up: cursors.up,
    //   down: cursors.down,
    //   zoomIn: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q),
    //   zoomOut: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E),
    //   zoomSpeed: 0.1,
    //   acceleration: 0.12,
    //   drag: 0.0005,
    //   maxSpeed: 1.0
    // };
    // this.cameraController = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig);

  }

  update(time: number, delta: number): void {
    // this.cameraController.update(delta);
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
  }

  private pointerDownHandler(pointer : Phaser.Input.Pointer) {
    if (pointer.primaryDown) {
      let coordinates : Phaser.Math.Vector2 = new Phaser.Math.Vector2(); 
      pointer.positionToCamera(this.mCamera, coordinates);
      console.log("Camera coordinates: x = " + Math.floor(coordinates.x) + " y = " + Math.floor(coordinates.y));
      console.log("event triggered: x = " + Math.floor(pointer.worldX) + " y = " + Math.floor(pointer.worldY));
      const x: number = Math.floor(pointer.worldX);
      const y: number = Math.floor(pointer.worldY);
      let tile = this.canvasGroup[x][y] as CanvasTile;
      tile.randomizeColor();
    }
  }
};
