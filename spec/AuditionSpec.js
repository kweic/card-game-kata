describe("Audition JavaScript Tests", function() {

    beforeEach(function() {
      JavaScriptAudition.init();
    });

    describe("GAME INITIALIZATION", function() {
      it(`Players are given ${initValues.health} Health`, function() {
        expect(player1.health == initValues.health).toBe(true);
        expect(player2.health == initValues.health).toBe(true);
      });

      it(`Players are given ${initValues.mana} Mana`, function() {
        expect(player1.mana == initValues.mana).toBe(true);
        expect(player2.mana == initValues.mana).toBe(true);
      });

      it(`Player deck contains ${initValues.deck.length} Cards`, function() {
        expect(player1.deck.length).toEqual(initValues.deck.length);
        expect(player1.deck.length).toEqual(initValues.deck.length);
      });

      it(`Player deck contains the card values [${initValues.deck}]`, function() {
        expect(player1.deck.map( function(card){ return card.value } )).toEqual(initValues.deck);
      });

      it(`Players are given ${initValues.handSize} Cards`, function() {
        JavaScriptAudition.actions.initialHandDraw(player1);
        JavaScriptAudition.actions.initialHandDraw(player2);

        expect(player1.hand.length).toEqual(initValues.handSize);
        expect(player2.hand.length).toEqual(initValues.handSize);
      });

      it(`Player deck contains ${initValues.deck.length - initValues.handSize} Cards after draw`, function() {
        JavaScriptAudition.actions.initialHandDraw(player1);
        JavaScriptAudition.actions.initialHandDraw(player2);

        expect(player1.deck.length).toEqual(initValues.deck.length - initValues.handSize);
        expect(player2.deck.length).toEqual(initValues.deck.length - initValues.handSize);
      });

      it('Only 1 player is chosen to become active on game start', function() {
        JavaScriptAudition.startGame();
        expect(player1.active).toEqual(!player2.active);
      });
    });


  describe("PLAYER ACTIONS", function() {
    
    describe("Becomes Active", function() {
      it(`Player gains ${initValues.manaGainPerTurn} Mana`, function() {
        JavaScriptAudition.actions.initialHandDraw(player1);
        JavaScriptAudition.actions.startTurn(player1);

        expect(player1.mana).toEqual(initValues.manaGainPerTurn);
      });

      it(`Player does not gain more than ${initValues.maxMana} Mana`, function() {
        JavaScriptAudition.actions.initialHandDraw(player1);
        //attempt to add more than max
        for(var i = 0; i < initValues.maxMana + 5; i++){
          JavaScriptAudition.actions.startTurn(player1);
        }

        expect(player1.mana).toEqual(initValues.maxMana);
      });

      it(`Player Bleeds Out (${initValues.bleed} damage) if no cards remain in deck`, function() {
        JavaScriptAudition.actions.initialHandDraw(player1);
        player1.deck = [];
        JavaScriptAudition.actions.startTurn(player1);
        expect(player1.health).toEqual(initValues.health - 1);
      });

    });
    

    describe("Draws Card", function() {
      
      it('Reduces player\'s deck size by 1', function() {
        JavaScriptAudition.actions.initialHandDraw(player1);
        JavaScriptAudition.actions.drawRandomCard(player1);

        expect(player1.deck.length).toEqual(initValues.deck.length - (initValues.handSize + 1));
      });

      it('Added to player\'s hand', function() {
        JavaScriptAudition.actions.initialHandDraw(player1);
        JavaScriptAudition.actions.drawRandomCard(player1);

        expect(player1.hand.length).toEqual(initValues.handSize + 1);
      });

      it('If no card is less than mana pool, lose turn', function() {
        JavaScriptAudition.actions.startTurn(player1);
        player1.hand = [JavaScriptAudition.objects.card(10)]
        JavaScriptAudition.ruleChecks.hasPlayableCard(player1);
        expect(player1.active).toBe(false);
      });

      it('Test hasPlayableCard returns true when player has enough mana', function(){
        JavaScriptAudition.actions.startTurn(player1);
        player1.hand = [JavaScriptAudition.objects.card(1)]
        JavaScriptAudition.ruleChecks.hasPlayableCard(player1);
        expect(player1.active).toBe(true);
      })

      describe("If already holding 4 cards...", function() {
        it('next drawn card is thrown out', function() {
          JavaScriptAudition.actions.initialHandDraw(player1);
          JavaScriptAudition.actions.drawRandomCard(player1);
          JavaScriptAudition.actions.drawRandomCard(player1);
          expect(player1.hand.length).toEqual(initValues.handMaxSize);
          expect(player1.deck.length).toEqual(initValues.deck.length - (initValues.handSize + 2))
          
        });

        it('previous cards remain in hand', function() {
          JavaScriptAudition.actions.initialHandDraw(player1);
          JavaScriptAudition.actions.drawRandomCard(player1);
          const currentHand = player1.hand.slice(0);

          JavaScriptAudition.actions.drawRandomCard(player1);
          expect(currentHand).toEqual(player1.hand);
        });
      });

    });
  });

  describe("Makes Move", function(){

    it('Can only play cards up to mana pool', function(){
      player1.mana = 1;
      var card = JavaScriptAudition.objects.card(2);
      expect( JavaScriptAudition.actions.canPlaceCard(player1, card) ).toBe(false);
    });

    it('Can only play combination of cards up to mana pool', function(){
        player1.mana = 5;
        player1.cardsInPlay = [JavaScriptAudition.objects.card(2), 
                               JavaScriptAudition.objects.card(2)];
        var card = JavaScriptAudition.objects.card(2);

        expect( JavaScriptAudition.actions.canPlaceCard(player1, card) ).toBe(false);
    });

    it('Card played reduces mana pool by card cost', function(){
        player1.mana = 10;
        player1.active = true;
        player1.cardsInPlay = [JavaScriptAudition.objects.card(2)];
        
        JavaScriptAudition.actions.playCards(player1, player2);
        
        expect(player1.mana).toEqual(8);
    });

    it('Multiple cards reduce mana cost by total used', function(){
        player1.mana = 10;
        player1.active = true;
        player1.cardsInPlay = [JavaScriptAudition.objects.card(2), 
                               JavaScriptAudition.objects.card(3)];
        
        JavaScriptAudition.actions.playCards(player1, player2);
        
        expect(player1.mana).toEqual(5);
    });

    it('Opponent health is reduced by card mana cost played', function(){
        player1.mana = 10;
        player1.active = true;
        player1.cardsInPlay = [JavaScriptAudition.objects.card(2), 
                               JavaScriptAudition.objects.card(3)];
        
        JavaScriptAudition.actions.playCards(player1, player2);
        
        expect(player2.health).toEqual(initValues.health - 5);
    });

    it('Opponent loses if damage dealt is more than health remaining', function(){
        player1.mana = 10;
        player1.active = true;
        player1.cardsInPlay = [JavaScriptAudition.objects.card(2), 
                               JavaScriptAudition.objects.card(3)];
        player2.health = 4;
        
        JavaScriptAudition.actions.playCards(player1, player2);
        
        expect(JavaScriptAudition.ruleChecks.playerLose(player2)).toEqual(true);
    });

    it('Opponent does not lose if health remains', function(){
      player1.mana = 10;
      player1.active = true;
      player1.cardsInPlay = [JavaScriptAudition.objects.card(2), 
                               JavaScriptAudition.objects.card(1)];
      player2.health = 4;
      
      JavaScriptAudition.actions.playCards(player1, player2);
      
      expect(JavaScriptAudition.ruleChecks.playerLose(player2)).toEqual(false);
    });

    it('Win method is called when opponent health is reduced to 0', function(){
      var winnerFunction = spyOn(JavaScriptAudition.actions, "winner");
      player1.mana = 10;
      player1.active = true;
      player1.cardsInPlay = [JavaScriptAudition.objects.card(2), 
                               JavaScriptAudition.objects.card(2)];
      player2.health = 4;
      
      JavaScriptAudition.actions.playCards(player1, player2);
    
      expect(winnerFunction).toHaveBeenCalled();
    });

    it('Opponent becomes active after player plays cards', function(){
      JavaScriptAudition.actions.startTurn(player1);
      player1.cardsInPlay = [JavaScriptAudition.objects.card(1)];
      
      var opponentStart = spyOn(JavaScriptAudition.actions, "startTurn").and.callThrough();
      JavaScriptAudition.actions.playCards(player1, player2);
      expect(opponentStart).toHaveBeenCalledWith(player2);
      expect(player1.active).toBe(false);
      expect(player2.active).toBe(true);
    });

  })

});

  //STARTING A GAME
  // 2 players
  // 30 Health per player
  // 0 mana per player
  // 20 damage cards per player
  // mana values: 0,0,1,1,2,2,2,3,3,3,3,4,4,4,5,5,6,6,7,8
  // 3 random cards from respective decks to start

  //MANA
  // on turn. get 1 mana, max 10
  
  //PLAYING
  // draw random card (from player deck)
  // play only as many cards as they can afford by mana value
  // cards use mana based on their mana costs when played
  // deal damage equal to mana cost
  // if no cards or not enough mana, turn is forfeit

  //WINNING
  // opponent player health drops <= 0, active wins

  //SPECIAL RULES
  // Bleed out: if player deck is empty, receive 1 damage (no card draw)
  // Overload: if player already has 4 cards, the next card drawn is discarded
  // Dud Card: 0 Mana cards are played free but do no damage
