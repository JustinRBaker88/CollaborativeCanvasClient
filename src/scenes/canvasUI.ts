import "phaser";
import { Slider } from '../ui/slider';

export class CanvasUI extends Phaser.Scene  {

  slider : Slider;

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
    this.slider = new Slider(this,670,200);
    this.add.existing(this.slider);    
    this.slider.setInteractive();
    
  }

  update(time: number, delta: number): void {
    // console.log('test');
  }
};
