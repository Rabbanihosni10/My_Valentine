let currentSection = 'intro';
const flowerData = [
    { label: "Your Smile", message: "Your smile lights up my darkest days. It's the sunshine that breaks through every cloud, the warmth that melts every worry away. One smile from you, and the whole world feels right.", image: './img/gundi1.jpeg' },
    { label: "Your Kindness", message: "Your heart is the most beautiful thing about you. The way you care for others, the compassion you show, the love you give so freely - it inspires me to be better every single day.", image: './img/you1.jpeg' },
    { label: "Your Strength", message: "You face every challenge with grace and courage. Your strength doesn't come from never falling, but from rising every single time. You're the strongest person I know.", image: './img/hali1.jpeg' },
    { label: "Your Dreams", message: "I love the way your eyes light up when you talk about your dreams. I promise to support every dream, celebrate every success, and hold you through every setback.", image: './img/you2.jpeg' },
    { label: "Your Laughter", message: "Your laughter is my favorite melody. It's contagious, genuine, and absolutely beautiful. I promise to spend my life finding reasons to make you laugh.", image: './img/you3.jpeg' },
    { label: "The Way You Love", message: "You love with your whole heart, holding nothing back. You've taught me what it means to truly love and be loved. You are my greatest teacher and my greatest gift.", image: './img/us.jpeg' },
    { label: "Our Future", message: "I can't wait to build our future together. Every adventure, every quiet moment, every challenge we'll face hand in hand. With you, I'm home.", image: './img/park1.jpeg' },
    { label: "This Moment", message: "Right now, in this moment, I choose you. And I'll choose you every moment of every day, for the rest of my life. You are my always.", image: './img/special.jpeg' }
];
let openedFlowers = 0;

function createFloatingHearts() {
    const container = document.getElementById('floatingHearts');
    for (let i = 0; i < 15; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = '💕';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDelay = Math.random() * 5 + 's';
        heart.style.fontSize = (Math.random() * 1.5 + 1) + 'rem';
        container.appendChild(heart);
    }
}

function startJourney() {
    const intro = document.getElementById('intro-screen');
    intro.classList.add('hidden');
    setTimeout(() => {
        document.getElementById('timeline-section').classList.add('active');
        currentSection = 'timeline';
        observeMemories();
    }, 1000);
}

function observeMemories() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.memory-card').forEach(card => {
        observer.observe(card);
        card.addEventListener('click', () => showFeeling(card));
    });

    const transitionMsg = document.querySelector('.transition-message');
    if (transitionMsg) {
        const transitionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        transitionToGarden();
                    }, 3000);
                }
            });
        }, { threshold: 0.5 });
        transitionObserver.observe(transitionMsg);
    }
}

function showFeeling(card) {
    const feeling = card.getAttribute('data-feeling');
    document.getElementById('feelingText').textContent = feeling;
    document.getElementById('feelingPopup').classList.add('show');
}

function closePopup() {
    document.getElementById('feelingPopup').classList.remove('show');
}

function transitionToGarden() {
    document.getElementById('timeline-section').classList.remove('active');
    setTimeout(() => {
        document.getElementById('garden-section').classList.add('active');
        currentSection = 'garden';
        createStars();
        createFlowers();
    }, 500);
}

function createStars() {
    const container = document.getElementById('starsContainer');
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.width = Math.random() * 3 + 'px';
        star.style.height = star.style.width;
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 80 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        container.appendChild(star);
    }
}

function createFlowers() {
    const container = document.getElementById('flowersContainer');
    flowerData.forEach((flower, index) => {
        const flowerDiv = document.createElement('div');
        flowerDiv.className = 'flower';
        flowerDiv.innerHTML = `
            <div class="flower-image-container">
                <img src="${flower.image}" alt="${flower.label}" class="flower-img" onerror="this.src='./img/gundi1.jpeg'">
            </div>
            <div class="flower-bloom"></div>
            <div class="flower-stem"></div>
            <div class="flower-label">${flower.label}</div>
        `;
        flowerDiv.addEventListener('click', () => openFlower(flowerDiv, flower, index));
        container.appendChild(flowerDiv);
    });
}

function openFlower(flowerDiv, flower, index) {
    if (flowerDiv.classList.contains('opened')) return;
    
    flowerDiv.classList.add('opened');
    playChime();
    
    document.getElementById('messageContent').textContent = flower.message;
    document.getElementById('flowerMessage').classList.add('show');
    
    openedFlowers++;
    

    
    if (openedFlowers === flowerData.length) {
        setTimeout(() => {
            showGoldenFlower();
        }, 1000);
    }
}

function closeFlowerMessage() {
    document.getElementById('flowerMessage').classList.remove('show');
}

function showGoldenFlower() {
    const goldenFlower = document.getElementById('goldenFlower');
    goldenFlower.style.display = 'block';
    setTimeout(() => {
        goldenFlower.classList.add('rise');
    }, 100);
    
    goldenFlower.addEventListener('click', () => {
        transitionToGame();
    });
}

function playChime() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
}

function transitionToGame() {
    document.getElementById('garden-section').classList.remove('active');
    setTimeout(() => {
        document.getElementById('game-section').classList.add('active');
        currentSection = 'game';
        initGame();
    }, 500);
}

