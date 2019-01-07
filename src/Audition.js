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
  handMaxSize: 4,
  deck: [0,0,1,1,2,2,2,3,3,3,3,4,4,4,5,5,6,6,7,8]
}

var JavaScriptAudition = {
  init() {
    var mappedDeck = JavaScriptAudition.objects.initialDeckCards();
    player1 = JavaScriptAudition.objects.initialPlayer("Player1", initValues.health, initValues.mana, mappedDeck);
    player2 = JavaScriptAudition.objects.initialPlayer("Player2", initValues.health, initValues.mana, mappedDeck.slice(0));
  },

  startGame(){
    JavaScriptAudition.actions.startTurn(JavaScriptAudition.actions.chooseStartingPlayer());
  },

  objects: {
    initialPlayer(name, health, mana, deck) {
      return {name: name, health: health, mana: mana, deck: deck, hand: [], cardsInPlay: [], active: false};
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
    chooseStartingPlayer(){
      if(Math.floor(Math.random() * 2) == 0){
        return player1
      }
      return player2;
    },
    startTurn(player){
      player.active = true;
      JavaScriptAudition.actions.manaChange(player, initValues.manaGainPerTurn);
      JavaScriptAudition.ruleChecks.maxMana(player);
      JavaScriptAudition.ruleChecks.bleedOut(player);
    },
    initialHandDraw(player){
      for(var i = 0; i < initValues.handSize; i++){
        JavaScriptAudition.actions.drawRandomCard(player);
      }
    },
    drawRandomCard(player){
      var card = player.deck.splice(Math.floor(Math.random() * player.deck.length), 1);
      if(player.hand.length < initValues.handMaxSize){
        player.hand.push(card);
      }
    },
    canPlaceCard(player, card){
      var currentCost = JavaScriptAudition.util.sumCards(player.cardsInPlay) + card.value;
      return player.mana >= currentCost;
    },
    playCards(activePlayer, opponent){
      var attackValue = JavaScriptAudition.util.sumCards(activePlayer.cardsInPlay);
      JavaScriptAudition.actions.manaChange(activePlayer, -attackValue);
      JavaScriptAudition.actions.damagePlayer(opponent, attackValue);
      activePlayer.cardsInPlay = [];

      if(JavaScriptAudition.ruleChecks.playerLose(opponent)) {
        JavaScriptAudition.actions.winner(activePlayer);
      } else {
        activePlayer.active = false;
        JavaScriptAudition.actions.startTurn(opponent);
      }
    },
    damagePlayer(player, damage){
      player.health -= damage;
    },
    manaChange(player, changeAmount){
      player.mana += changeAmount;
    },
    winner(player){
      console.log(`${player.name} Wins!`);
    }
  },

  util: {
    sumCards(cards){
      var sum = 0;
      for(var i = 0; i < cards.length; i++){
        sum += cards[i].value;
      }
      return sum;
    }
  },

  ruleChecks: {
    maxMana(player){
      if(player.mana > initValues.maxMana){
        player.mana = initValues.maxMana;
      }
    },
    bleedOut(player){
      if(player.deck.length == 0) JavaScriptAudition.actions.damagePlayer(player, initValues.bleed);
    },
    hasPlayableCard(player){
      if(player.hand.filter(function(card){ return card.value <= player.mana}).length == 0){
        player.active = false;
      }
    },
    playerLose(player){
      return player.health <= 0;
    }
  }
  
};