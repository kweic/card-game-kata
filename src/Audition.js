"use strict";

var player1,
  player2;

var initValues = {
  health: 30,
  bleed: 1,
  
  mana: 0,
  manaGainPerTurn: 1,
  maxMana: 10,

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
      var player = {health: health, mana: mana, deck: deck, hand: [], active: false};
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
  },

  actions: {
    startTurn(player){
      player.active = true;
      player.mana += initValues.manaGainPerTurn;
      if(player.mana > initValues.maxMana){
        player.mana = initValues.maxMana;
      }

      if(player.deck.length == 0) player.health -= initValues.bleed;
    },
    initialHandDraw(player){
      for(var i = 0; i < initValues.handSize; i++){
        JavaScriptAudition.actions.drawRandomCard(player);
      }
    },
    drawRandomCard(player){
      player.hand.push(player.deck.splice(Math.floor(Math.random() * player.deck.length), 1));
    }
  }
  
};