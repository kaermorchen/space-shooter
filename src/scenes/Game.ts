import { Scene } from "phaser";
import { Player } from "../entities/Player";
import { Enemy } from "../entities/Enemy";

export class Game extends Scene {
  constructor() {
    super("Game");
  }

  create() {
    new Player(this);

    new Enemy(this, "xs");
  }
}
