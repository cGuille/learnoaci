document.addEventListener('DOMContentLoaded', main);

const ALPHABET = [
    { symbol: 'A', codeWord: 'Alfa', respelling: 'AL fah' },
    { symbol: 'B', codeWord: 'Bravo', respelling: 'BRAH voh' },
    { symbol: 'C', codeWord: 'Charlie', respelling: 'CHAR lee or SHAR lee' },
    { symbol: 'D', codeWord: 'Delta', respelling: 'DELL tah' },
    { symbol: 'E', codeWord: 'Echo', respelling: 'ECK oh' },
    { symbol: 'F', codeWord: 'Foxtrot', respelling: 'FOKS trot' },
    { symbol: 'G', codeWord: 'Golf', respelling: 'golf' },
    { symbol: 'H', codeWord: 'Hotel', respelling: 'ho TELL' },
    { symbol: 'I', codeWord: 'India', respelling: 'IN dee ah' },
    { symbol: 'J', codeWord: 'Juliett', respelling: 'JEW lee ETT' },
    { symbol: 'K', codeWord: 'Kilo', respelling: 'KEY loh' },
    { symbol: 'L', codeWord: 'Lima', respelling: 'LEE mah' },
    { symbol: 'M', codeWord: 'Mike', respelling: 'mike' },
    { symbol: 'N', codeWord: 'November', respelling: 'no VEM ber' },
    { symbol: 'O', codeWord: 'Oscar', respelling: 'OSS cah' },
    { symbol: 'P', codeWord: 'Papa', respelling: 'pah PAH' },
    { symbol: 'Q', codeWord: 'Quebec', respelling: 'keh BECK' },
    { symbol: 'R', codeWord: 'Romeo', respelling: 'ROW me oh' },
    { symbol: 'S', codeWord: 'Sierra', respelling: 'see AIR rah' },
    { symbol: 'T', codeWord: 'Tango', respelling: 'TANG go' },
    { symbol: 'U', codeWord: 'Uniform', respelling: 'YOU nee form or OO nee form' },
    { symbol: 'V', codeWord: 'Victor', respelling: 'VIK tah' },
    { symbol: 'W', codeWord: 'Whiskey', respelling: 'WISS key' },
    { symbol: 'X', codeWord: 'Xray', respelling: 'ECKS ray' },
    { symbol: 'Y', codeWord: 'Yankee', respelling: 'YANG key' },
    { symbol: 'Z', codeWord: 'Zulu', respelling: 'ZOO loo' },
];

function main() {
    window.game = new Game(document);
}

class Game {
    constructor(doc) {
        this.gameDisplay = doc.getElementById('game-display');
        this.scoreboard = doc.getElementById('scoreboard');
        this.prompt = doc.getElementById('prompt');
        this.result = doc.getElementById('result');
        this.startBtn = doc.getElementById('start');
        this.restartBtn = doc.getElementById('restart');
        this.revealBtn = doc.getElementById('reveal');
        this.okBtn = doc.getElementById('ok');
        this.koBtn = doc.getElementById('ko');

        const startFn = this.start.bind(this);
        this.startBtn.addEventListener('click', startFn);
        this.restartBtn.addEventListener('click', startFn);
        this.revealBtn.addEventListener('click', this.reveal.bind(this));
        this.okBtn.addEventListener('click', this.ok.bind(this));
        this.koBtn.addEventListener('click', this.ko.bind(this));

        this.initAlphabet();

        swapIn(this.startBtn);
    }

    debugMode() {
        this.initAlphabet(2);

        this.prompt.innerHTML = '';
        hide(this.result);
        swapOut(this.scoreboard);
        swapOut(this.restartBtn);
        swapOut(this.revealBtn);
        swapOut(this.okBtn);
        swapOut(this.koBtn);
        swapIn(this.gameDisplay);
        swapIn(this.startBtn);
    }

    start() {
        swapOut(this.startBtn);
        swapOut(this.restartBtn);
        swapOut(this.scoreboard);
        swapIn(this.gameDisplay);

        this.changeItem();
        swapIn(this.revealBtn);
    }

    reveal() {
        swapOut(this.revealBtn);
        show(this.result);
        swapIn(this.okBtn);
        swapIn(this.koBtn);
    }

    ok() {
        this.score += 1;
        this.next();
    }

    ko() {
        this.next();
    }

    next() {
        swapOut(this.okBtn);
        swapOut(this.koBtn);

        if (this.alphabet.length) {
            this.changeItem();
            swapIn(this.revealBtn);
        } else {
            this.scoreboard.innerHTML = `
                <p id="score-intro">You scored</p>
                <p id="score">${this.score} / ${this.maxscore}
            `;

            swapOut(this.gameDisplay);
            swapIn(this.scoreboard);

            this.initAlphabet();
            swapIn(this.restartBtn);
        }

    }

    changeItem() {
        hide(this.result);

        const item = this.pickItem();

        this.prompt.innerHTML = item.symbol;
        this.result.innerHTML = `
            <p id="codeword">${item.codeWord}</p>
            <p id="respelling">${item.respelling}</p>
        `;
    }

    initAlphabet(maxItems) {
        this.alphabet = ALPHABET.slice(0, maxItems || Infinity);
        this.score = 0;
        this.maxscore = this.alphabet.length;
    }

    pickItem() {
        return this.alphabet.splice(randomInt(this.alphabet.length), 1)[0];
    }
}

function randomInt(max) {
    return Math.floor(Math.random() * max);
}

function swapIn(elt) {
    elt.classList.remove('out');
}

function swapOut(elt) {
    elt.classList.add('out');
}

function show(elt) {
    elt.classList.remove('hidden');
}

function hide(elt) {
    elt.classList.add('hidden');
}
