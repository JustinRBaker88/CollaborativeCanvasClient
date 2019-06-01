import "phaser";
import { CanvasTile } from "../gameobjects/tile";

export class Canvas extends Phaser.Scene {

  canvas: Phaser.GameObjects.Group;
  mCamera: Phaser.Cameras.Scene2D.Camera;
  cameraController: Phaser.Cameras.Controls.SmoothedKeyControl;

  readonly CANVASWIDTH: number = 64;
  readonly CANVASHEIGHT: number = 64;


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
    const cursors = this.input.keyboard.createCursorKeys();
    const controlConfig : Phaser.Types.Cameras.Controls.SmoothedKeyControlConfig= {
      camera: this.cameras.main,
      left: cursors.left,
      right: cursors.right,
      up: cursors.up,
      down: cursors.down,
      zoomIn: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q),
      zoomOut: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E),
      zoomSpeed: 0.1,
      acceleration: 0.06,
      drag: 0.0005,
      maxSpeed: 1.0
  };
    this.cameraController = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig);

  }

  update(time: number, delta: number): void {
    this.cameraController.update(delta);
    // console.log('test');
  }

  private initCanvas() {
    let color : Phaser.Display.Color = new Phaser.Display.Color();

    for (let i = 0; i < this.CANVASWIDTH; i++) {
      for (let j = 0; j < this.CANVASHEIGHT; j++) {
        color.random();
        this.add.existing(new CanvasTile(this, i, j, color));
      }
    }
    color.setTo(0,0,0);
  }

  private initCamera() {
    this.mCamera = this.cameras.main;
    this.mCamera.setBounds(-1,-1,this.CANVASWIDTH,this.CANVASHEIGHT);
    this.mCamera.setZoom(this.CANVASWIDTH/this.mCamera.width);
    this.mCamera.setScroll(0,0);
  }
};