let game = {
    canvas: null,
    ctx: null,
    player: { x: 50, y: 300, width: 40, height: 40, velocityY: 0, jumping: false },
    obstacles: [],
    goal: { x: 700, y: 300, width: 50, height: 50 },
    gameSpeed: 2,
    gravity: 0.6,
    jumpPower: -12,
    score: 0,
    gameWon: false
};

function initGame() {
    game.canvas = document.getElementById('gameCanvas');
    game.ctx = game.canvas.getContext('2d');
    
    game.obstacles = [
        { x: 250, y: 340, width: 60, height: 60, type: 'distance', label: 'Distance' },
        { x: 400, y: 320, width: 80, height: 80, type: 'misunderstanding', label: 'Doubt' },
        { x: 550, y: 340, width: 60, height: 60, type: 'busy', label: 'Time' }
    ];
    
    gameLoop();
}

function gameLoop() {
    if (game.gameWon) return;
    
    game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
    
    const gradient = game.ctx.createLinearGradient(0, 0, 0, game.canvas.height);
    gradient.addColorStop(0, '#87CEEB');
    gradient.addColorStop(1, '#E0F6FF');
    game.ctx.fillStyle = gradient;
    game.ctx.fillRect(0, 0, game.canvas.width, game.canvas.height);
    
    game.ctx.fillStyle = '#90EE90';
    game.ctx.fillRect(0, 360, game.canvas.width, 40);
    
    if (game.player.jumping) {
        game.player.velocityY += game.gravity;
        game.player.y += game.player.velocityY;
        
        if (game.player.y >= 300) {
            game.player.y = 300;
            game.player.jumping = false;
            game.player.velocityY = 0;
        }
    }
    
    game.ctx.fillStyle = '#FF69B4';
    game.ctx.font = '40px Arial';
    game.ctx.fillText('💖', game.player.x, game.player.y + 35);
    
    game.obstacles.forEach(obstacle => {
        game.ctx.fillStyle = 'rgba(100, 100, 100, 0.5)';
        game.ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
        game.ctx.fillStyle = '#333';
        game.ctx.font = '14px Arial';
        game.ctx.fillText(obstacle.label, obstacle.x + 5, obstacle.y - 5);
        
        // Check collision with obstacles
        if (checkCollision(game.player, obstacle)) {
            // Player hit obstacle - could add damage/penalty here
        }
    });
    
    game.ctx.fillStyle = '#FFD700';
    game.ctx.font = '50px Arial';
    game.ctx.fillText('👰', game.goal.x, game.goal.y + 45);
    
    if (checkCollision(game.player, game.goal)) {
        winGame();
        return;
    }
    
    requestAnimationFrame(gameLoop);
}

function checkCollision(rect1, rect2) {
    const isColliding = rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
    
    if (isColliding && rect2.type) {
        handleObstacleCollision(rect2.type);
    }
    
    return isColliding;
}

function handleObstacleCollision(obstacleType) {
    const messages = {
        'distance': 'Distance is just a number when hearts are connected! 💕',
        'misunderstanding': 'We understand each other, no doubt about it! 💪',
        'busy': 'Our love is worth every moment! ⏰'
    };
    
    console.log('Collision with:', obstacleType, '-', messages[obstacleType]);
}

function winGame() {
    game.gameWon = true;
    document.getElementById('gameVictory').classList.add('show');
    
    setTimeout(() => {
        transitionToFinal();
    }, 5000);
}

function transitionToFinal() {
    document.getElementById('gameVictory').classList.remove('show');
    document.getElementById('game-section').classList.remove('active');
    setTimeout(() => {
        document.getElementById('love-declaration-section').classList.add('active');
        currentSection = 'declaration';
    }, 500);
}

function proceedToFinal() {
    document.getElementById('love-declaration-section').classList.remove('active');
    setTimeout(() => {
        document.getElementById('final-section').classList.add('active');
        currentSection = 'final';
    }, 500);
}

document.addEventListener('DOMContentLoaded', () => {
    const finalQuestion = document.getElementById('finalQuestion');
    if (finalQuestion) {
        finalQuestion.addEventListener('click', () => {
            const question = document.getElementById('finalQuestion');
            question.style.transform = 'scale(0)';
            
            createConfetti();
            
            setTimeout(() => {
                document.getElementById('finalName').style.display = 'block';
            }, 1000);
        });
    }
});

function createConfetti() {
    const container = document.getElementById('confettiContainer');
    const colors = ['#FFD700', '#FADADD', '#E6E6FA', '#FF69B4', '#FFA500'];
    
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 2 + 's';
        confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
        container.appendChild(confetti);
    }
    
    setTimeout(() => {
        container.innerHTML = '';
    }, 5000);
}

document.addEventListener('keydown', (e) => {
    if (currentSection === 'intro' && e.key === 'Enter') {
        startJourney();
    }
    
    if (currentSection === 'game') {
        if (e.key === 'ArrowRight') {
            game.player.x = Math.min(game.player.x + 10, game.canvas.width - game.player.width);
        }
        if (e.key === 'ArrowLeft') {
            game.player.x = Math.max(game.player.x - 10, 0);
        }
        if (e.key === ' ' && !game.player.jumping) {
            game.player.jumping = true;
            game.player.velocityY = game.jumpPower;
            e.preventDefault(); // Prevent page scroll
        }
    }
});

window.addEventListener('load', () => {
    createFloatingHearts();
});