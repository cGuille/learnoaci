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

    startBtn.addEventListener('click', startGame.bind(context));
    revealBtn.addEventListener('click', reveal.bind(context));
    nextBtn.addEventListener('click', goNext.bind(context));

    swapIn(startBtn);
}

function startGame() {
    console.log('start');
    swapOut(this.startBtn);
    changeItem.apply(this);
    swapIn(this.revealBtn);
}

function reveal() {
    console.log('reveal');
    swapOut(this.revealBtn);
    show(this.result);
    swapIn(this.nextBtn);
}

function goNext() {
    console.log('next', this);
    swapOut(this.nextBtn);
    changeItem.apply(this);
    swapIn(this.revealBtn);
}

function changeItem() {
    this.result.classList.add('hidden');

    const item = pickItem();

    this.prompt.innerHTML = item.symbol;
    this.result.innerHTML = `
        <p id="codeword">${item.codeWord}</p>
        <p id="respelling">${item.respelling}</p>
    `;
}

function pickItem() {
    return ALPHABET[randomInt(ALPHABET.length)];
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
