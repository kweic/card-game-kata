"use strict";

var player1,
  player2;

var initValues = {
  health: 30, 
  mana: 0,
  handSize: 3,
  deck: [0,0,1,1,2,2,2,3,3,3,3,4,4,4,5,5,6,6,7,8]
}

var JavaScriptAudition = {
  init() {
    player1 = JavaScriptAudition.objects.initialPlayer(initValues.health, initValues.mana, JavaScriptAudition.objects.initialDeckCards());
    player2 = JavaScriptAudition.objects.initialPlayer(initValues.health, initValues.mana, JavaScriptAudition.objects.initialDeckCards());
  },
  objects: {
    initialPlayer(health, mana, deck) {
      var player = {health: health, mana: mana, deck: deck};
      return player;
    },
    initialDeckCards() {
      return initValues.deck.map(
        function(v) { return JavaScriptAudition.objects.card(v) }
        );
    },
    card(value) {
      return {value: value}
    }
  }
  
};