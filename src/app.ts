import "phaser";

import { Canvas } from './scenes/canvas';
import { CanvasUI } from './scenes/canvasUI';

const config: Phaser.Types.Core.GameConfig = {
  title: "Collabortive Canvas",
  width: 720,
  height: 720,
  parent: "game",
  scene:  [Canvas, CanvasUI],
  render: 
    {
      pixelArt: true,
      antialias: false
    },
  disableContextMenu: true,
  backgroundColor: "#FFFFFF"
};

export class CollaborativeCanvas extends Phaser.Game {

  constructor(config: Phaser.Types.Core.GameConfig ) {
    super(config);
  }
}

window.onload = () => {
  var game = new CollaborativeCanvas(config);
  // game.scene.add("Canvas", Canvas, false);
  // game.scene.add("CanvasUI", CanvasUI, false);
  // game.scene.start("Canvas");
};