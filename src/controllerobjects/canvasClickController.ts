import { SelectionTile } from '../gameobjects/selectionTile';
import { CollaborativeCanvas } from "../util/enums";

export type CanvasClickEvent = {
  x : number,
  y : number,
  color : number
}

export class CanvasClickController {
  private scene: Phaser.Scene;
  private selectionTile: SelectionTile;


  constructor(scene: Phaser.Scene, selectionTile: SelectionTile, config? : any) {

    this.scene = scene;
    this.selectionTile = selectionTile;
    

    this.initEventListeners();

    // TODO: implement Config object and config initilization method
  }

  private initEventListeners() {
    this.scene.input.on(Phaser.Input.Events.POINTER_UP, this.pointerUpHandler, this);
  }

  private pointerUpHandler(pointer : Phaser.Input.Pointer) { 
  
    if (pointer.getDuration() < 125 && this.selectionTile.isEnabled()) {
      
      let camera : Phaser.Cameras.Scene2D.Camera = this.scene.cameras.main;   
      let coordinates : Phaser.Math.Vector2 = new Phaser.Math.Vector2(); 
      pointer.positionToCamera(camera, coordinates);
      const x: number = Math.floor(pointer.worldX);
      const y: number = Math.floor(pointer.worldY);
      let config : CanvasClickEvent = {x:x, y:y, color:this.selectionTile.getColor()};
      this.scene.events.emit(CollaborativeCanvas.Events.CANVASCLICKED, config);


    }
  }
  
}