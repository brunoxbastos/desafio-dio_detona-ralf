const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score")
    },

    values: {
        hitPosition: 0,
        result: 0,
        currentTime: 60,
    },

    actions: { // Corrigido: era "actitions"
        countDownTimeId: setInterval(countDown, 1000),
        gameVelocity: 800,
        timerId: null,
    },

    // Novo: Áudio pré-carregado para melhor performance
    audio: {
        hitSound: new Audio("./src/sounds/efeito-de-socos.mp3")
    }
}

function countDown(){
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if(state.values.currentTime <= 0) {
        clearInterval(state.actions.countDownTimeId);
        clearInterval(state.actions.timerId);
        alert("Seu tempo acabou! Sua pontuação é " + state.values.result);
    }
}

function sound(startTime = 0){
    const audio = state.audio.hitSound;
    audio.currentTime = startTime;
    audio.play().catch();
}

function randomSquare(){
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

function moveEnemy(){
    state.values.timerId = setInterval(randomSquare, state.actions.gameVelocity);
}

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if(square.id === state.values.hitPosition){
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                sound(0.5); 
            }
        });
    });
}

function init() {
    moveEnemy();
    addListenerHitBox();
}

init();