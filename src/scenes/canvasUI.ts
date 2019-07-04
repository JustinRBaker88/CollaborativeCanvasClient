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
    // this.slider = new Slider(this,670,200);
    // this.add.existing(this.slider);    
    // this.slider.setInteractive();

    let selector = this.add.dom((.5)*this.scale.width, (.95)*this.scale.height).createFromCache('colorSelector');
    
    selector.addListener('click');

    selector.on('click', this.colorSelectorEventHandler);
  }

  update(time: number, delta: number): void {
  }

  colorSelectorEventHandler(event : Event) {
    let colorSelector = event.target as HTMLDivElement;
    console.log(colorSelector.style.backgroundColor);

  }
};
