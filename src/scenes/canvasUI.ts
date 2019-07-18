import "phaser";
import { Canvas } from "./canvas";

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
    selector.on('click', this.colorSelectorEventHandler, this);
  }

  update(time: number, delta: number): void {
  }

  private colorSelectorEventHandler(event : Event) {
    let colorSelector = event.target as HTMLDivElement;
    let canvas : Phaser.Scene = this.game.scene.getScene("Canvas");
    canvas.events.emit("colorSelected", colorSelector.id);
  }
};
