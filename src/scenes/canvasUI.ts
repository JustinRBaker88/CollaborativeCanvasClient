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
    this.load.html('colorSelector', 'static/ColorSelector.html');
  }

  create(): void {

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
