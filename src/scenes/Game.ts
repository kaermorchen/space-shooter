import Phaser, { Scene } from "phaser";
import { Player } from "../entities/Player";
import { Asteroid } from "../entities/Asteroid";

export class Game extends Scene {
  enemySpawnTimer: Phaser.Time.TimerEvent;

  constructor() {
    super("Game");
  }

  create() {
    new Player(this);

    this.enemySpawnTimer = this.time.addEvent({
      delay: 300,
      callback: this.spawnEnemy,
      callbackScope: this,
      loop: true,
    });
  }

  // update(ts: DOMHighResTimeStamp, dt: number) {}

  spawnEnemy() {
    const color = Phaser.Utils.Array.GetRandom<"gray" | "red">(["gray", "red"]);
    const size = Phaser.Utils.Array.GetRandom<"s" | "m" | "l">(["s", "m", "l"]);
    const position = {
      x: Phaser.Math.Between(0, this.scale.width),
      y: -38,
    };

    new Asteroid(this, color, size, position);
  }
}
