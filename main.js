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
    const prompt = document.getElementById('prompt');
    const result = document.getElementById('result');

    const startBtn = document.getElementById('start');
    const revealBtn = document.getElementById('reveal');
    const nextBtn = document.getElementById('next');

    const context = {
        prompt: prompt,
        result: result,
        startBtn: startBtn,
        revealBtn: revealBtn,
        nextBtn: nextBtn,
    };

    new Game(prompt, result, startBtn, revealBtn, nextBtn);
}

class Game {
    constructor(prompt, result, startBtn, revealBtn, nextBtn) {
        this.prompt = prompt;
        this.result = result;
        this.startBtn = startBtn;
        this.revealBtn = revealBtn;
        this.nextBtn = nextBtn;

        this.startBtn.addEventListener('click', this.start.bind(this));
        this.revealBtn.addEventListener('click', this.reveal.bind(this));
        this.nextBtn.addEventListener('click', this.next.bind(this));

        this.alphabet = Array.from(ALPHABET);

        swapIn(this.startBtn);
    }

    start() {
        swapOut(this.startBtn);
        this.changeItem();
        swapIn(this.revealBtn);
    }

    reveal() {
        swapOut(this.revealBtn);
        show(this.result);
        swapIn(this.nextBtn);
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

    pickItem() {
        return this.alphabet[randomInt(this.alphabet.length)];
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
