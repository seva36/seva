const lever = document.querySelector("#lever");
const status = document.querySelector("#status");
const jackpot = document.querySelector("#jackpot");
const reels = [0, 1, 2].map((index) => document.querySelector(`#reel-${index}`));
const fruits = ["🍒", "🍋", "🍊", "🍉", "🍇", "🍎", "⭐"];
let isSpinning = false;
let prize = 2450;

const getRandomFruit = () => fruits[Math.floor(Math.random() * fruits.length)];

const spin = () => {
  if (isSpinning) return;
  isSpinning = true;
  lever.classList.add("pulled");
  status.textContent = "Барабани крутяться...";
  reels.forEach((reel) => reel.classList.add("spinning"));

  reels.forEach((reel, index) => {
    window.setTimeout(() => {
      reel.classList.remove("spinning");
      reel.textContent = getRandomFruit();

      if (index === reels.length - 1) {
        const result = reels.map((item) => item.textContent);
        const won = result.every((fruit) => fruit === result[0]);
        const smallWin = result[0] === result[1] || result[1] === result[2];
        prize += won ? 777 : smallWin ? 25 : 0;
        jackpot.textContent = prize.toLocaleString("uk-UA");
        status.textContent = won ? "ДЖЕКПОТ! Три однакові!" : smallWin ? "Майже! Є пара фруктів." : "Спробуй ще раз!";
        isSpinning = false;
        window.setTimeout(() => lever.classList.remove("pulled"), 180);
      }
    }, 700 + index * 330);
  });
};

lever.addEventListener("click", spin);
