import "phaser";


export const Colors : Phaser.Structs.Map<string,number> = new Phaser.Structs.Map<string,number>([]);
Colors.set("WHITE", 0xFFFFFF);
Colors.set("LIGHTGREY", 0xE4E4E4);
Colors.set("DARKGREY", 0x888888);
Colors.set("BLACK", 0x000000),
Colors.set("PINK", 0xFFA7D1);
Colors.set("RED", 0xE50000);
Colors.set("ORANGE", 0xE59500);
Colors.set("BROWN", 0xA06A42);
Colors.set("YELLOW", 0xE5D900);
Colors.set("LIGHTGREEN", 0x94E044);
Colors.set("GREEN", 0x02BE01);
Colors.set("CYAN",0x00D3DD);
Colors.set("AQUA", 0x0083C7);
Colors.set("BLUE", 0x0000EA);
Colors.set("LIGHTPURPLE", 0xCF6EE4);
Colors.set("PURPLE", 0x820080);

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
