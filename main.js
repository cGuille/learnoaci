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
    new Game(
        document.getElementById('prompt'),
        document.getElementById('result'),
        document.getElementById('start'),
        document.getElementById('reveal'),
        document.getElementById('next'),
        document.getElementById('restart')
    );
}

class Game {
    constructor(prompt, result, startBtn, revealBtn, nextBtn, restartBtn) {
        this.prompt = prompt;
        this.result = result;
        this.startBtn = startBtn;
        this.revealBtn = revealBtn;
        this.nextBtn = nextBtn;
        this.restartBtn = restartBtn;

        const startFn = this.start.bind(this);
        this.startBtn.addEventListener('click', startFn);
        this.restartBtn.addEventListener('click', startFn);
        this.revealBtn.addEventListener('click', this.reveal.bind(this));
        this.nextBtn.addEventListener('click', this.next.bind(this));

        this.initAlphabet();

        swapIn(this.startBtn);
    }

    start() {
        swapOut(this.startBtn);
        swapOut(this.restartBtn);
        this.changeItem();
        swapIn(this.revealBtn);
    }

    reveal() {
        swapOut(this.revealBtn);
        show(this.result);

        if (this.alphabet.length) {
            swapIn(this.nextBtn);
        } else {
            this.initAlphabet();
            swapIn(this.restartBtn);
        }
    }

    next() {
        swapOut(this.nextBtn);
        this.changeItem();
        swapIn(this.revealBtn);
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

    initAlphabet() {
        this.alphabet = Array.from(ALPHABET);
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
