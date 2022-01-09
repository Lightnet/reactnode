export class Character {

  constructor(arg){
    this.id = arg.id || 'id';
    this.name = arg.name || 'Character';
    this.healthpoint = arg.healthpoint || 100;
    this.healthmaxpoint = arg.healthmaxpoint || 100;
    this.magicpoint = arg.magicpoint || 100;
    this.magicmaxpoint = arg.magicmaxpoint || 100;

    this.attack = arg.attack || 1;
    this.defense = arg.defense || 1;

    this.magicattack = arg.magicattack || 1;
    this.magicdefense = arg.magicdefense || 1;

    
  }

}