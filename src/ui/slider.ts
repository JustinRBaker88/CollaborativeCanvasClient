import "phaser";

export class Slider extends Phaser.GameObjects.Container  {

  sliderBar : Phaser.GameObjects.Rectangle; 

  constructor(scene : Phaser.Scene, x? :number, y? :number) {
    super(scene,x,y);
    this.init();
  }

  private init() {
    this.setSize(100,200);
    this.setExclusive(true);
    this.add(new Phaser.GameObjects.Rectangle(this.scene,0,90,50,200,0xD3D3D3));
    this.sliderBar = new Phaser.GameObjects.Rectangle(this.scene,0,0,30,10,0xFF0000);
    this.add(this.sliderBar);

    this.sliderBar.setSize(this.sliderBar.width, this.sliderBar.height);

    this.sliderBar.setInteractive();

    this.scene.input.setDraggable(this.sliderBar);
    this.sliderBar.on('drag', this.onDrag, this); 

  }

  private onDrag(pointer: Phaser.Input.Pointer, dragx : number, dragY : number) {
    let val : number = Phaser.Math.Clamp(dragY,0, 180);
    this.sliderBar.setY(val);
    this.scene.game.scene.getScene("Canvas").
      cameras.main.setZoom(Phaser.Math.Clamp(240*Math.exp(-0.025*val),2.8125,240));
  }

}