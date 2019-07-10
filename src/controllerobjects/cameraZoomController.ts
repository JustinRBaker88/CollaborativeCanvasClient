import "phaser";

export class CameraZoomController {
  targetCamera: Phaser.Cameras.Scene2D.Camera;
  scene: Phaser.Scene;

  minZoom: number = 5;
  maxZoom: number = 70;

  constructor(camera : Phaser.Cameras.Scene2D.Camera, scene: Phaser.Scene, config? : any) {

    this.targetCamera = camera;
    this.scene = scene;

    this.initEventListeners();

    // TODO: implement Config object and config initilization method
  }

  private initEventListeners() {
    this.scene.input.on(Phaser.Input.Events.POINTER_WHEEL, this.scrollWheelHandler, this);
  }


  private zoomPercentToValue(percent : number) : number {
    return this.minZoom * Math.exp(percent*(Math.log(this.maxZoom/this.minZoom)/100));
  }

  private zoomValueToPercent(zoom : number) : number {
    return (100*Math.log(zoom/this.minZoom))/Math.log(this.maxZoom/this.minZoom);
  }

  private scrollWheelHandler(pointer : Phaser.Input.Pointer) {
    const deltaZoom = Math.abs(pointer.deltaY);
    let percent = this.zoomValueToPercent(this.targetCamera.zoom);

    // mouse wheel down, zoom out
    if (pointer.deltaY > 0) {
      percent = Phaser.Math.Clamp(percent - deltaZoom, 0 , 100);
    }
    // mouse wheel up, zoom in
    else if (pointer.deltaY < 0) {
      percent = Phaser.Math.Clamp(percent + deltaZoom, 0 , 100);
    }

    this.targetCamera.setZoom(this.zoomPercentToValue(percent));
  }

  
}