/* =========================================
   GAME VARIABLES
========================================= */

let homeScore = 0;

let guestScore = 0;

let homeFouls = 0;

let guestFouls = 0;


let homeName = "TEAM A";

let guestName = "TEAM B";


let currentQuarter = 1;

let clockSeconds = 12 * 60;

let timer = null;

let gameStarted = false;

let gamePaused = true;

let roundNumber = 1;


/*
    Stores completed rounds.

    Example:

    [
        {
            round: 1,
            home: 78,
            guest: 72,
            winner: "Lakers"
        }
    ]
*/

const roundHistory = [];



/* =========================================
   HELPER
========================================= */

const $ = (id) => {

    return document.getElementById(id);

};



/* =========================================
   UPDATE SCOREBOARD
========================================= */

function updateScoreboard() {

    /*
        Update scores
    */

    $("home-score").textContent =
        homeScore;

    $("guest-score").textContent =
        guestScore;


    /*
        Update fouls
    */

    $("home-fouls").textContent =
        homeFouls;

    $("guest-fouls").textContent =
        guestFouls;


    /*
        Update team names
    */

    $("home-name").textContent =
        homeName;

    $("guest-name").textContent =
        guestName;



    /*
        Calculate clock
    */

    const minutes =
        Math.floor(
            clockSeconds / 60
        );

    const seconds =
        clockSeconds % 60;


    $("game-clock").textContent =
        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;



    /*
        Game status
    */

    if (!gameStarted) {

        $("period-label").textContent =
            "READY";

        $("game-status").textContent =
            "Game not started";

        $("game-status-dot")
            .classList
            .remove("live");

    }

    else if (gamePaused) {

        $("game-status").textContent =
            "Game paused";

        $("game-status-dot")
            .classList
            .remove("live");

    }

    else {

        $("game-status").textContent =
            `Round ${roundNumber} • Live`;

        $("game-status-dot")
            .classList
            .add("live");
    }



    /*
        Quarter label
    */

    $("period-label").textContent =

        gameStarted
            ? `Q${currentQuarter}`
            : "READY";



    /*
        Enable / disable scoring
    */

    const buttons =
        document.querySelectorAll(
            ".score-buttons button, .foul-btn"
        );


    buttons.forEach(button => {

        button.disabled =
            !gameStarted ||
            gamePaused;

    });



    /*
        New round button
    */

    $("new-round-btn").disabled =
        !gameStarted;
}



/* =========================================
   ADD SCORE
========================================= */

function addScore(team, points) {

    if (
        !gameStarted ||
        gamePaused
    ) {

        return;
    }


    if (team === "home") {

        homeScore += points;

    }


    if (team === "guest") {

        guestScore += points;

    }


    updateScoreboard();
}



/* =========================================
   ADD FOUL
========================================= */

function addFoul(team) {

    if (
        !gameStarted ||
        gamePaused
    ) {

        return;
    }


    if (team === "home") {

        homeFouls++;

    }


    if (team === "guest") {

        guestFouls++;

    }


    updateScoreboard();
}



/* =========================================
   NEW GAME
========================================= */

function openNewGame() {

    stopTimer();


    $("new-game-modal")
        .classList
        .remove("hidden");


    $("home-team-input").value = "";

    $("guest-team-input").value = "";


    setTimeout(
        () => {

            $("home-team-input")
                .focus();

        },

        100
    );
}



/* =========================================
   CLOSE MODAL
========================================= */

function closeModal() {

    $("new-game-modal")
        .classList
        .add("hidden");
}



/* =========================================
   START NEW GAME
========================================= */

