import "phaser";

import { CanvasScene } from './scenes/canvasScene';

const config: GameConfig = {
  title: "Collabortive Canvas",
  width: 600,
  height: 600,
  parent: "game",
  scene:  [CanvasScene],
  physics: {
    default: "arcade",
    arcade: {
      debug: false
    }
  },
  backgroundColor: "#D3D3D3"
};

export class CollaborativeCanvas extends Phaser.Game {
  constructor(config: GameConfig) {
    super(config);
  }
}

window.onload = () => {
  var game = new CollaborativeCanvas(config);
};