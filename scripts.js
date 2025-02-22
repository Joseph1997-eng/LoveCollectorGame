// Created by Beacon Academy

window.onload = function() {
    setTimeout(() => {
        var preloader = document.querySelector('.preloader');
        if (preloader) preloader.style.display = 'none';
    }, 300);
};

function startGame() {
    alert("Points:-\n❤️: 15 points\n💣: -15 points\n💔: -10 points\n❤️‍🩹:10 points\n\nCollect items by dragging the player to catch them. You have 5 lives\n\nGood luck!");

    var bgAudio = document.getElementById('bg_audio');
    if (bgAudio) bgAudio.play();

    var gameBgImg = document.getElementById("game_bg_img");
    if (gameBgImg) gameBgImg.style.display = "inline-block";

    var quotes = [
        "I could search my whole life<br> through and never find another you.",
        "To the world, <br>you may be one person,<br> but to me, you are the world.",
        "You are the missing piece<br> I’ve been trying to find.",
        "I wish I could<br> turn back the clock.<br> I'd find you sooner and<br> love you longer.",
        "I never knew how much love<br> my heart could hold until<br> I met you.",
        "When I saw you,<br> I fell in love,<br> and you smiled because you knew.",
        "Loving you is like breathing-<br>I can’t stop and<br> don’t want to."
    ];
    let quoteIndex = 1;
    function changeQuote(){
        var quoteElem = document.getElementById('quote');
        if (quoteElem) quoteElem.innerHTML = quotes[quoteIndex++ % quotes.length];
    }

    var canvas = document.getElementById("container");
    var ctx = canvas.getContext("2d");

    // Set canvas to full viewport size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Update canvas size on window resize
    window.addEventListener('resize', function(){
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    // Player settings
    var playerX = canvas.width / 2 - 45;
    var playerY = canvas.height - 150;
    var playerSize = 90;
    var gameWon = false;
    var life = 5;
    var barX = 15;
    var barY = 120;
    var barHeight = 50;
    var barWidth = 0;
    var barLimit = canvas.width - 30;

    // Falling objects arrays
    var hearts = [], bombs = [], brokenHearts = [], coverHearts = [];
    var particles = [];

    // --- DRAG AND DROP LOGIC ---
    var isDragging = false;
    var dragOffsetX = 0;
    var dragOffsetY = 0;

    // For mouse devices
    canvas.addEventListener("mousedown", function(e) {
        let rect = canvas.getBoundingClientRect();
        let mouseX = e.clientX - rect.left;
        let mouseY = e.clientY - rect.top;
        // Check if the click is within the player object
        if (mouseX >= playerX && mouseX <= playerX + playerSize &&
            mouseY >= playerY && mouseY <= playerY + playerSize) {
            isDragging = true;
            dragOffsetX = mouseX - playerX;
            dragOffsetY = mouseY - playerY;
        }
    });
    canvas.addEventListener("mousemove", function(e) {
        if (isDragging) {
            let rect = canvas.getBoundingClientRect();
            let mouseX = e.clientX - rect.left;
            playerX = mouseX - dragOffsetX;
            // Constrain within canvas bounds:
            playerX = Math.max(0, Math.min(canvas.width - playerSize, playerX));
        }
    });
    canvas.addEventListener("mouseup", function(e) {
        isDragging = false;
    });
    canvas.addEventListener("mouseleave", function(e) {
        isDragging = false;
    });

    // For touch devices
    canvas.addEventListener("touchstart", function(e) {
        let touch = e.touches[0];
        let rect = canvas.getBoundingClientRect();
        let touchX = touch.clientX - rect.left;
        let touchY = touch.clientY - rect.top;
        if (touchX >= playerX && touchX <= playerX + playerSize &&
            touchY >= playerY && touchY <= playerY + playerSize) {
            isDragging = true;
            dragOffsetX = touchX - playerX;
            dragOffsetY = touchY - playerY;
        }
    });
    canvas.addEventListener("touchmove", function(e) {
        if (isDragging) {
            let touch = e.touches[0];
            let rect = canvas.getBoundingClientRect();
            let touchX = touch.clientX - rect.left;
            playerX = touchX - dragOffsetX;
            playerX = Math.max(0, Math.min(canvas.width - playerSize, playerX));
        }
    });
    canvas.addEventListener("touchend", function(e) {
        isDragging = false;
    });
    // --- END DRAG AND DROP LOGIC ---

    // Function to create falling objects
    function createObject(array, speed) {
        array.push({
            x: Math.random() * (canvas.width - 50),
            y: -50,
            sy: Math.random() * 4 + speed
        });
    }

    // Update falling objects with integrated collision detection
    function updateObjects(array, imgSrc, size, barEffect, lifeEffect) {
        for (let i = 0; i < array.length; i++) {
            let obj = array[i];
            let img = new Image();
            img.src = imgSrc;
            ctx.drawImage(img, obj.x, obj.y, size, size);
            obj.y += obj.sy;
            if (obj.y > canvas.height) array.splice(i--, 1);
            // Collision detection:
            if (
                obj.x < playerX + playerSize - 10 &&
                obj.x + size > playerX + 10 &&
                obj.y < playerY + playerSize - 50 &&
                obj.y + size > playerY + 50
            ) {
                array.splice(i--, 1);
                barWidth += barEffect;
                life -= lifeEffect;
            }
        }
    }

    // Set intervals for falling objects
    var heartInter = setInterval(() => { if (Math.random() > 0.5) createObject(hearts, 2); }, 1000);
    var bombInter = setInterval(() => { if (Math.random() > 0.5) createObject(bombs, 2); }, 2000);
    var brohInter = setInterval(() => { if (Math.random() > 0.5) createObject(brokenHearts, 2); }, 1000);
    var coverhInter = setInterval(() => { if (Math.random() > 0.5) createObject(coverHearts, 2); }, 2000);

    // Fireworks functions (unchanged)
    function createFirework(x, y) {
        for (let i = 0; i < 20; i++) {
            let size = Math.random() * 20 + 10;
            let speedX = (Math.random() - 0.5) * 5;
            let speedY = (Math.random() - 0.5) * 5;
            particles.push({ x, y, size, speedX, speedY });
        }
    }
    function drawFireworks() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particles.length; i++) {
            let p = particles[i];
            ctx.font = `${p.size}px Arial`;
            ctx.fillText('❤️', p.x, p.y);
            p.x += p.speedX;
            p.y += p.speedY;
            p.size *= 0.97;
            p.speedY += 0.05;
            if (p.size < 5) particles.splice(i--, 1);
        }
        requestAnimationFrame(drawFireworks);
    }

    function gameLoop() {
        if (gameWon) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw the player
        let playerImg = new Image();
        playerImg.src = "https://i.ibb.co/V065F2nh/1738426408437.png";
        ctx.drawImage(playerImg, playerX, playerY, playerSize, playerSize);

        // Update falling objects with collision detection
        updateObjects(hearts, "https://i.ibb.co/mVNmMp4F/1738428158997.png", 50, 10, 0);
        updateObjects(bombs, "https://i.ibb.co/5xwLsZh5/595582.png", 50, -15, 1);
        updateObjects(brokenHearts, "https://i.ibb.co/4g48DSKb/1738488914007.png", 50, -10, 1);
        updateObjects(coverHearts, "https://i.ibb.co/Dh00H9b/Broken-Heart-20-683x1024.png", 65, 5, 0);

        ctx.font = "20px Arial";
        ctx.fillText("Life: " + '❤️'.repeat(life), 10, 40);

        // Draw the collection bar
        ctx.beginPath();
        ctx.rect(barX, barY, barLimit, barHeight);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.rect(barX, barY, Math.max(barWidth, 0), barHeight);
        ctx.fillStyle = "#5959ff";
        ctx.fill();
        ctx.stroke();
        ctx.closePath();

        if (life <= 0) {
            hearts = bombs = brokenHearts = coverHearts = [];
            clearInterval(heartInter);
            clearInterval(bombInter);
            clearInterval(coverhInter);
            clearInterval(brohInter);
            document.getElementById('sec2').style.display = 'none';
            document.getElementById('section1').style.display = 'none';
            document.getElementById('sec3').style.display = 'block';
            document.body.style.backgroundColor = '#000';
        }
        if (barWidth >= barLimit) {
            gameWon = true;
            hearts = bombs = brokenHearts = coverHearts = [];
            clearInterval(heartInter);
            clearInterval(bombInter);
            clearInterval(coverhInter);
            clearInterval(brohInter);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            var quoteElem = document.getElementById('quote');
            if (quoteElem) quoteElem.style.display = 'inline-block';
            var gameBgImg = document.getElementById('game_bg_img');
            if (gameBgImg) gameBgImg.remove();
            var afterWinImg = document.getElementById('after_win_img');
            if (afterWinImg) afterWinImg.style.display = 'inline-block';
            document.body.style.backgroundColor = 'black';
            var thankText = document.getElementById('thankText');
            if (thankText) thankText.style.display = 'inline-block';

            setTimeout(function () {
                var h1 = document.querySelector('h1');
                if (h1) h1.classList.add('wiggle', 'center-h1');
                var confettiCanvas = document.getElementById('confetti-canvas');
                var jsConfetti = new JSConfetti({ canvas: confettiCanvas });
                function triggerConfetti() {
                    jsConfetti.addConfetti({ emojis: ['🌸'] });
                    jsConfetti.addConfetti({ emojis: ['💗'], emojiSize: 100, confettiNumber: 10 });
                }
                triggerConfetti();
                setInterval(triggerConfetti, 4000);
            }, 4000);

            setInterval(changeQuote, 5000);
            setInterval(() => {
                createFirework(Math.random() * canvas.width, Math.random() * (canvas.height / 2));
            }, 1000);
            drawFireworks();
            return;
        }
        requestAnimationFrame(gameLoop);
    }
    gameLoop();
}
