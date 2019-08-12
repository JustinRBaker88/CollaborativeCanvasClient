import { CameraDragController } from '../controllerobjects/cameraDragController';
import { CameraZoomController } from '../controllerobjects/cameraZoomController';
import { SelectionTile } from '../gameobjects/selectionTile';
import { PixelCanvas } from "../gameobjects/pixelCanvas";
import { CanvasClickController } from '../controllerobjects/canvasClickController';
import { CollaborativeCanvas } from '../util/enums';
import { randomColor } from '../util/Colors';
import { DatabaseManager } from '../util/databaseManager';

export class Canvas extends Phaser.Scene {

  private mCamera: Phaser.Cameras.Scene2D.Camera;

  private cameraDragController : CameraDragController;
  private cameraZoomController : CameraZoomController;
  private canvasClickController : CanvasClickController;

  private selectionTile : SelectionTile;

  private pixelCanvas : PixelCanvas;
  private dbManager : DatabaseManager;


  private readonly CANVASWIDTH : number = 1000;
  private readonly CANVASHEIGHT : number = 1000;


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
    this.selectionTile = new SelectionTile(this, this.input.activePointer, randomColor());
    this.pixelCanvas = new PixelCanvas(this, this.CANVASWIDTH, this.CANVASHEIGHT, this.selectionTile);
    this.dbManager = new DatabaseManager(this);
    this.dbManager.loadImageData(1);

    this.initCamera();

    this.cameraDragController = new CameraDragController(this.mCamera, this);
    this.cameraZoomController = new CameraZoomController(this.mCamera, this);
    this.canvasClickController = new CanvasClickController(this, this.selectionTile);

    this.input.keyboard.on('keyup-' + 'SPACE', function (event) { this.mCamera.centerOn(this.CANVASWIDTH/2,this.CANVASHEIGHT/2); }, this);
    

  }

  update(time: number, delta: number): void {
    this.cameraDragController.update(delta);
    this.selectionTile.update(time, delta);
    this.pixelCanvas.update(time,delta);
  }


  private initCamera() : void {
    this.mCamera = this.cameras.main;
    this.mCamera.centerOn(this.CANVASWIDTH/2,this.CANVASHEIGHT/2);
    
  }

};
