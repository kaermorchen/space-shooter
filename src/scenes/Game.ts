import Phaser, { Scene } from "phaser";
import { Player } from "../entities/Player";
import { Asteroid } from "../entities/Asteroid";
import { Lives } from "../ui/Lives";
import { Enemy } from "../entities/Enemy";
import { Score } from "../ui/Score";

export class Game extends Scene {
  enemySpawnTimer: Phaser.Time.TimerEvent;
  enemies: Phaser.Physics.Arcade.Group;

  asteroidSpawnTimer: Phaser.Time.TimerEvent;
  asteroids: Phaser.Physics.Arcade.Group;

  player: Player;

  constructor() {
    super("Game");
  }

  create() {
    this.registry.set("lives", 3);
    this.registry.set("score", 0);

    new Lives(this);
    new Score(this);

    this.player = new Player(this);

    // Asteroids
    this.asteroids = this.physics.add.group();

    this.physics.add.overlap(
      this.player,
      this.asteroids,
      this.hitToPlayer,
      undefined,
      this,
    );

    this.asteroidSpawnTimer = this.time.addEvent({
      delay: 2000,
      callback: this.spawnAsteroid,
      callbackScope: this,
      loop: true,
    });

    // Enemies
    this.enemies = this.physics.add.group();

    this.physics.add.overlap(
      this.player,
      this.enemies,
      this.hitToPlayer,
      undefined,
      this,
    );

    this.enemySpawnTimer = this.time.addEvent({
      delay: 1000,
      callback: this.spawnEnemy,
      callbackScope: this,
      loop: true,
    });

    this.physics.add.overlap(
      this.player.bullets,
      this.asteroids,
      this.hitBullet,
      undefined,
      this,
    );

    this.physics.add.overlap(
      this.player.bullets,
      this.enemies,
      this.hitBullet,
      undefined,
      this,
    );
  }

  spawnAsteroid() {
    const color = Phaser.Utils.Array.GetRandom<"gray" | "red">(["gray", "red"]);
    const size = Phaser.Utils.Array.GetRandom<"s" | "m" | "l">(["s", "m", "l"]);
    const position = {
      x: Phaser.Math.Between(0, this.scale.width),
      y: -38,
    };

    this.asteroids.add(new Asteroid(this, color, size, position));
  }

  hitToPlayer(_: unknown, entity: { destroy(): void }) {
    entity.destroy();

    this.takeDamage();
  }

  hitBullet(bullet, entity: { destroy(): void }) {
    this.player.killBullet(bullet);

    this.registry.inc("score", entity.scoreBonus ?? 0);

    entity.destroy();
  }

  spawnEnemy() {
    const size = Phaser.Utils.Array.GetRandom<"xs" | "s" | "m" | "l">([
      "xs",
      "s",
      "m",
      "l",
    ]);
    const position = {
      x: Phaser.Math.Between(0, this.scale.width),
      y: -38,
    };

    this.enemies.add(new Enemy(this, size, position));
  }

  takeDamage() {
    this.registry.inc("lives", -1);

    if (this.registry.get("lives") < 1) {
      this.gameOver();
    }
  }

  gameOver() {
    this.physics.pause();
    this.scene.restart();
  }
}
