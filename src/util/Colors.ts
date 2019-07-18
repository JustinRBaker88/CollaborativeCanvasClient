export const ColorMap : Phaser.Structs.Map<string,number> = new Phaser.Structs.Map<string,number>([]);
ColorMap.set("WHITE", 0xFFFFFF);
ColorMap.set("LIGHTGREY", 0xE4E4E4);
ColorMap.set("DARKGREY", 0x888888);
ColorMap.set("BLACK", 0x000000),
ColorMap.set("PINK", 0xFFA7D1);
ColorMap.set("RED", 0xE50000);
ColorMap.set("ORANGE", 0xE59500);
ColorMap.set("BROWN", 0xA06A42);
ColorMap.set("YELLOW", 0xE5D900);
ColorMap.set("LIGHTGREEN", 0x94E044);
ColorMap.set("GREEN", 0x02BE01);
ColorMap.set("CYAN",0x00D3DD);
ColorMap.set("AQUA", 0x0083C7);
ColorMap.set("BLUE", 0x0000EA);
ColorMap.set("LIGHTPURPLE", 0xCF6EE4);
ColorMap.set("PURPLE", 0x820080);

const keys : string[] =  ColorMap.keys();

export function randomColor() : number {
  return ColorMap.get(keys[Math.floor(Math.random() * keys.length)]);

}