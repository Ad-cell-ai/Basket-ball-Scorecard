# 🏀 Basketball Scorecard

A browser-based basketball scoreboard built with **HTML, CSS, and JavaScript**. It provides a simple, interactive way to manage basketball games with live scoring, fouls, game timing, quarters, halftime, multiple rounds, and winner detection.

## 🌐 Live Demo

**Play the Basketball Scorecard online:**

https://ad-cell-ai.github.io/Basket-ball-Scorecard/

---

## 📸 Overview

Basketball Scorecard is designed to provide a clean scoreboard experience similar to a real basketball game.

Players can create a game, enter their own team names, start the match, track scores, manage fouls, follow the game clock, and save the results of multiple rounds.

---

## ✨ Features

### 🏀 Game Setup

* Create a new game using the **New Game** button.
* Enter custom names for both teams.
* No fixed `HOME` or `GUEST` prefixes are required.
* Start the game with a countdown.

### ⏱️ Game Timer

The game follows a four-quarter structure:

```text
Q1 → Q2 → HALFTIME → Q3 → Q4
```

Each quarter starts with a countdown and uses a **12-minute game clock**.

### 🏆 Scoring

Each team has three scoring buttons:

* `+1` point
* `+2` points
* `+3` points

Scores are updated instantly on the scoreboard.

### 🚨 Fouls

Each team has its own foul counter.

Use the **+ Foul** button to increase the team's foul count during the game.

### 🔄 Multiple Rounds

The scoreboard supports up to **3 rounds**.

After a round is completed:

* The round score is saved.
* The winning team is determined.
* The result appears under **Round Results**.
* A new round can be started.
* Scores and fouls are reset for the next round.

Example:

```text
ROUND 1
Team A    82
Team B    76
WINNER: Team A

ROUND 2
Team A    71
Team B    79
WINNER: Team B
```

### 🥇 Overall Winner

After three rounds, the application compares the number of rounds won by each team.

Example:

```text
Team A Wins
Final Round Score 2-1
```

If both teams have the same number of round victories, the result is shown as a series draw.

---

## 🎮 How to Play

### 1. Start a Game

Click:

```text
New Game
```

Enter the names of the two teams.

For example:

```text
Team 1: Lakers
Team 2: Warriors
```

Then click:

```text
Start Game
```

---

### 2. Game Countdown

A countdown appears before the game starts:

```text
5
4
3
2
1
```

The first quarter then begins.

---

### 3. Track the Score

Use the scoring buttons:

```text
+1
+2
+3
```

to update each team's score.

---

### 4. Track Fouls

Use:

```text
+ Foul
```

under the appropriate team.

---

### 5. Follow the Game

The scoreboard displays the current quarter and remaining time.

The game progresses through:

```text
Q1
↓
Q2
↓
HALFTIME
↓
Q3
↓
Q4
```

---

### 6. Complete the Round

When Q4 ends, the round result is calculated automatically.

The completed round appears in:

```text
Round Results
```

---

### 7. Start the Next Round

Click:

```text
New Round
```

or continue using the next-round option after a completed round.

The previous round remains visible while the new round starts with fresh scores.

---

### 8. Determine the Winner

After Round 3, the scoreboard calculates which team won the most rounds and displays the final result.

---

## 🛠️ Technologies Used

This project uses standard front-end web technologies:

* **HTML5** — page structure
* **CSS3** — styling and responsive layout
* **JavaScript** — game logic, scoring, timer, rounds, and winner calculation
* **GitHub Pages** — deployment

No backend or database is required.

---

## 📁 Project Structure

```text
Basket-ball-Scorecard/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

### `index.html`

Contains the scoreboard structure, game controls, team sections, modals, countdown screens, and round-history section.

### `style.css`

Contains the complete visual design, scoreboard layout, responsive styling, buttons, modals, countdown screen, and round cards.

### `script.js`

Controls:

* Team names
* Scores
* Fouls
* Game timer
* Quarters
* Halftime
* Countdown
* Round history
* Round winners
* Overall winner

---

## 🚀 Run Locally

Clone the repository:

```bash
git clone https://github.com/ad-cell-ai/Basket-ball-Scorecard.git
```

Move into the project:

```bash
cd Basket-ball-Scorecard
```

Then open:

```text
index.html
```

in your browser.

There are no npm packages or additional dependencies required.

---

## 🌐 Deployment

The project is deployed using **GitHub Pages**.

Live website:

https://ad-cell-ai.github.io/Basket-ball-Scorecard/

To update the deployed version, modify the project files and push the changes to GitHub.

```bash
git add .
git commit -m "Update basketball scoreboard"
git push
```

GitHub Pages will then publish the updated version.

---

## 🔮 Future Improvements

Possible future additions include:

* ⏸️ Pause and resume game
* 🔊 Basketball sound effects
* 🏀 Shot clock
* ⏱️ Custom quarter duration
* 📊 Detailed team statistics
* 👤 Player names and individual scores
* 🟨 Technical fouls
* 🏆 Tournament mode
* 💾 Save games using Local Storage
* 📜 Complete game history
* 📱 Improved mobile scoreboard
* 🌙 Dark/light theme
* 📺 Fullscreen scoreboard mode
* 🔔 Sound notification when the quarter ends
* 📈 Team statistics and performance charts

---

## 🎯 Project Goal

The goal of this project is to build a practical and interactive basketball scoreboard using only front-end web technologies.

It demonstrates concepts such as:

* DOM manipulation
* JavaScript event handling
* Timers and intervals
* State management
* Conditional logic
* Dynamic HTML rendering
* Responsive CSS
* User input handling
* Game-flow management

---

## 👨‍💻 Author

**Aditya Yadav**

Computer Science Student & Aspiring Software Engineer

---

## ⭐ Support

If you like the project, consider giving the repository a ⭐ on GitHub and sharing the live scoreboard.

### 🔗 Live Project

https://ad-cell-ai.github.io/Basket-ball-Scorecard/