function startNewGame() {

    const newHome =
        $("home-team-input")
            .value
            .trim();


    const newGuest =
        $("guest-team-input")
            .value
            .trim();



    /*
        Validate names
    */

    if (
        !newHome ||
        !newGuest
    ) {

        alert(
            "Please enter both team names."
        );

        return;
    }



    /*
        Set team names
    */

    homeName =
        newHome;

    guestName =
        newGuest;



    /*
        Reset game
    */

    homeScore = 0;

    guestScore = 0;

    homeFouls = 0;

    guestFouls = 0;


    currentQuarter = 1;

    clockSeconds =
        12 * 60;


    roundNumber = 1;


    roundHistory.length = 0;


    gameStarted = true;

    gamePaused = true;



    /*
        Update UI
    */

    renderRoundHistory();

    updateScoreboard();


    closeModal();



    /*
        Start countdown
    */

    startCountdown(
        "GAME STARTING",
        beginQuarter
    );
}



/* =========================================
   COUNTDOWN
========================================= */

function startCountdown(
    label,
    callback
) {

    stopTimer();


    const overlay =
        $("countdown-overlay");


    const labelElement =
        $("countdown-period");


    const numberElement =
        $("countdown-number");


    overlay.classList
        .remove("hidden");


    labelElement.textContent =
        label;


    let count = 5;


    numberElement.textContent =
        count;



    const countdownTimer =
        setInterval(
            () => {

                count--;


                if (count <= 0) {

                    clearInterval(
                        countdownTimer
                    );


                    overlay.classList
                        .add("hidden");


                    callback();


                    return;
                }


                numberElement.textContent =
                    count;

            },

            1000
        );
}



/* =========================================
   BEGIN QUARTER
========================================= */

function beginQuarter() {

    gamePaused = false;


    updateScoreboard();


    startTimer();
}



/* =========================================
   START TIMER
========================================= */

function startTimer() {

    stopTimer();


    timer =
        setInterval(
            () => {

                if (
                    !gameStarted ||
                    gamePaused
                ) {

                    return;
                }


                clockSeconds--;



                /*
                    Quarter finished
                */

                if (
                    clockSeconds <= 0
                ) {

                    clockSeconds = 0;


                    updateScoreboard();


                    stopTimer();


                    finishQuarter();


                    return;
                }


                updateScoreboard();

            },

            1000
        );
}



/* =========================================
   STOP TIMER
========================================= */

function stopTimer() {

    if (timer) {

        clearInterval(timer);

        timer = null;
    }
}



/* =========================================
   QUARTER FINISHED
========================================= */

function finishQuarter() {

    gamePaused = true;


    updateScoreboard();



    /*
        Q2 = HALFTIME
    */

    if (
        currentQuarter === 2
    ) {

        showBreak(

            "HALFTIME",

            "The first half is complete. Take a break, then continue for Q3.",

            "Continue to Q3",

            () => {

                currentQuarter = 3;

                clockSeconds =
                    12 * 60;


                startCountdown(

                    "Q3 STARTING",

                    beginQuarter

                );

            }

        );


        return;
    }



    /*
        Q4 finished
        = round finished
    */

    if (
        currentQuarter === 4
    ) {

        finishRound();

        return;
    }



    /*
        Q1 or Q3
    */

    showBreak(

        `END OF Q${currentQuarter}`,

        `Quarter ${currentQuarter} is complete.`,

        `Start Q${currentQuarter + 1}`,

        () => {

            currentQuarter++;


            clockSeconds =
                12 * 60;


            startCountdown(

                `Q${currentQuarter} STARTING`,

                beginQuarter

            );

        }

    );
}



/* =========================================
   SHOW BREAK
========================================= */

function showBreak(
    title,
    message,
    buttonText,
    callback
) {

    $("break-title")
        .textContent =
        title;


    $("break-message")
        .textContent =
        message;


    $("continue-btn")
        .textContent =
        buttonText;


    $("break-overlay")
        .classList
        .remove("hidden");



    $("continue-btn").onclick =
        () => {

            $("break-overlay")
                .classList
                .add("hidden");


            callback();
        };
}



/* =========================================
   FINISH ROUND
========================================= */

