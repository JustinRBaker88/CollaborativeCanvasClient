import "phaser";
import { ColorMap } from '../util/Colors';
import { SelectionTile } from './selectionTile';

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

    this.canvasBuffer = this.canvasSource.buffer;
    this.imageData = this.canvasSource.imageData;

    this.initBlankCanvas();
    this.canvasSource.putData(this.imageData, 0, 0);
    this.canvasSource.refresh();
    this.canvasSprite = this.scene.add.image(width/2,height/2,this.key);

    this.scene.input.on("pointerup", this.pointerUpHandler, this);
    
  }

  private initBlankCanvas() {
    let data : ImageData = this.imageData;
    let view : DataView = new DataView(this.canvasBuffer);
    for (let i = 0; i < data.width; i++) {
      for (let j = 0; j < data.height; j++) {
        let index = i*data.width*4 + j*4;
        view.setInt32(index,0xFFFFFFFF);
      }
    }
  }

  public update(time: number, delta: number) {
    if (this.dirty) {
      this.dirty = false;
      this.canvasSource.putData(this.imageData,0,0);
      this.canvasSource.refresh();
    }

  }

  public setPixel(color: number, x : number, y: number) {
    console.log("In set pixel function");
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

  private pointerUpHandler(pointer : Phaser.Input.Pointer) {

    let camera : Phaser.Cameras.Scene2D.Camera = this.scene.cameras.main;    
  
    if (pointer.getDuration() < 100) {

      let coordinates : Phaser.Math.Vector2 = new Phaser.Math.Vector2(); 
      pointer.positionToCamera(camera, coordinates);
      const x: number = Math.floor(pointer.worldX);
      const y: number = Math.floor(pointer.worldY);

      if (x < this.canvasWidth && y < this.canvasHeight && x >= 0 && y >= 0) {
        if (this.selectionTile.isEnabled()) {
          this.setPixel(this.selectionTile.getRGBA(), x, y);
          console.log(this.canvasSource.getPixel(x,y));
        }
      }
    }
  }
};
