import "phaser";
import { ColorMap, randomColor } from '../util/Colors';


export class CanvasTile extends Phaser.GameObjects.Rectangle {

  constructor(scene: Phaser.Scene, x: number, y:number, color?: Phaser.Display.Color ) {
    const numericColor : number = ColorMap.get("WHITE");
    
    super(scene, x, y, 1, 1, color == null ?  numericColor : color.color);
  
  }

  public setColor(color : number) {
    this.setFillStyle(color);
  }

  public randomizeColor() {
    this.setColor(randomColor());
  }
};
