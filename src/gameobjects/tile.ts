import "phaser";
import { Colors } from '../util/Colors';

const values: number[] = Colors.getArray();

export class CanvasTile extends Phaser.GameObjects.Rectangle {

  constructor(scene: Phaser.Scene, x: number, y:number, color?: Phaser.Display.Color ) {
    const numericColor : number = Colors.get("WHITE");
    
    super(scene, x, y, 1, 1, color == null ?  numericColor : color.color);
  
  }

  public setColor(color : number) {
    this.setFillStyle(color);
  }

  public randomizeColor() {
    this.setColor(values[Math.floor(Math.random() * Math.floor(values.length))]);
  }
};
