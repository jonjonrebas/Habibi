const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let gameInterval;
let moveDirection = null;

function startGame() {
    gameInterval = setInterval(updateGame, 7);
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

    // Draw road
    ctx.fillStyle = 'gray';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw donkey (as the car)
    ctx.fillStyle = 'white';
    ctx.fillRect(car.x, car.y, 60, 30); // Body
    ctx.fillRect(car.x + 40, car.y - 20, 20, 20); // Head
    ctx.fillRect(car.x + 60, car.y - 15, 10, 5); // Ear
    ctx.fillRect(car.x, car.y + 30, 10, 10); // Leg
    ctx.fillRect(car.x + 50, car.y + 30, 10, 10); // Leg
    ctx.fillStyle = 'black';
    ctx.fillRect(car.x + 50, car.y - 10, 5, 5); // Eye

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
            obstacles.splice(index, 1);
        }
    });

    // Create new obstacle
    if (Math.random() < 0.01) {
        obstacles.push({ x: canvas.width, y: Math.random() * canvas.height });
    }
}
