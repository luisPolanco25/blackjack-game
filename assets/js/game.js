const myGame = (() => {
    'use strict'


    let deck           = [],
        playersPoints  = [];

    const typesOfCards = ['C', 'D', 'H', 'S'],
          otherCards   = ['A', 'J', 'Q', 'K'];


    // HTML References


    const secondButton     = document.querySelector('#second-button'),
          thirdButton      = document.querySelector('#third-button'),
          firstButton      = document.querySelector('#first-button'),
          span             = document.querySelectorAll('span'),
          divPlayersCards  = document.querySelectorAll('.cards-box');

    // This function initializes the game


    const gameInitializer = (playersQuantity = 2) => {
        deck = createDeck();
        playersPoints = [];
        for (let x = 0; x < playersQuantity; x++) {
            playersPoints.push(0);
        }
        span.forEach(element => element.innerText = 0);
        divPlayersCards.forEach(element => element.innerHTML = '');
        secondButton.disabled = false;
        thirdButton.disabled  = false;
    }


    // This function creates a new deck


    const createDeck = () => {
        deck = [];
        for (let x = 2; x <= 10; x++) {
            for (let typeOfCard of typesOfCards) {
                deck.push(x + typeOfCard);
            };
        };
        for (let typeOfCard of typesOfCards) {
            for (let anotherCard of otherCards) {
                deck.push(anotherCard + typeOfCard);
            }
        };
        
        return _.shuffle(deck);
    }

    
    // This function allows me to take a card from the deck


    const getACard = () => {
        if (deck.length === 0) {
            throw 'There are no cards in the deck';
        }
        return deck.pop();
    }

    const cardValue = (card) => {
        const value = card.substring(0, card.length - 1);
        return (isNaN(value)) ? ((value === 'A') ? 11 : 10) : value * 1;
    }


    // Computer's turn to play


    const boxPoints = (card, turn) => {
        playersPoints[turn]  = playersPoints[turn] + cardValue(card);
        span[turn].innerText = playersPoints[turn];
        return playersPoints[turn];
    }

    const createCard = (card, turn) => {
        const cardImages = document.createElement('img');
        cardImages.src   = `assets/cards/${card}.png`;
        cardImages.classList.add('cards');
        divPlayersCards[turn].append(cardImages);
    }

    const winnerDeterminer = () => {

        const [minPoints, computerPoints] = playersPoints;
        setTimeout(() => {
            if (computerPoints === minPoints) {
                alert('Nobody wins');
            } else if (minPoints > 21) {
                alert('The computer won, sorry');
            } else if (computerPoints > 21) {
                alert('You won!');
            } else {
                alert('The computer won, sorry');
            }
        }, 100);
    }

    const computerTurn = (minPoints) => {
        let computerPoints = 0;
        
        do {
            const card     = getACard();
            computerPoints = boxPoints(card, playersPoints.length - 1);
            createCard(card, playersPoints.length - 1);
            
        } while ((computerPoints < minPoints) && (minPoints <= 21));

        winnerDeterminer();
    }


    // Events


    firstButton.addEventListener('click', () => {
        gameInitializer();
    });

    secondButton.addEventListener('click', () => {
        const card         = getACard();
        const playerPoints = boxPoints(card, 0);
        createCard(card, 0);

        if(playerPoints > 21) {
            console.warn('You lost!');
            secondButton.disabled = true;
            thirdButton.disabled  = true;
            computerTurn(playerPoints);
        } else if (playerPoints === 21) {
            console.warn('You won!');
            secondButton.disabled = true;
            thirdButton.disabled  = true;
            computerTurn(playerPoints);
        } 
    });

    thirdButton.addEventListener('click', () => {
        secondButton.disabled = true;
        thirdButton.disabled  = true;
        computerTurn(playersPoints[0]);
    }); 
    
    return {
        newGame: gameInitializer
    };

})();

