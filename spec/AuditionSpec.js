describe("Audition JavaScript Tests", function() {
  // const initValues = {health: 30, mana: 0, handSize: 3, deckSize: 20};

    describe("GAME INITIALIZATION", function() {
      it(`Players are given ${initValues.health} Health`, function() {
        JavaScriptAudition.init();
        expect(player1.health == 30).toBe(true);
        expect(player2.health == 30).toBe(true);
      });

      it(`Players are given ${initValues.mana} Mana`, function() {
        JavaScriptAudition.init();
        expect(player1.mana == 0).toBe(true);
        expect(player2.mana == 0).toBe(true);
      });

      it(`Player deck contains ${initValues.deck.length} Cards`, function() {
        JavaScriptAudition.init();
        expect(player1.deck.length).toEqual(initValues.deck.length);
        expect(player1.deck.length).toEqual(initValues.deck.length);
      });

      it(`Player deck contains the correct card values`, function() {
        JavaScriptAudition.init();
        const initialCards = [0,0,1,1,2,2,2,3,3,3,3,4,4,4,5,5,6,6,7,8];

        expect(player1.deck.map( function(card){ return card.value } )).toEqual(initialCards);
      });

      it(`Players are given ${initValues.handSize} Cards`, function() {
        JavaScriptAudition.init();
        JavaScriptAudition.actions.initialHandDraw(player1);
        JavaScriptAudition.actions.initialHandDraw(player2);

        expect(player1.hand.length).toEqual(3);
        expect(player2.hand.length).toEqual(3);
      });

      it(`Player deck contains ${initValues.deck.length - initValues.handSize} Cards after draw`, function() {
        JavaScriptAudition.init();
        JavaScriptAudition.actions.initialHandDraw(player1);
        JavaScriptAudition.actions.initialHandDraw(player2);

        expect(player1.deck.length).toEqual(initValues.deck.length - initValues.handSize);
        expect(player2.deck.length).toEqual(initValues.deck.length - initValues.handSize);
      });
    });


describe("PLAYER ACTIONS", function() {
    
    describe("Becomes Active", function() {
      it('Players gains 1 Mana', function() {
        
      });

      it('Players does not gain more than 10 Mana', function() {
        
      });

      it('Player Bleeds Out (1 damage) if no cards remain in deck', function() {
        
      });

    });
    

    describe("Draws Card", function() {
      
      it('Reduces player\'s deck size by 1', function() {
        
      });

      it('Added to player\'s hand', function() {
        
      });

      it('If no card is less than mana pool, lose turn', function() {
        
      });

      describe("If already holding 4 cards...", function() {
        it('next drawn card is thrown out', function() {
          
        });

        it('previous cards remain in hand', function() {
          
        });
      });

    });
  });

  describe("Makes Move", function(){

    it('Can only play combination of cards up to mana pool', function(){
        
    });

    it('Card played reduces mana pool by card cost', function(){

    });

    it('Multiple cards reduce mana cost by total used', function(){
        
    });

    it('Opponent health is reduced by card mana cost played', function(){
        
    });

    it('Opponent loses if damage dealt is more than health remaining', function(){
        
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
