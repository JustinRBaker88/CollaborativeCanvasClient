import "phaser";
import { ColorMap } from '../util/Colors';

export class SelectionTile {

  private scene : Phaser.Scene;
  private pointer : Phaser.Input.Pointer;
  private graphic : Phaser.GameObjects.Graphics;
  private innerRect : Phaser.Geom.Rectangle;
  private outterRect : Phaser.Geom.Rectangle;

  private color: number;

  private cancelKey : Phaser.Input.Keyboard.Key;

  constructor(scene: Phaser.Scene, pointer: Phaser.Input.Pointer, color: number ) {
    this.scene = scene;
    this.pointer = pointer;
    
    this.graphic = this.scene.add.graphics();
    this.graphic.setDepth(100);
    this.initGraphics();
    this.setColor(color);
    this.enableTile(true);

    // event listeners
    this.scene.events.on("CameraZoomEvent", this.cameraZoomHandler, this);
    this.cancelKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    this.cancelKey.on('up', this.selectionCancelHandler, this);
    this.scene.events.on("colorSelected", this.colorSelectionHandler, this);

  }

  public enableTile(enabled : boolean) {
    this.graphic.visible = enabled;

  }
  public isEnabled() : boolean {
    return this.graphic.visible;
  }

  public update(time: number, delta: number) {
    if (this.graphic.visible) {
      this.graphic.setPosition(Math.floor(this.pointer.worldX), Math.floor(this.pointer.worldY));
   }
  }

  private colorSelectionHandler(colorKey : string) {
    this.setColor(ColorMap.get(colorKey));
    this.enableTile(true);
  }

  private selectionCancelHandler(key: Phaser.Input.Keyboard.Key, event: KeyboardEvent) {
    this.enableTile(false);
  }

  private cameraZoomHandler(pointer : Phaser.Input.Pointer) {
    this.graphic.setPosition(Math.floor(this.pointer.worldX), Math.floor(this.pointer.worldY));
  }


  private initGraphics() {
    this.innerRect = new Phaser.Geom.Rectangle(0,0,10,10);
    this.outterRect = new Phaser.Geom.Rectangle(0.5,0.5,9,9);
    this.graphic.lineStyle(1, ColorMap.get("Black"));
    this.graphic.scale = .1;
  }

  public setColor(color : number) {
    this.graphic.fillStyle(color);
    this.graphic.fillRectShape(this.innerRect);
    this.graphic.strokeRectShape(this.outterRect);
    this.color = color;
  }

  public getColor() : number {
    return this.color;
  }

  public getRGBA() : number {
    let rgba = this.color;
    rgba = rgba << 8;
    rgba = rgba | 0xFF;
    return rgba;
  }
};
