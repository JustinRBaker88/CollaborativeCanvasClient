import "phaser";

import { WelcomeScene } from "./scenes/WelcomeScene";
import { GameScene } from "./scenes/GameScene";
import { ScoreScene } from "./scenes/ScoreScene";

const config: GameConfig = {
  title: "Test Game",
  width: 800,
  height: 600,
  parent: "game",
  scene:  [WelcomeScene, GameScene, ScoreScene],
  physics: {
    default: "arcade",
    arcade: {
      debug: false
    }
  },
  backgroundColor: "#18216D"
};

export class TestGame extends Phaser.Game {
  constructor(config: GameConfig) {
    super(config);
  }
}

window.onload = () => {
  var game = new TestGame(config);
};