import "phaser";

export class CanvasTile extends Phaser.GameObjects.Rectangle {

  constructor(scene: Phaser.Scene, x: number, y:number, color : Phaser.Display.Color ) {
    super(scene,x,y,1,1,color.color);
  }
}
