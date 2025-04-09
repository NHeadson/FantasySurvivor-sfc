export default class Player {
  constructor(id, name = '', tribe = null, eliminated = false, advantagesHeld = 0, advantagesPlayed = 0) {
    this.id = id;
    this.name = name;
    this.tribe = tribe;
    this.eliminated = eliminated;
    this.advantagesHeld = advantagesHeld;
    this.advantagesPlayed = advantagesPlayed;
  }

  // Method to mark a player as eliminated
  eliminate() {
    this.eliminated = true;
  }

  // Method to add an advantage
  addAdvantage() {
    this.advantagesHeld += 1;
  }

  // Method to play an advantage
  playAdvantage() {
    if (this.advantagesHeld > 0) {
      this.advantagesHeld -= 1;
      this.advantagesPlayed += 1;
    }
  }
}
