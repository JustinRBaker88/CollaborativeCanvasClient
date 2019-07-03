import "phaser";

import { Canvas } from './scenes/canvas';
import { CanvasUI } from './scenes/canvasUI';

const config: Phaser.Types.Core.GameConfig = {
  title: "Collabortive Canvas",
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.FIT,
    parent: 'game-container',
    autoCenter: Phaser.Scale.CENTER_BOTH,
    height: 800,
    width: 800,
  },
  scene:  [Canvas, CanvasUI],
  render: 
    {
      pixelArt: true,
      antialias: false
    },
  disableContextMenu: false,
  backgroundColor: "#FFFFFF",
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