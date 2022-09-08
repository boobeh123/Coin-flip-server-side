document.querySelector('#heads').addEventListener('click', coinFlipHeads);
document.querySelector('#tails').addEventListener('click', coinFlipTails);

async function coinFlipHeads() {
    let playerChoice = document.querySelector('#heads').value;
    const response = await fetch(`/api`);
    const data = await response.json();
    console.log(data);

    if ((playerChoice === 'heads') && (data.coinSide === 'heads')) {
        document.querySelector('.winningCondition').style.color = 'green';
        document.querySelector('.winningCondition').textContent = `Player wins`;
        document.querySelector('.coinFlipResult').textContent = data.coinSide;
        document.querySelector(".playerChoice").textContent = playerChoice
    } else {
        document.querySelector('.winningCondition').style.color = 'red';
        document.querySelector('.winningCondition').textContent = `Server wins`;
        document.querySelector('.coinFlipResult').textContent = data.coinSide;
        document.querySelector(".playerChoice").textContent = playerChoice
    }
}

async function coinFlipTails() {
    let playerChoice = document.querySelector('#tails').value;
    const response = await fetch(`/api`);
    const data = await response.json();
    console.log(data);

    if ((playerChoice === 'tails') && (data.coinSide === 'tails')) {
        document.querySelector('.winningCondition').style.color = 'green';
        document.querySelector('.winningCondition').textContent = `Player wins`;
        document.querySelector('.coinFlipResult').textContent = data.coinSide;
        document.querySelector(".playerChoice").textContent = playerChoice
    } else {
        document.querySelector('.winningCondition').style.color = 'red';
        document.querySelector('.winningCondition').textContent = `Server wins`;
        document.querySelector('.coinFlipResult').textContent = data.coinSide;
        document.querySelector(".playerChoice").textContent = playerChoice
    }
}