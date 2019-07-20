import "phaser";

export class CameraZoomController {
  targetCamera: Phaser.Cameras.Scene2D.Camera;
  scene: Phaser.Scene;

  zoomPercent : number = .2;

  minZoom: number = .5;
  maxZoom: number = 100;

  constructor(camera : Phaser.Cameras.Scene2D.Camera, scene: Phaser.Scene, initialZoom?: number, config? : any) {

    this.targetCamera = camera;
    this.scene = scene;

    if (initialZoom != null) {
      this.zoomPercent = initialZoom;
    }
    this.setZoomPercent(this.zoomPercent);

    this.initEventListeners();

    // TODO: implement Config object and config initilization method
  }

  private zoomFromPercent(percent : number) : number {
    return this.minZoom + (this.maxZoom-this.minZoom)*Phaser.Math.Easing.Expo.In(this.zoomPercent);
  }

  private initEventListeners() {
    this.scene.input.on(Phaser.Input.Events.POINTER_WHEEL, this.scrollWheelHandler, this);
  }

  public setZoomPercent(percent: number) {
    this.zoomPercent = Phaser.Math.Clamp(percent, 0, 100);
    this.targetCamera.setZoom(this.zoomFromPercent(this.zoomPercent));
  }

  private scrollWheelHandler(pointer : Phaser.Input.Pointer) {
    // Relative position of pointer at time of zoom event
    const pointerPercentX : number = (pointer.x / this.targetCamera.width);
    const pointerPercentY : number = (pointer.y / this.targetCamera.height);
    
    const deltaZoom = (pointer.deltaY * -1)/100;
    this.zoomPercent = Phaser.Math.Clamp(this.zoomPercent + deltaZoom ,0,1);

    const oldDisplayWidth : number = this.targetCamera.displayWidth;
    const oldDisplayHeight : number = this.targetCamera.displayHeight;

    this.targetCamera.setZoom(this.zoomFromPercent(this.zoomPercent));

    const newDisplayWidth : number = this.targetCamera.displayWidth;
    const newDisplayHeight : number = this.targetCamera.displayHeight;

    this.targetCamera.scrollX -= (pointerPercentX-.5)*(newDisplayWidth - oldDisplayWidth);
    this.targetCamera.scrollY -= (pointerPercentY-.5)*(newDisplayHeight - oldDisplayHeight);

  }

  
}