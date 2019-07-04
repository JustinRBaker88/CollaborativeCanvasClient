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
    this.scale.width
  }

  preload(): void {
    this.load.html('colorSelector', 'static/ColorSelector.html');
  }

  create(): void {
    console.log("Width: " + this.scale.width);
    console.log("Height: " + this.scale.height);
    this.slider = new Slider(this,670,200);
    this.add.existing(this.slider);    
    this.slider.setInteractive();

    let selector = this.add.dom((.5)*this.scale.width, (.95)*this.scale.height).createFromCache('colorSelector');
    
  }

  update(time: number, delta: number): void {
    // console.log('test');
  }
};
