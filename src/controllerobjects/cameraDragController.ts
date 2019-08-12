export class CameraDragController {
  targetCamera: Phaser.Cameras.Scene2D.Camera;
  scene: Phaser.Scene;

  pointerDown : boolean = false;
  pointerDragging: boolean = false;
  
  draggingEnabled : boolean = true;

  dirX: number = 0;
  dirY: number = 0;
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

  public update(delta: number) {
    if (this.draggingEnabled) {
      this.targetCamera.scrollX -= (this.dirX / .75 * delta / 100) / this.targetCamera.zoom;
      this.targetCamera.scrollY -= (this.dirY / .75 * delta / 100) / this.targetCamera.zoom;
    }
    this.dirX -= this.dirX / .6 * delta / 100;
    this.dirY -= this.dirY / .6 * delta / 100;
  }

  public toggleDragging(toggle: boolean) : void {
    this.draggingEnabled = toggle;
  }

  private initEventListeners() {
    this.scene.input.on(Phaser.Input.Events.POINTER_DOWN, this.pointerDownHandler, this);
    this.scene.input.on(Phaser.Input.Events.POINTER_MOVE, this.pointerMoveHandler, this);
    this.scene.input.on(Phaser.Input.Events.POINTER_UP, this.pointerUpHandler, this);
    this.scene.input.on(Phaser.Input.Events.POINTER_OUT, this.pointerUpHandler, this );
  }

  private pointerDownHandler(pointer : Phaser.Input.Pointer) {
      this.pointerDown = true;
    
      this.startX = pointer.x;
      this.startY = pointer.y;

  }

  private pointerMoveHandler(pointer: Phaser.Input.Pointer) {
    if (this.pointerDown && !this.pointerDragging) {
      if (Math.hypot(pointer.x - this.startX, pointer.y - this.startY) > 20) {
        this.pointerDragging = true;
        this.lastX = pointer.x;
        this.lastY = pointer.y;
      }
    }
    if (this.pointerDragging) {
      // delta from last mouse movement event
      const dx = pointer.x - this.lastX;
      const dy = pointer.y - this.lastY;
      
      this.dirX += dx;
      this.dirY += dy;

      this.lastX = pointer.x;
      this.lastY = pointer.y;
    }
  }

  private pointerUpHandler(pointer : Phaser.Input.Pointer) {
    this.pointerDown = false;
    this.pointerDragging = false;
  }

  
}