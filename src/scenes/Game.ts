import { Scene } from "phaser";
import { Player } from "../entities/Player";

export class Game extends Scene {
  constructor() {
    super("Game");
  }

  create() {
    new Player(this);
  }
}
