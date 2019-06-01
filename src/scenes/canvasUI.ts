import "phaser";

export class CanvasUI extends Phaser.Scene  {

  constructor() {
    super({
      key: "CanvasUI"
    });
  }

  init(): void {
  }

  preload(): void {

  }

  create(): void {
    this.add.text(0,0, "Hello World");
    
  }

  update(time: number, delta: number): void {
    // console.log('test');
  }
};
