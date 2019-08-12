import { SelectionTile } from './selectionTile';
import { CanvasClickEvent } from "../controllerobjects/canvasClickController";
import { CollaborativeCanvas } from '../util/enums';

export class PixelCanvas {

  private canvasSource : Phaser.Textures.CanvasTexture;
  private scene : Phaser.Scene;
  private key : string = "canvasSource";
  private imageData: ImageData;

  private selectionTile: SelectionTile;

  private canvasBuffer : ArrayBuffer;

  private canvasSprite : Phaser.GameObjects.Image;

  private dirty : boolean = false;

  private canvasWidth : number;
  private canvasHeight : number;


  constructor(scene: Phaser.Scene, width: number, height: number, selectionTile : SelectionTile) {
    this.scene = scene;
    this.canvasSource = this.scene.textures.createCanvas(this.key, width, height);

    this.canvasWidth = width;
    this.canvasHeight = height;
    this.selectionTile = selectionTile;

    this.initEventHandlers();

    this.scene.events.emit(CollaborativeCanvas.Events.CANVASREADY);

    
  }

  private initEventHandlers() {
    this.scene.events.on(CollaborativeCanvas.Events.CANVASCLICKED, this.canvasClickHandler, this);
    this.scene.events.on(CollaborativeCanvas.Events.DBUNSUPPORTED, this.initBlankCanvas, this);
    this.scene.events.on(CollaborativeCanvas.Events.LOADFAIL, this.initBlankCanvas, this);
    this.scene.events.on(CollaborativeCanvas.Events.LOADREADY, this.initFromImageData, this);
    this.scene.events.on(CollaborativeCanvas.Events.SAVECLICK, this.saveHandler, this);
  }

  private initFromImageData(imageData: ImageData) {
    this.canvasSource.putData(imageData, 0, 0);
    this.canvasSource.update();
    this.canvasSource.refresh();
    this.imageData = this.canvasSource.imageData;
    this.canvasBuffer = this.canvasSource.buffer;
    this.canvasSprite = this.scene.add.image(this.canvasWidth/2,this.canvasHeight/2,this.key);
  }

  private initBlankCanvas() {
    this.imageData = this.canvasSource.imageData;
    this.canvasBuffer = this.canvasSource.buffer;

    let data : ImageData = this.imageData;
    let view : DataView = new DataView(this.canvasBuffer);
    for (let i = 0; i < data.width; i++) {
      for (let j = 0; j < data.height; j++) {
        let index = i*data.width*4 + j*4;
        view.setInt32(index,0xFFFFFFFF);
      }
    }
    this.canvasSource.putData(this.imageData, 0, 0);
    this.canvasSource.refresh();
    this.canvasSprite = this.scene.add.image(this.canvasWidth/2,this.canvasHeight/2,this.key);
  }

  public update(time: number, delta: number) {
    if (this.dirty) {
      this.dirty = false;
      this.canvasSource.putData(this.imageData,0,0);
      this.canvasSource.refresh();
    }
  }

  public setPixel(color: number, x : number, y: number) {
    if (x < this.canvasWidth && y < this.canvasHeight && x >= 0 && y >= 0) {
      let baseIndex = y*this.canvasWidth*4 + x*4;
      let view : DataView = new DataView(this.canvasBuffer);
      view.setInt32(baseIndex, color);
      this.dirty = true;
      return true;
    }
    else {
      return false;
    }
  }

  private saveHandler(saveSlot: number) {
    this.scene.events.emit(CollaborativeCanvas.Events.SAVEREQUEST, this.imageData, saveSlot);
  }

  private canvasClickHandler(config: CanvasClickEvent) {
    if (config.x < this.canvasWidth && config.y < this.canvasHeight && config.x >= 0 && config.y >= 0) {
      let rgba = config.color;
      rgba = rgba << 8;
      rgba = rgba | 0xFF;
      this.setPixel(rgba, config.x, config.y);
    }
  }
};
