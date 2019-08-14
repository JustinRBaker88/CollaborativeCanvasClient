import { CollaborativeCanvas } from '../util/enums';

export class CanvasUI extends Phaser.Scene  {

  private colorSelector : Phaser.GameObjects.DOMElement;
  private saveButton : Phaser.GameObjects.DOMElement;
  private eventEmitter : Phaser.Events.EventEmitter;

  constructor() {
    super({
      key: CollaborativeCanvas.Scenes.CANVASUI
    });
  }

  init(): void {

  }

  preload(): void {
    this.load.html('colorSelector', 'static/ColorSelector.html');
    this.load.html('saveButton', 'static/saveButton.html');
  }

  create(): void {
    this.eventEmitter = this.game.scene.getScene("Canvas").events;
    
    this.colorSelector = this.add.dom((.5)*this.scale.width, (.95)*this.scale.height).createFromCache('colorSelector');
    
    this.colorSelector.addListener('click');
    this.colorSelector.on('click', this.colorSelectorEventHandler, this);

    this.saveButton = this.add.dom(this.scale.width * .90 ,this.scale.height * .05).createFromCache('saveButton');
    this.saveButton.addListener('click');
    this.saveButton.on('click', this.saveEventHandler, this);

    // Debug reticle
    // this.add.rectangle(this.cameras.main.width/2,this.cameras.main.height/2,4,1000,0x000000);
    // this.add.rectangle(this.cameras.main.width/2,this.cameras.main.height/2,10000,4,0x000000);
  }

  update(time: number, delta: number): void {
  }

  private saveEventHandler(event: Event) {
    this.eventEmitter.emit(CollaborativeCanvas.Events.SAVECLICK, 1);
  }

  private colorSelectorEventHandler(event : Event) {
    let colorSelector = event.target as HTMLDivElement;
    this.eventEmitter.emit(CollaborativeCanvas.Events.COLORSELECTED, colorSelector.id);
  }
};