function finishRound() {

    /*
        Find round winner
    */

    const winner =

        homeScore === guestScore

            ? "Draw"

            : homeScore > guestScore

                ? homeName

                : guestName;



    /*
        Save round
    */

    roundHistory.push({

        round:
            roundNumber,

        home:
            homeScore,

        guest:
            guestScore,

        winner:
            winner

    });



    /*
        Display round
    */

    renderRoundHistory();



    /*
        Three rounds completed
    */

    if (
        roundHistory.length >= 3
    ) {

        gamePaused = true;


        updateScoreboard();


        showSeriesWinner();


        return;
    }



    /*
        Round finished
    */

    gamePaused = true;


    updateScoreboard();



    showBreak(

        `ROUND ${roundNumber} COMPLETE`,

        winner === "Draw"

            ? "This round ended in a draw."

            : `${winner} wins this round.`,

        "Start Next Round",

        startNextRound

    );
}



/* =========================================
   START NEXT ROUND
========================================= */

function startNextRound() {

    roundNumber++;


    /*
        Reset scores
    */

    homeScore = 0;

    guestScore = 0;


    /*
        Reset fouls
    */

    homeFouls = 0;

    guestFouls = 0;


    /*
        Reset quarter
    */

    currentQuarter = 1;


    /*
        Reset clock
    */

    clockSeconds =
        12 * 60;


    gamePaused = true;


    updateScoreboard();


    /*
        Countdown
    */

    startCountdown(

        `ROUND ${roundNumber}`,

        beginQuarter

    );
}



/* =========================================
   MANUAL NEW ROUND
========================================= */

function newRoundManually() {

    if (!gameStarted) {

        return;
    }



    const shouldStart =
        confirm(

            `Save Round ${roundNumber} at ${homeScore}-${guestScore} and start Round ${roundNumber + 1}?`

        );



    if (!shouldStart) {

        return;
    }



    stopTimer();



    /*
        Find winner
    */

    const winner =

        homeScore === guestScore

            ? "Draw"

            : homeScore > guestScore

                ? homeName

                : guestName;



    /*
        Save round
    */

    roundHistory.push({

        round:
            roundNumber,

        home:
            homeScore,

        guest:
            guestScore,

        winner:
            winner

    });



    /*
        Three rounds
    */

    if (
        roundHistory.length >= 3
    ) {

        renderRoundHistory();


        showSeriesWinner();


        return;
    }



    /*
        Start next round
    */

    startNextRound();


    renderRoundHistory();
}



/* =========================================
   RENDER ROUND HISTORY
========================================= */

function renderRoundHistory() {

    const container =
        $("round-history");



    /*
        No rounds
    */

    if (
        !roundHistory.length
    ) {

        container.innerHTML =
            '<div class="empty-history">No completed rounds yet.</div>';

    }

    else {

        /*
            Create cards
        */

        container.innerHTML =
            roundHistory
                .map(

                    round => `

                        <div
                            class="round-card ${
                                round.winner !== "Draw"
                                    ? "winner"
                                    : ""
                            }"
                        >

                            <div class="round-title">

                                ROUND ${round.round}

                            </div>


                            <div class="round-score">

                                <span>
                                    ${escapeHtml(homeName)}
                                </span>

                                <span class="points">
                                    ${round.home}
                                </span>

                            </div>


                            <div class="round-score">

                                <span>
                                    ${escapeHtml(guestName)}
                                </span>

                                <span class="points">
                                    ${round.guest}
                                </span>

                            </div>


                            <div class="round-winner">

                                ${
                                    round.winner === "Draw"

                                        ? "DRAW"

                                        : `WINNER:
                                            ${escapeHtml(
                                                round.winner
                                            )}`
                                }

                            </div>

                        </div>

                    `

                )
                .join("");
    }



    /*
        Calculate round wins
    */

    const homeWins =
        roundHistory.filter(
            round =>
                round.home >
                round.guest
        ).length;


    const guestWins =
        roundHistory.filter(
            round =>
                round.guest >
                round.home
        ).length;



    /*
        Update series score
    */

    $("series-score")
        .textContent =
        `${homeWins} - ${guestWins}`;



    /*
        Final result
    */

    if (
        roundHistory.length >= 3
    ) {

        const seriesWinner =

            homeWins === guestWins

                ? "Series Draw"

                : homeWins > guestWins

                    ? `${homeName} Wins`

                    : `${guestName} Wins`;



        container.insertAdjacentHTML(

            "beforeend",

            `

                <div class="series-result">

                    ${escapeHtml(seriesWinner)}

                    • Final Round Score

                    ${homeWins}-${guestWins}

                </div>

            `

        );
    }
}



