# Card Game Kata #
Problem description here http://codingdojo.org/kata/TradingCardGame/

* Test driven using Jasmine
* Implemented requirements 
    * Player Initialization tests
        * starting health & mana
        * deck containing correct cards
        * starting hand size
        * deck size reduction after drawing cards
        * random player chosen to start
    * Player Action tests
        * max mana gain
        * bleeding out if no cards remain in deck
    * Drawing Cards
        * deck size is reduced
        * card is added to player's hand
        * player turn loss when no card is playable based on mana
        * card thrown out if already holding 4 cards
     * Playing Cards
        * can only play cards up to mana pool available
        * cards played reduce mana pool
        * opponent health reduced by card values
        * opponent loses if no health remains
        * opponent becomes active after active player plays their hand

* additional win checking method.

* Player action functions are small to make future graphical or sound effects have a clear location to be placed. (e.g. mana gain, health lost)

* Hard coded values are avoided in unit tests so game balancing can be performed without the need to update all related tests.
