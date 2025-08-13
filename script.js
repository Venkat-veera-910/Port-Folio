const toggle=document.getElementById('bar')
const menu=document.getElementById('s-bar')
toggle.addEventListener('click',()=>{
    toggle.classList.toggle('active');
    menu.classList.toggle('show');
})

setTimeout(() => {
  document.getElementById('loader').style.display = 'none';
}, 2000);

// =====================================================
    const texts = [
      "Fullstack Developer...",
      "Python Developer...",
      // "Data Analyst...",
      "Software Developer..."
    ];
    const typewriter = document.getElementById("typewriter");
    let index = 0;

    function showNextText() {
      const text = texts[index];
      typewriter.textContent = "";
      typewriter.classList.remove("typing");

      // Set custom properties for animation steps
      typewriter.style.setProperty('--width', text.length + 'ch');
      typewriter.style.setProperty('--steps', text.length);

      setTimeout(() => {
        typewriter.textContent = text;
        typewriter.classList.add("typing");
      }, 100);

      index = (index + 1) % texts.length;
    }

    showNextText();
    setInterval(showNextText, 3500); // 2s typing + 1.5s pause


//=========================================================
//=========================================================

  
// Recursive Bouncing Balls - Fast Mode
const canvas = document.getElementById("loaderCanvas");
const ctx = canvas.getContext("2d");
let W = window.innerWidth;
let H = window.innerHeight;
canvas.width = W;
canvas.height = H;

class Ball {
  constructor(x, y, radius, color, vx = 0, vy = 0) {
    this.x = x; 
    this.y = y; 
    this.radius = radius; 
    this.color = color;
    this.vx = vx; 
    this.vy = vy;
    this.bounceCount = 0; 
    this.splitReady = false;
  }

  update() {
    // Increased gravity for faster fall
    this.vy += 1.2;

    // Faster movement
    this.x += this.vx * 1.5;
    this.y += this.vy * 1;

    // Bounce on floor
    if (this.y + this.radius > H - 120) {
      this.y = H - 120 - this.radius;
      this.vy *= -0.9; // little loss for realism
      this.bounceCount++;
      if (this.bounceCount >= 1) this.splitReady = true;
    }

    // Bounce on walls
    if (this.x - this.radius < 0 || this.x + this.radius > W) {
      this.vx *= -1;
    }
  }

  drawShadow(ctx, floorY) {
    const maxShadowRadius = this.radius * 1.5;
    const heightRatio = (floorY - this.y) / (floorY - this.radius);
    const shadowRadiusX = maxShadowRadius * (1 - heightRatio * 0.7);
    const shadowRadiusY = shadowRadiusX * 0.4;
    const shadowAlpha = 0.4 * (1 - heightRatio);
    ctx.save();
    ctx.fillStyle = `rgba(0,0,0,${shadowAlpha.toFixed(2)})`;
    ctx.beginPath();
    ctx.ellipse(this.x, floorY + 5, shadowRadiusX, shadowRadiusY, 0, 0, Math.PI * 2);
    ctx.fill(); 
    ctx.restore();
  }

  draw(ctx, floorY) {
    this.drawShadow(ctx, floorY);
    ctx.save();
    ctx.beginPath();
    const grad = ctx.createRadialGradient(
      this.x - this.radius / 3, 
      this.y - this.radius / 3, 
      this.radius / 5, 
      this.x, 
      this.y, 
      this.radius
    );
    grad.addColorStop(0, 'rgba(255,255,255,0.9)');
    grad.addColorStop(1, this.color);
    ctx.fillStyle = grad;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  }

  shouldSplit() {
    return this.splitReady;
  }
}

const balls = [];
const colors = ["#000000", "#222020ff", "#949494ff", "#4d4d4d", "#666666", "#808080", "#999999"];

// First ball - much faster launch
balls.push(new Ball(W / 2, H / 2, 22, colors[0], 0, -18));

function animate() {
  ctx.clearRect(0, 0, W, H);
  const floorY = H - 120;
  const newBalls = [];

  for (let ball of balls) {
    ball.update();
    ball.draw(ctx, floorY);

    if (ball.shouldSplit() && balls.length + newBalls.length < 9) {
      ball.splitReady = false;
      for (let i = 0; i < 2; i++) {
        const radius = Math.random() * 10 + 8;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const vx = (Math.random() - 0.5) * 14; // faster horizontal
        const vy = -Math.random() * 14 - 8;    // faster vertical
        newBalls.push(new Ball(ball.x, ball.y, radius, color, vx, vy));
      }
    }
  }

  balls.push(...newBalls);
  requestAnimationFrame(animate);
}

animate();


    // Loader & Wipe transition
    setTimeout(() => {
      canvas.style.display = 'none';
      document.querySelector('.loading-text').style.display = 'none';
      document.querySelector('.wiper').style.display = 'block';
      setTimeout(() => {
        document.querySelector('.wiper').style.display = 'none';
        document.querySelector('.content').style.display = 'flex';
        document.body.style.overflow = 'auto';
      }, 2000);
    }, 4000);

    // Cursor Effect
    const dot = document.querySelector('.cursor-dot');
    const ring = document.querySelector('.cursor-ring');
    let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;
    });

    function animateRing() {
      ringX += (mouseX - ringX) / 8;
      ringY += (mouseY - ringY) / 8;
      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;
      requestAnimationFrame(animateRing);
    }
    animateRing();

  

