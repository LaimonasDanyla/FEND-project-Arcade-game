/* GAME DESIGN:
 Keep scores, change levels, lose lives and collect Gems. Save Princess.
 Update one level when player reaches water.
 Player loses one life if it collides with the enemy.
 Player gets 500 points for saving the pricess, which means a collision with the princess.
 Player gets 10 points for completing a level.
 Player gets 50 points for oollecting gems, which means a collision but with Player not dying,
 and the gem disappearing.
 Player is losing 10 point if collided with bug.
 The player resets back everytime the player collides with an enemy or when it reaches the water.
*/
//
//Citation: help and some ideas for the code from https://github.com/rohitcricket.
//
// game variables
var score = 0;
var lives = 5;
var level = 0;


// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < 505) {
        this.x = this.x + (this.speed * dt);
    } else {
        this.x = -100; // bugs appearinf from off canvas
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 20 + 120 * (Math.floor(Math.random() * 4));
    this.y = 350;
    this.speed = 10;
};

// updating players position:
Player.prototype.update = function(dt) {
    //updating movement by dt parameter - in order to have same runnig speed
    //for all computers:
    this.x * (dt);
    this.y * (dt);

    //Resetting player if water is reached

    if (this.y <= 0) {
        this.reset();
        level = level + 1;
        score = score + 10;
        document.getElementById('level').innerHTML = "Level: " + level;
        document.getElementById('score').innerHTML = "Score: " + score;
    }
};
//drawing payler on the screen:
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//reseting player to initial position when life is lost or goal reached.
Player.prototype.reset = function() {
    this.x = 100;
    this.y = 400;
};

//Moving player to water after colision with princess
Player.prototype.water = function() {
    this.x = 100;
    this.y = 0;
};

//Player is loosing life
Player.prototype.lives = function() {
    lives = lives - 1;
    document.getElementById('lives').innerHTML = "Remaining lives: " +
        lives;
}

//Draw the princess
var Princess = function() {
    this.sprite = 'images/char-princess-girl.png';
    //sprite helper used for easy load of images of players
    this.x = 20 + 120 * (Math.floor(Math.random() * 4));
    this.y = 100 + 50 * (Math.floor(Math.random() * 4));
};

//updating princess position
Princess.prototype.update = function(dt) {
    this.x * (dt);
    this.y * (dt);
};

// reseting princess if colided wiht enemy
Princess.prototype.reset = function() {
    this.x = 20 + 120 * (Math.floor(Math.random() * 4));
    this.y = 100 + 50 * (Math.floor(Math.random() * 4));
};

// draw princess on the screen:
Princess.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// draw Gems:
var Gems = function() {
    this.sprite = 'images/Gem Orange.png';
    this.x = 50 + 120 * (Math.floor(Math.random() * 4));
    this.y = 100 + 50 * (Math.floor(Math.random() * 4));
};

Gems.prototype.update = function(dt) {
    //updating by dt parameter to run the game on same speed on all computers
    this.x * (dt);
    this.y * (dt);
};
Gems.prototype.reset = function() {
    this.x = 50 + 120 * (Math.floor(Math.random() * 4));
    this.y = 100 + 50 * (Math.floor(Math.random() * 4));
};

//gems on screen
Gems.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player();
var princess = new Princess();
var gems = new Gems();

var Darth = new Enemy(-100, 60, 250);
var Vader = new Enemy(-100, 180, 400);
var Joker = new Enemy(-100, 240, 150);
var Specter = new Enemy(-100, 120, 300);
var allEnemies = [Darth, Vader, Joker, Specter];


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// function to move the player:

Player.prototype.handleInput = function(key) {
    if (key === 'left' && this.x > 0) {
        this.x -= 101;
    } else if (key === 'right' && this.x < 395) {
        this.x += 101;
    } else if (key === 'up' && this.y > 0) {
        this.y -= 83;
    } else if (key === 'down' && this.y < 400) {
        this.y += 83;
    }
};
