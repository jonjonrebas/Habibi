const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const habibiImage = new Image();
habibiImage.src = 'habibi.png';
let stones = [];
let palmTrees = [];


let obstaclesPassed = 0;

let gameInterval;
let moveDirection = null;

function startGame() {
    gameInterval = setInterval(updateGame, 6);
}

function stopGame() {
    clearInterval(gameInterval);
}

function startMoving(direction) {
    moveDirection = direction;
}

function stopMoving() {
    moveDirection = null;
}

const car = {
    x: 100,
    y: canvas.height / 2 - 15,
    speed: 0,
};

const obstacles = [];

function updateGame() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const fontSize = canvas.width > 800 ? 20 : 14;
ctx.font = fontSize + 'px Arial';

// Draw road (desert background)
ctx.fillStyle = '#FDEAA8'; // More yellow desert color
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Draw and move stones
stones.forEach((stone, index) => {
    ctx.fillStyle = '#696969'; // Stone color
    ctx.beginPath();
    ctx.arc(stone.x, stone.y, 20, 0, Math.PI, true); // Top of the stone
    ctx.quadraticCurveTo(stone.x - 10, stone.y + 10, stone.x - 20, stone.y); // Left side
    ctx.quadraticCurveTo(stone.x, stone.y + 20, stone.x + 20, stone.y); // Bottom and right side
    ctx.closePath();
    ctx.fill();
    stone.x -= 2; // Move stone to the left
});

// Draw and move palm trees
palmTrees.forEach((palmTree, index) => {
    // Trunk
    ctx.fillStyle = '#8B4513'; // Trunk color
    ctx.fillRect(palmTree.x, palmTree.y, 10, 60);

    // Leaves
    ctx.fillStyle = '#228B22'; // Leaf color
    [30, 40, 50].forEach((length) => {
        [-1, 1].forEach((direction) => {
            ctx.beginPath();
            ctx.moveTo(palmTree.x + 5, palmTree.y);
            ctx.lineTo(palmTree.x + 5 + length * direction, palmTree.y - 40);
            ctx.lineTo(palmTree.x + 5 + (length - 10) * direction, palmTree.y - 40);
            ctx.closePath();
            ctx.fill();
        });
    });
    palmTree.x -= 2; // Move palm tree to the left
});

// Add new stones and palm trees if needed
if (Math.random() < 0.02) {
    stones.push({ x: canvas.width, y: canvas.height - 20 });
}
if (Math.random() < 0.005) {
    palmTrees.push({ x: canvas.width, y: canvas.height - 80 });
}

// Remove off-screen stones and palm trees
stones = stones.filter(stone => stone.x > -20);
palmTrees = palmTrees.filter(palmTree => palmTree.x > -10);


// Draw the streaming text
const musicName = "Summer_Early_Session_(7am)_Chris_Mooser.mp3";
ctx.fillStyle = 'black';
ctx.font = '16px Arial';
ctx.textAlign = 'right'; // Align text to the right



// Après : dessinez l'image habibi.png
ctx.drawImage(habibiImage, car.x, car.y, 90, 50); // 90x50 est la taille de l'image. Ajustez selon vos besoins.


    if (moveDirection === 'up') car.y -= 4;
    if (moveDirection === 'down') car.y += 4;

    // Make sure the donkey stays within bounds
    if (car.y < 0) car.y = 0;
    if (car.y > canvas.height - 30) car.y = canvas.height - 30;

   // Draw obstacles
   ctx.fillStyle = 'red';
   obstacles.forEach((obstacle, index) => {
       ctx.fillRect(obstacle.x, obstacle.y, 100, 20);
       obstacle.x -= 2; // Move obstacles to the left

       // Check collision
       if (
           car.x < obstacle.x + 100 &&
           car.x + 50 > obstacle.x &&
           car.y < obstacle.y + 20 &&
           car.y + 30 > obstacle.y
       ) {
           stopGame();
           alert('Game Over!');
       }

       // Remove off-screen obstacles
       if (obstacle.x < -100) {
           obstaclesPassed++; // Increment the counter
           obstacles.splice(index, 1);
       }
   });

 // Draw the number of obstacles passed
ctx.fillStyle = 'black';
ctx.font = '20px Arial';
ctx.textAlign = 'left'; // Align text to the left
document.getElementById('score').textContent = obstaclesPassed;




   // Create new obstacle
   if (Math.random() < 0.015) {
       obstacles.push({ x: canvas.width, y: Math.random() * canvas.height });
   }
}
function stopGame() {
    clearInterval(gameInterval);
    alert('Bravo, tu as réussi à dépasser ' + obstaclesPassed + " obstacles !");
}
function startGame() {
    gameInterval = setInterval(updateGame, 7);
    document.getElementById('gameMusic').play(); // Start playing music
}

function stopGame() {
    clearInterval(gameInterval);
    document.getElementById('gameMusic').pause(); // Stop playing music
    document.getElementById('gameMusic').currentTime = 0; // Reset to the beginning
    alert('Bravo, tu as réussi à dépasser ' + obstaclesPassed + " obstacles !");
}