//=========================================================
//=========================================================


//=====================box-5-bd-dot-====================================
    const box = document.querySelector('.box5');
    const totalFireflies = 20;

    for (let i = 0; i < totalFireflies; i++) {
      const fly = document.createElement("div");
      fly.classList.add("firefly");

      // Initial random position
      fly.style.top = Math.random() * 100 + "vh";
      fly.style.left = Math.random() * 100 + "vw";

      // Random blink duration and delay
      const blinkTime = 1.5 + Math.random() * 1.5;
      const blinkDelay = Math.random() * 2;
      fly.style.animationDuration = blinkTime + "s";
      fly.style.animationDelay = blinkDelay + "s";

      // Movement logic
      function moveFirefly() {
        const top = Math.random() * 100;
        const left = Math.random() * 100;
        fly.style.transition = `top 8s ease-in-out, left 8s ease-in-out`;
        fly.style.top = top + "vh";
        fly.style.left = left + "vw";
      }

      setInterval(moveFirefly, 8000);
      moveFirefly();

      box.appendChild(fly);
    }

//=========================================================
//=========================================================
    const cards = document.querySelectorAll('.proj_box');
    let current = 0;

    function showCard(index) {
      cards.forEach((porj_box, i) => {
        proj_box.classList.remove('active');
        proj_box.style.zIndex = i === index ? 10 : 1;
        proj_box.style.transform = i === index ? 'scale(1)' : 'scale(1.1)';
      });
      proj_box[index].classList.add('active');
    }

    function nextCard() {
      current = (current + 1) % proj_box.length;
      showCard(current);
    }

    function prevCard() {
      current = (current - 1 +sproj_box.length) % proj_box.length;
      showCard(current);
    }
//=========================================================




































const arrowBtns = document.querySelectorAll(".arrow-btn-4");
const cardBtns = document.querySelectorAll(".card-4");
let currentCard = 2;
let dir = 1;
moveCards();

arrowBtns.forEach((btn, i) => {
  btn.onpointerenter = (e) =>
    gsap.to(btn, {
      ease: "expo",
      "box-shadow": "0 3px 4px #00000050",
    });

  btn.onpointerleave = (e) =>
    gsap.to(btn, {
      ease: "expo",
      "box-shadow": "0 6px 8px #00000030",
    });

  btn.onclick = (e) => {
    dir = i == 0 ? 1 : -1;
    if (i == 0) {
      currentCard--;
      currentCard = Math.max(0, currentCard);
    } else {
      currentCard++;
      currentCard = Math.min(4, currentCard);
    }
    moveCards(0.75);
  };
});

cardBtns.forEach((btn, i) => {
  btn.onpointerenter = (e) =>
    gsap.to(btn, {
      ease: "power3",
      overwrite: "auto",
      "box-shadow": () =>
        i == currentCard ? "0 6px 11px #00000030" : "0 6px 11px #00000030",
    });

  btn.onpointerleave = (e) =>
    gsap.to(btn, {
      ease: "power3",
      overwrite: "auto",
      "box-shadow": () =>
        i == currentCard ? "0 6px 11px #00000030" : "0 0px 0px #00000030",
    });

  btn.onclick = (e) => {
    dir = i < currentCard ? 1 : -1;
    currentCard = i;
    moveCards(0.75);
  };
});

function moveCards(dur = 0) {
  gsap
    .timeline({
      defaults: {
        duration: dur,
        ease: "power3",
        stagger: { each: -0.03 * dir },
      },
    })
    .to(
      ".card-4",
      {
        x: -325 * currentCard,
        y: (i) => (i == currentCard ? 0 : 15),
        height: (i) => (i == currentCard ? 260 : 250),
        width: (i) => (i == currentCard ? 350 : 250),
        ease: "elastic.out(0.4)",
      },
      0
    )
    .to(
      ".card-4",
      {
        cursor: (i) => (i == currentCard ? "default" : "pointer"),
        "box-shadow": (i) =>
          i == currentCard ? "0 6px 11px #00000030" : "0 0px 0px #00000030",
        border: (i) => (i == currentCard ? "2px solid #26a" : "0px solid #fff"),
        background: (i) =>
          i == currentCard
            ? "radial-gradient(100% 100% at top, #fff 0%, #fff 99%)"
            : "radial-gradient(100% 100% at top, #fff 20%, #eee 175%)",
        ease: "expo",
      },
      0
    )
    .to(
      ".icon-4 svg",
      {
        attr: {
          stroke: (i) => (i == currentCard ? "transparent" : "#36a"),
          fill: (i) => (i == currentCard ? "#36a" : "transparent"),
        },
      },
      0
    )
    .to(
      ".arrow-btn-prev-4",
      {
        autoAlpha: currentCard == 0 ? 0 : 1,
      },
      0
    )
    .to(
      ".arrow-btn-next-4",
      {
        autoAlpha: currentCard == 4 ? 0 : 1,
      },
      0
    )
    .to(
      ".card-4 h4",
      {
        y: (i) => (i == currentCard ? 0 : 8),
        opacity: (i) => (i == currentCard ? 1 : 0),
      },
      0
    );
}







