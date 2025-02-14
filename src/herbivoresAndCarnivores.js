'use strict';

class Animal {
  static alive = [];

  constructor(name) {
    this.name = name;
    this.health = 100;
    Animal.alive.push(this);
  }

  isAlive() {
    if (this.health <= 0) {
      this.die();
    }

    return this.health > 0;
  }

  die(target) {
    const index = Animal.alive.indexOf(target);

    if (index > -1) {
      Animal.alive.splice(index, 1);
    }
  }
}

class Herbivore extends Animal {
  hidden = false;

  hide() {
    this.hidden = true;
  }
}

class Carnivore extends Animal {
  bite(target) {
    if (target instanceof Herbivore && !target.hidden && target.isAlive()) {
      target.health -= 50;
    }

    if (target.health <= 0) {
      this.die(target);
    }
  }
}

const deer = new Herbivore('Bembi');
const panther = new Carnivore('Bagira');
const lion = new Carnivore('King');
const rabbit = new Herbivore('Max');

lion.bite(deer);
panther.bite(lion);

panther.bite(deer);
rabbit.hide();
panther.bite(rabbit);

// console.log(Animal.alive)

module.exports = {
  Animal,
  Herbivore,
  Carnivore,
};
