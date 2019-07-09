import "phaser";

export class CameraDragController {
  targetCamera: Phaser.Cameras.Scene2D.Camera;
  scene: Phaser.Scene;

  pointerDown : boolean = false;
  pointerDragging: boolean = false;

  startX: number;
  startY: number;
  lastX: number = 0;
  lastY: number = 0;

  constructor(camera : Phaser.Cameras.Scene2D.Camera, scene: Phaser.Scene, config? : any) {
    this.targetCamera = camera;
    this.scene = scene;

    this.initEventListeners();

    // TODO: implement Config object and config initilization method
  }

  private initEventListeners() {
    this.scene.input.on(Phaser.Input.Events.POINTER_DOWN, this.pointerDownHandler, this);
    this.scene.input.on(Phaser.Input.Events.POINTER_MOVE, this.pointerMoveHandler, this);
    this.scene.input.on(Phaser.Input.Events.POINTER_MOVE, this.pointerUpHandler, this);
  }

  private pointerDownHandler(pointer : Phaser.Input.Pointer) {
      this.pointerDown = true;

      this.startX = pointer.worldX;
      this.startY = pointer.worldY;
  }

  private pointerMoveHandler(pointer: Phaser.Input.Pointer) {
    if (this.pointerDown && !this.pointerDragging) {
      if (Math.sqrt(Math.pow(pointer.x - this.startX, 2) +  Math.pow(pointer.y - this.startY, 2)) > 20) {
        this.pointerDragging = true;
        this.lastX = pointer.worldX;
        this.lastY = pointer.worldY;
      }
    }
    if (this.pointerDragging) {
      const dx = pointer.worldX - this.lastX;
      const dy = pointer.worldY - this.lastY;
      
      this.targetCamera.x += dx;
      this.targetCamera.y += dy;

      this.lastX = pointer.worldX;
      this.lastY = pointer.worldY;
    }
  }

  private pointerUpHandler(pointer : Phaser.Input.Pointer) {
    this.pointerDown = false;
    this.pointerDragging = false;
  }

  
}