/* =========================================
   SHOW SERIES WINNER
========================================= */

function showSeriesWinner() {

    stopTimer();


    gamePaused = true;


    renderRoundHistory();



    const homeWins =
        roundHistory.filter(
            round =>
                round.home >
                round.guest
        ).length;


    const guestWins =
        roundHistory.filter(
            round =>
                round.guest >
                round.home
        ).length;



    const winner =

        homeWins === guestWins

            ? "Series Draw"

            : homeWins > guestWins

                ? `${homeName} WINS`

                : `${guestName} WINS`;



    showBreak(

        "🏆 GAME OVER",

        `${winner} — round record ${homeWins}-${guestWins}.`,

        "Close Result",

        () => {

            $("break-overlay")
                .classList
                .add("hidden");


            updateScoreboard();

        }

    );
}



/* =========================================
   NEW GAME RESET
========================================= */

function resetScores() {

    openNewGame();

}



/* =========================================
   SECURITY / HTML ESCAPE
========================================= */

function escapeHtml(value) {

    return String(value)
        .replace(
            /[&<>"']/g,

            character => ({

                "&":
                    "&amp;",

                "<":
                    "&lt;",

                ">":
                    "&gt;",

                '"':
                    "&quot;",

                "'":
                    "&#039;"

            }[character])

        );

}



/* =========================================
   SCORE BUTTON EVENTS
========================================= */

document
    .querySelectorAll(
        ".score-buttons button"
    )
    .forEach(
        button => {

            button.addEventListener(
                "click",

                () => {

                    addScore(

                        button.dataset.team,

                        Number(
                            button.dataset.points
                        )

                    );

                }

            );

        }
    );



/* =========================================
   FOUL BUTTON EVENTS
========================================= */

document
    .querySelectorAll(
        ".foul-btn"
    )
    .forEach(
        button => {

            button.addEventListener(
                "click",

                () => {

                    addFoul(

                        button.dataset.foulTeam

                    );

                }

            );

        }
    );



/* =========================================
   NEW GAME BUTTON
========================================= */

$("new-game-btn")
    .addEventListener(
        "click",
        openNewGame
    );



/* =========================================
   NEW ROUND BUTTON
========================================= */

$("new-round-btn")
    .addEventListener(
        "click",
        newRoundManually
    );



/* =========================================
   CLOSE MODAL
========================================= */

$("close-modal")
    .addEventListener(
        "click",
        closeModal
    );



/* =========================================
   START GAME BUTTON
========================================= */

$("start-game-btn")
    .addEventListener(
        "click",
        startNewGame
    );



/* =========================================
   ENTER KEY - TEAM 2
========================================= */

$("guest-team-input")
    .addEventListener(

        "keydown",

        event => {

            if (
                event.key === "Enter"
            ) {

                startNewGame();

            }

        }

    );



/* =========================================
   ENTER KEY - TEAM 1
========================================= */

$("home-team-input")
    .addEventListener(

        "keydown",

        event => {

            if (
                event.key === "Enter"
            ) {

                $("guest-team-input")
                    .focus();

            }

        }

    );



/* =========================================
   INITIALIZE
========================================= */

updateScoreboard();