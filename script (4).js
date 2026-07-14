/* ==========================================
   OURVERSE: CENTRALIZED SYSTEM SCRIPT
========================================== */

// ==========================================
// 1. CONFIG & SYSTEM STATIC DATA
// ==========================================
const CONFIG = {
    unlockDate: new Date("2026-07-15T00:00:00").getTime(),
    closeDate: new Date("2026-07-16T00:00:00").getTime(),
    adminPassword: "forever14",
    musicSrc: "https://ia600804.us.archive.org/23/items/love_20260211/Love.mp3",
    relationshipStart: new Date("2024-07-15T00:00:00").getTime()
};

const HEARTS = ["❤️", "💖", "💕", "💗", "💘"];
const FLOWERS = ["🌸", "🌹", "🌺", "🌷"];
const EMOJIS = ["💌", "💞", "✨", "🦋", "🤍"];

const loveQuotes = [
    "Every second brings me closer to you ❤️",
    "You are my favorite place.",
    "Our story is my happiest chapter.",
    "Forever begins with us.",
    "You are the calm in every storm. ❤️",
    "My heart still chooses you, every single day.",
    "With you, even forever feels too short.",
    "You turned ordinary moments into magic.",
    "No matter where life takes us, my home is with you.",
    "Love never counts the days but today I do."
];

const dashboardQuotes = [
    "You are my favorite place ❤️",
    "Every memory with you is my treasure.",
    "Our story keeps getting better.",
    "You are my safest home.",
    "Forever starts every day with you.",
    "I'd still choose you."
];

const galleryPhotos = [
{
    src: "https://i.ibb.co/d0X0sXXL/IMG-20260704-164544.png",
    title: "Always Us ❤️",
    caption: "The smile that changed everything."
},
{
    src: "https://i.ibb.co/XxyVgDHx/file-00000000d4147208944d2baa174abd6a.png",
    title: "Our Day 🌸",
    caption: "A memory I'll never forget."
},
{
    src: "https://i.ibb.co/mV17SQhd/IMG-20260630-131910-166.jpg",
    title: "My Beautiful Dream 💕",
    caption: "Every picture feels like home."
},
{
    src: "https://i.ibb.co/MD0YZfht/file-0000000072c87209b4e8dbfbaba40c6a.png",
    title: "Forever ❤️",
    caption: "This is only the beginning."
}
];

const letters = [
    {
        title: "Open Me First ❤️",
        text: `Hi Chand,\n\nIf you're reading this, then we've made it to another chapter of our story... and I still can't believe how lucky I am that it's with you.\n\nIt honestly feels like yesterday when everything started, but somehow we've already collected so many little memories together—our random conversations, late-night calls, silly arguments that never lasted, your laugh that somehow fixes my mood, and those quiet moments where we didn't even need words.\n\nThank you for loving me on my good days and staying with me on the difficult ones too. Thank you for your patience, your kindness, your smile, and for making my life feel warmer just by being in it.\n\nYou don't even realize how many times you've made an ordinary day feel special. Every message from you, every "take care," every little moment we've shared has become a memory I'll always keep close to my heart.\n\nI know we're not perfect, and maybe that's what makes us real. We've grown together, learned together, and chosen each other again and again. That's something I'll never take for granted.\n\nI hope this is only the beginning. I want more anniversaries, more adventures, more laughs until our stomachs hurt, more hugs after hard days, and more memories that we'll look back on years from now with the same smile.\n\nNo matter where life takes us, I want you to remember one thing—you are one of the most beautiful parts of my life, and meeting you will always be one of the best things that ever happened to me.\n\nHappy Anniversary, Chand. ❤️\n\nI love you more than words could ever fully explain.\n\nForever yours.`
    },
    {
        title: "When You Smile 🌸",
        text: `Your smile is my favorite sunrise.\n\nNo matter how difficult life becomes, one smile from you somehow makes everything feel lighter. It's the kind of smile that calms my heart, makes my worries disappear, and reminds me that everything will be okay.\n\nI don't know if you realize it, but your smile has this quiet magic. It can brighten my darkest days, make ordinary moments unforgettable, and fill my heart with a happiness I can't put into words.\n\nSo promise me you'll never stop smiling—not because the world asks you to, but because your smile is beautiful, genuine, and one of my favorite things about you.\n\nWhenever you smile, it feels like the whole world becomes a little brighter... and my heart finds its way back home.\n\nNever stop smiling, Chand, because that's where my happiness lives. ❤️`
    },
    {
        title: "Thank You 💖",
        text: `Thank you...\n\nFor believing in me, even during the times when I couldn't believe in myself.\n\nFor staying by my side through the good days, the bad days, and every ordinary moment in between.\n\nFor loving me even when I wasn't perfect, when I made mistakes, overthought things, or wasn't the easiest person to understand.\n\nThank you for your patience, your kindness, your endless support, and for making me feel accepted just the way I am.\n\nYou walked into my life so quietly, yet somehow changed everything. You gave me reasons to smile more, hope more, and dream a little bigger.\n\nThere are so many things you've done for me that I could never fit into a single letter. Some feelings are simply too deep for words.\n\nIf I had to choose all over again, I'd still choose you—every single time, without a second thought.\n\nThank you for being you.\n\nYou changed my life in ways words will never be able to describe. ❤️`
    },
    {
        title: "Forever ❤️",
        text: `If I had to choose again...\n\nI would still choose you.\n\nNot just today, not just tomorrow, but every single time life gave me the chance.\n\nIn every lifetime.\n\nIn every universe.\n\nIn every version of our story, I'd find my way back to you, fall in love with you all over again, and hold your hand without a second thought.\n\nYou're my favorite person, my safest place, my biggest blessing, and the home my heart never knew it was searching for.\n\nThank you for being the most beautiful part of my life and for filling my days with love, laughter, and memories I'll cherish forever.\n\nNo matter what the future brings, one thing will never change—I will always choose you.\n\nForever and always.\n\nHappy Anniversary, Chand. ❤️`
    }
];

// ==========================================
// 2. STATE APP VARIABLES
// ==========================================
let overrideAccess = false;
let currentState = "";
let countdownTimer = null;
let pressTimer = null;
let lastTap = 0;
let currentPhoto = 0;
let stars = [];
let cardTiltStartX = 0;
let liveCounterTimer = null;
let starAnimationId = null;

// ==========================================
// 3. DOM ELEMENT CACHE LAZY BINDING
// ==========================================
let DOM = {};

function initDOMReferences() {
    DOM = {
        body: document.body,
        card: document.getElementById("mainCard"),
        status: document.getElementById("statusText"),
        message: document.getElementById("mainMessage"),
        countdown: document.getElementById("countdown"),
        days: document.getElementById("days"),
        hours: document.getElementById("hours"),
        minutes: document.getElementById("minutes"),
        seconds: document.getElementById("seconds"),
        enterBtn: document.getElementById("enterBtn"),
        passwordBox: document.getElementById("passwordBox"),
        pwInput: document.getElementById("pwInput"),
        pwBtn: document.getElementById("pwBtn"),
        pwError: document.getElementById("pwError"),
        musicBtn: document.getElementById("musicBtn"),
        music: document.getElementById("bgMusic"),
        particleLayer: document.getElementById("particleLayer"),
        footer: document.getElementById("footerNote"),
        resetBtn: document.getElementById("resetViewBtn"),
        
        sections: {
            hub: document.getElementById("loveHub"),
            timeline: document.getElementById("timelineSection"),
            gallery: document.getElementById("gallerySection"),
            letters: document.getElementById("lettersSection"),
            games: document.getElementById("gamesSection"),
            starmap: document.getElementById("starMapSection"),
            surprise: document.getElementById("surpriseSection")
        },

        greeting: document.getElementById("greeting"),
        quoteBox: document.getElementById("dailyQuote"),
        
        liveDays: document.getElementById("liveDays"),
        liveHours: document.getElementById("liveHours"),
        liveMinutes: document.getElementById("liveMinutes"),
        liveSeconds: document.getElementById("liveSeconds"),

        yearsTogetherTotal: document.getElementById("yearsTogetherTotal"),
        monthsTogetherTotal: document.getElementById("monthsTogetherTotal"),
        daysTogetherTotal: document.getElementById("daysTogetherTotal"),
        hoursTogetherTotal: document.getElementById("hoursTogetherTotal"),
        minutesTogetherTotal: document.getElementById("minutesTogetherTotal"),
        secondsTogetherTotal: document.getElementById("secondsTogetherTotal"),

        backFromTimeline: document.getElementById("backFromTimeline"),
        backFromGallery: document.getElementById("backFromGallery"),
        backFromLetters: document.getElementById("backFromLetters"),
        backFromGames: document.getElementById("backFromGames"),
        backFromStarMap: document.getElementById("backFromStarMap"),
        backFromSurprise: document.getElementById("backFromSurprise"),

        viewer: document.getElementById("photoViewer"),
        viewerImage: document.getElementById("viewerImage"),
        viewerCaption: document.getElementById("viewerCaption"),
        closeViewer: document.getElementById("closeViewer"),
        viewerBackBtn: document.getElementById("viewerBackBtn"),

        letterViewer: document.getElementById("letterViewer"),
        letterTitle: document.getElementById("letterTitle"),
        letterContent: document.getElementById("letterContent"),
        closeLetter: document.getElementById("closeLetter"),

        animateStarsBtn: document.getElementById("animateStarsBtn"),
        canvas: document.getElementById("starCanvas"),

        giftBox: document.getElementById("giftBox"),
        openGiftBtn: document.getElementById("openGiftBtn"),
        giftReveal: document.getElementById("giftReveal"),
        closeGiftReveal: document.getElementById("closeGiftReveal")
    };
}

// ==========================================
// 4. NAVIGATION SYSTEM
// ==========================================
function hideAllSections() {
    if (!DOM.sections) return;
    Object.values(DOM.sections).forEach(section => {
        if (section) {
            section.style.setProperty("display", "none", "important");
            section.hidden = true;
        }
    });
}

function showSection(name) {
    hideAllSections();
    const section = DOM.sections ? DOM.sections[name] : null;
    if (!section) return;
    
    section.hidden = false;
    section.style.setProperty("display", "block", "important");
    
    // Reset Games page every time it opens
if (name === "games") {

    const gamesGrid = document.querySelector(".games-grid");
    const puzzleLevelSelector = document.getElementById("puzzleLevelSelector");

    if (gamesGrid) {
        gamesGrid.style.display = "grid";
    }

    if (puzzleLevelSelector) {
        puzzleLevelSelector.hidden = true;
    }
}
    
    // Smooth transition
    section.animate(
        [
            { opacity: 0, transform: "translateY(25px)" },
            { opacity: 1, transform: "translateY(0)" }
        ],
        { duration: 450, easing: "ease-out", fill: "forwards" }
    );

    if (name === "starmap") {
        resizeCanvas();
        createStars();
        if (!starAnimationId) animateStars();
    } else {
        if (starAnimationId) {
            cancelAnimationFrame(starAnimationId);
            starAnimationId = null;
        }
    }
}

// ==========================================
// 5. COUNTDOWN ENGINE (GATES UPCOMING lock)
// ==========================================
function updateCountdown(target) {
    if (countdownTimer) clearInterval(countdownTimer);
    
    function tick() {
        const now = Date.now();
        const distance = target - now;

        if (distance <= 0) {
            clearInterval(countdownTimer);
            updateSystem();
            return;
        }

        const d = Math.floor(distance / 86400000);
        const h = Math.floor((distance % 86400000) / 3600000);
        const m = Math.floor((distance % 3600000) / 60000);
        const s = Math.floor((distance % 60000) / 1000);

        if (DOM.days) DOM.days.textContent = String(d).padStart(2, "0");
        if (DOM.hours) DOM.hours.textContent = String(h).padStart(2, "0");
        if (DOM.minutes) DOM.minutes.textContent = String(m).padStart(2, "0");
        if (DOM.seconds) DOM.seconds.textContent = String(s).padStart(2, "0");
    }

    tick();
    countdownTimer = setInterval(tick, 1000);
}

// ==========================================
// 6. CENTRAL LOCK SYSTEM STATE MACHINE
// ==========================================
function updateSystem() {
    const now = Date.now();
    if (overrideAccess) {
        setState("open");
        return;
    }
    if (now < CONFIG.unlockDate) {
        setState("locked");
        return;
    }
    if (now >= CONFIG.closeDate) {
        setState("closed");
        return;
    }
    setState("open");
}

function setState(state) {
    if (currentState === state) return;
    currentState = state;

    // Deep visibility reset across sub-panels
    const overlayViews = [
        DOM.sections?.hub, DOM.sections?.timeline, DOM.sections?.gallery,
        DOM.sections?.letters, DOM.sections?.games, DOM.sections?.starmap,
        DOM.sections?.surprise, DOM.giftReveal, DOM.viewer, DOM.letterViewer
    ];

    overlayViews.forEach(view => {
        if (view) view.style.setProperty("display", "none", "important");
    });

    if (DOM.message) DOM.message.style.display = "block";
    if (DOM.status) DOM.status.style.display = "block";
    if (DOM.enterBtn) DOM.enterBtn.style.display = "none";
    if (DOM.passwordBox) DOM.passwordBox.style.display = "none";
    if (DOM.pwError) DOM.pwError.textContent = "";

    if (state === "locked") {
        if (DOM.status) DOM.status.textContent = "⏳ Waiting For Our Day";
        if (DOM.message) DOM.message.innerHTML = `Some moments are worth waiting for...<br><br>Every second brings us closer to our anniversary. ❤️`;
        if (DOM.countdown) DOM.countdown.style.setProperty("display", "grid", "important");
        updateCountdown(CONFIG.unlockDate);
        
        if (DOM.footer) {
            DOM.footer.innerHTML = `
                <p>✨ Every second brings us closer to our day.</p>
                <p><time datetime="2026-07-15T00:00"><strong>15 July 2026 • 12:00 AM</strong></time></p>
            `;
        }
    } 
    else if (state === "open") {
        if (DOM.status) DOM.status.textContent = "💖 Happy Anniversary";
        if (DOM.message) DOM.message.innerHTML = `Today is ours.<br>Let's make another beautiful memory together. ❤️`;
        if (DOM.countdown) DOM.countdown.style.setProperty("display", "none", "important");
        if (DOM.enterBtn) DOM.enterBtn.style.display = "inline-block";
        
        heartBurst();
        tryPlayMusic();
        
        if (DOM.footer) {
            DOM.footer.innerHTML = `
                <p>✨ Today is the day! Welcome to our anniversary.</p>
                <p><time datetime="2026-07-15T00:00"><strong>Opened: 15 July 2026</strong></time></p>
            `;
        }
        openLoveHub();
    } 
    else if (state === "closed") {
        if (DOM.status) DOM.status.textContent = "📔 Our Little Diary";
        if (DOM.message) DOM.message.innerHTML = `The celebration has ended.<br><br>Only our secret can reopen these memories.`;
        
        if (DOM.countdown) DOM.countdown.style.setProperty("display", "grid", "important");
        ['days', 'hours', 'minutes', 'seconds'].forEach(key => {
            if (DOM[key]) DOM[key].textContent = "00";
        });
        
        if (DOM.passwordBox) DOM.passwordBox.style.display = "block";

        if (DOM.footer) {
            DOM.footer.innerHTML = `
                <p>⏳ Gates closed on 16 July 2026. Enter password to view the diary.</p>
                <p><time datetime="2026-07-15T00:00"><strong>Unlocked: 15 July 2026</strong></time></p>
            `;
        }
    }
}

// ==========================================
// 7. PASSWORD SECURE PROCESSOR
// ==========================================
function checkPassword() {
    if (!DOM.pwInput) return;
    const entered = DOM.pwInput.value.trim();
    if (entered === CONFIG.adminPassword) {
        overrideAccess = true;
        if (DOM.pwError) DOM.pwError.textContent = "";
        heartBurst();
        updateSystem();
        return;
    }
    if (DOM.pwError) DOM.pwError.textContent = "Hmm... that's not our little secret ❤️";
    DOM.pwInput.value = "";
    DOM.pwInput.focus();
}

// ==========================================
// 8. MUSIC INTERACTION ENGINE
// ==========================================
function toggleMusic() {
    if (!DOM.music || !DOM.musicBtn) return;
    if (DOM.music.paused) {
        DOM.music.play()
            .then(() => {
                DOM.musicBtn.classList.remove("off");
                DOM.musicBtn.classList.add("playing");
                setTimeout(() => DOM.musicBtn.classList.add("hide"), 2000);
            })
            .catch(err => console.warn("Audio interaction deferred:", err));
    } else {
        DOM.music.pause();
        DOM.musicBtn.classList.add("off");
        DOM.musicBtn.classList.remove("hide", "playing");
    }
}

function tryPlayMusic() {
    if (!DOM.music || !DOM.musicBtn) return;
    DOM.music.play()
        .then(() => {
            DOM.musicBtn.classList.remove("off");
            DOM.musicBtn.classList.add("playing");
            setTimeout(() => DOM.musicBtn.classList.add("hide"), 2000);
        })
        .catch(() => {
            DOM.musicBtn.classList.remove("playing");
        });
}

// ==========================================
// 9. THEME ENGINE
// ==========================================
function applyTheme() {
    const h = new Date().getHours();
    if (DOM.body) {
        if (h >= 6 && h < 18) {
            DOM.body.classList.remove("dark-mode");
        } else {
            DOM.body.classList.add("dark-mode");
        }
    }
}

// ==========================================
// 10. ATMOSPHERIC PARTICLES FLUID GRAPHICS
// ==========================================
const randomRange = (min, max) => Math.random() * (max - min) + min;

function spawnParticle(collection, className, lifespan) {
    if (!DOM.particleLayer || document.hidden) return;
    const element = document.createElement("div");
    element.className = className;
    element.textContent = collection[Math.floor(Math.random() * collection.length)];
    element.style.left = randomRange(0, 100) + "vw";
    element.style.fontSize = randomRange(16, 28) + "px";
    element.style.animationDuration = randomRange(10, 20) + "s";
    element.style.opacity = randomRange(0.4, 1);
    
    DOM.particleLayer.appendChild(element);
    setTimeout(() => element.remove(), lifespan);
}

function spawnStarFall() {
    if (!DOM.body || !DOM.particleLayer || document.hidden || !DOM.body.classList.contains("dark-mode")) return;
    const star = document.createElement("div");
    star.className = "star-fall";
    star.style.left = randomRange(0, 100) + "vw";
    star.style.top = "-10px";
    star.style.width = randomRange(2, 4) + "px";
    star.style.height = star.style.width;
    star.style.animationDuration = randomRange(4, 8) + "s";
    
    DOM.particleLayer.appendChild(star);
    setTimeout(() => star.remove(), 8000);
}

function spawnShootingStar() {
    if (!DOM.body || !DOM.particleLayer || document.hidden || !DOM.body.classList.contains("dark-mode")) return;
    const shooting = document.createElement("div");
    shooting.className = "shooting-star";
    shooting.style.top = randomRange(5, 45) + "vh";
    shooting.style.left = "-10vw";
    
    DOM.particleLayer.appendChild(shooting);
    setTimeout(() => shooting.remove(), 1800);
}

function spawnStar() {
    if (!DOM.body || !DOM.particleLayer || document.hidden || !DOM.body.classList.contains("dark-mode")) return;
    const star = document.createElement("div");
    star.className = "star";
    const size = randomRange(2, 5);
    star.style.width = size + "px";
    star.style.height = size + "px";
    star.style.left = randomRange(0, 100) + "vw";
    star.style.top = randomRange(0, 100) + "vh";
    star.style.animationDuration = randomRange(15, 28) + "s";

    DOM.particleLayer.appendChild(star);
    setTimeout(() => star.remove(), 30000);
}

function heartBurst() {
    if (!DOM.particleLayer) return;
    const burstCount = 28;
    const fragment = document.createDocumentFragment();
    
    for (let i = 0; i < burstCount; i++) {
        const heart = document.createElement("div");
        heart.className = "heart-burst";
        heart.textContent = "💖";
        heart.style.left = "50vw";
        heart.style.top = "50vh";

        const angle = Math.random() * Math.PI * 2;
        const distance = randomRange(90, 220);

        heart.style.setProperty("--x", `${Math.cos(angle) * distance}px`);
        heart.style.setProperty("--y", `${Math.sin(angle) * distance}px`);
        
        fragment.appendChild(heart);
        setTimeout(() => heart.remove(), 1300);
    }
    DOM.particleLayer.appendChild(fragment);
}

// ==========================================
// 11. CENTRAL LOVE HUB & LIVE CLOCK BUILDERS
// ==========================================
function openLoveHub() {
    if (currentState !== "open") return; 
    if (DOM.message) DOM.message.style.display = "none";
    if (DOM.countdown) DOM.countdown.style.setProperty("display", "none", "important");
    if (DOM.status) DOM.status.style.display = "none";
    if (DOM.enterBtn) DOM.enterBtn.style.display = "none";

    showSection("hub");
    heartBurst();
    updateGreeting();
    
    if (liveCounterTimer) clearInterval(liveCounterTimer);
    updateTogetherCounter();
    liveCounterTimer = setInterval(updateTogetherCounter, 1000);
}

function updateGreeting() {
    if (!DOM.greeting) return;
    const hour = new Date().getHours();
    let text = "";

    if (hour >= 5 && hour < 12) text = "Good Morning ☀️❤️";
    else if (hour >= 12 && hour < 17) text = "Good Afternoon 🌸❤️";
    else if (hour >= 17 && hour < 21) text = "Good Evening 🌙❤️";
    else text = "Good Night 🌌❤️";
    
    DOM.greeting.textContent = text;
}

function updateTogetherCounter() {
    const now = Date.now();
    const difference = now - CONFIG.relationshipStart;

    if (difference < 0) return;

    // Cumulative grand sums calculation
    const totalSeconds = Math.floor(difference / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);
    const totalDays = Math.floor(totalHours / 24);
    const totalMonths = Math.floor(totalDays / 30.4375);
    const totalYears = (totalDays / 365.25).toFixed(1);

    if (DOM.yearsTogetherTotal) DOM.yearsTogetherTotal.textContent = totalYears;
    if (DOM.monthsTogetherTotal) DOM.monthsTogetherTotal.textContent = totalMonths;
    if (DOM.daysTogetherTotal) DOM.daysTogetherTotal.textContent = totalDays;
    if (DOM.hoursTogetherTotal) DOM.hoursTogetherTotal.textContent = totalHours;
    if (DOM.minutesTogetherTotal) DOM.minutesTogetherTotal.textContent = totalMinutes;
    if (DOM.secondsTogetherTotal) DOM.secondsTogetherTotal.textContent = totalSeconds;

    // Relative breakdown tickers
    const liveDaysVal = Math.floor(difference / (1000 * 60 * 60 * 24));
    const liveHoursVal = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const liveMinutesVal = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const liveSecondsVal = Math.floor((difference % (1000 * 60)) / 1000);

    if (DOM.liveDays) DOM.liveDays.textContent = String(liveDaysVal).padStart(2, '0');
    if (DOM.liveHours) DOM.liveHours.textContent = String(liveHoursVal).padStart(2, '0');
    if (DOM.liveMinutes) DOM.liveMinutes.textContent = String(liveMinutesVal).padStart(2, '0');
    if (DOM.liveSeconds) DOM.liveSeconds.textContent = String(liveSecondsVal).padStart(2, '0');
}

// ==========================================
// 12. GALLERY SYSTEM VIEWER CONTROLS
// ==========================================
function showPhoto(index) {
    if (!DOM.viewer || !DOM.viewerImage || !DOM.viewerCaption) return;
    const photo = galleryPhotos[index];
    if (!photo) return;
    
    DOM.viewer.style.setProperty("display", "block", "important");
    DOM.viewerImage.src = photo.src;
    DOM.viewerImage.alt = photo.title;
    DOM.viewerCaption.innerHTML = `<strong>${photo.title}</strong><br>${photo.caption}`;
    heartBurst();
}

function nextPhoto() {
    currentPhoto = (currentPhoto + 1) % galleryPhotos.length;
    showPhoto(currentPhoto);
}

function previousPhoto() {
    currentPhoto = (currentPhoto - 1 + galleryPhotos.length) % galleryPhotos.length;
    showPhoto(currentPhoto);
}

// ==========================================
// 13. CANVASES AND STAR MAP SYSTEMS
// ==========================================
function resizeCanvas() {
    if (!DOM.canvas) return;
    DOM.canvas.width = DOM.canvas.clientWidth || DOM.canvas.offsetWidth || window.innerWidth;
    DOM.canvas.height = DOM.canvas.clientHeight || DOM.canvas.offsetHeight || window.innerHeight;
}

function createStars() {
    if (!DOM.canvas) return;
    stars = [];
    for (let i = 0; i < 180; i++) {
        stars.push({
            x: Math.random() * DOM.canvas.width,
            y: Math.random() * DOM.canvas.height,
            r: Math.random() * 2 + 1,
            a: Math.random(),
            s: Math.random() * 0.02
        });
    }
}

function animateStars() {
    if (!DOM.canvas || !DOM.sections?.starmap || DOM.sections.starmap.style.display === "none") {
        starAnimationId = null;
        return;
    }
    const ctx = DOM.canvas.getContext("2d");
    if (!ctx) return;
    
    ctx.clearRect(0, 0, DOM.canvas.width, DOM.canvas.height);
    stars.forEach(star => {
        star.a += star.s;
        if (star.a > 1 || star.a < 0.2) star.s = -star.s;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${Math.max(0, Math.min(star.a, 1))})`;
        ctx.fill();
    });

    starAnimationId = requestAnimationFrame(animateStars);
}

function shootingStar() {
    if (!DOM.canvas || !DOM.sections?.starmap || DOM.sections.starmap.style.display === "none") return;
    const ctx = DOM.canvas.getContext("2d");
    if (!ctx) return;
    
    ctx.beginPath();
    ctx.moveTo(-50, Math.random() * DOM.canvas.height);
    ctx.lineTo(150, Math.random() * DOM.canvas.height + 50);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
    ctx.lineWidth = 2;
    ctx.stroke();
}

// ==========================================
// 14. INLINE INITIALIZATION CORE (DOM Ready)
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    initDOMReferences();

    if (DOM.enterBtn) {
        DOM.enterBtn.hidden = false;
        DOM.enterBtn.style.display = "block";
    }

    if (DOM.music) DOM.music.src = CONFIG.musicSrc;

    applyTheme();
    setInterval(applyTheme, 600000);

    if (DOM.card) {
        Object.assign(DOM.card.style, {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center"
        });
    }

    updateSystem();
    setInterval(updateSystem, 1000);

    // Dynamic background particle engine tasks
    setInterval(() => spawnParticle(HEARTS, "heart", 19000), 900);
    setInterval(() => spawnParticle(FLOWERS, "flower", 22000), 1800);
    setInterval(() => spawnParticle(EMOJIS, "emoji", 23000), 2200);
    setInterval(spawnStar, 800);
    setInterval(spawnStarFall, 1500);
    setInterval(spawnShootingStar, 20000);

    // Garbage collector for overflow particles
    setInterval(() => {
        if (!DOM.particleLayer) return;
        const particles = DOM.particleLayer.children;
        if (particles.length > 150) {
            for (let i = 0; i < 30; i++) {
                if (DOM.particleLayer.firstChild) DOM.particleLayer.removeChild(DOM.particleLayer.firstChild);
            }
        }
    }, 15000);

    setInterval(shootingStar, 6000);

    // Lock page quote rotators
    setInterval(() => {
        if (currentState === "locked" && DOM.footer) {
            const textNode = DOM.footer.querySelector("p");
            if (textNode) textNode.textContent = loveQuotes[Math.floor(Math.random() * loveQuotes.length)];
        }
    }, 7000);

    // Hub section quote rotators
    if (DOM.quoteBox) {
        setInterval(() => {
            DOM.quoteBox.style.opacity = '0';
            setTimeout(() => {
                DOM.quoteBox.textContent = dashboardQuotes[Math.floor(Math.random() * dashboardQuotes.length)];
                DOM.quoteBox.style.opacity = '1';
            }, 400);
        }, 8000);
    }

    // --- Dynamic Event Listeners Core Binding ---
    if (DOM.pwBtn) DOM.pwBtn.addEventListener("click", checkPassword);
    if (DOM.pwInput) {
        DOM.pwInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") checkPassword();
        });
    }

    if (DOM.enterBtn) {
        DOM.enterBtn.addEventListener("click", () => {
            heartBurst();
            DOM.enterBtn.style.display = "none";
            if (DOM.status) DOM.status.textContent = "💖 Welcome Back";
            if (DOM.message) DOM.message.innerHTML = `Welcome home ❤️<br><br>Everything inside was made only for you.`;
            openLoveHub();
        });
    }

    if (DOM.musicBtn) DOM.musicBtn.addEventListener("click", toggleMusic);

    // Card interactive 3D parallax adjustments
    if (DOM.card) {
        DOM.card.addEventListener("touchstart", (e) => {
            cardTiltStartX = e.touches[0].clientX;
            DOM.card.style.transition = "none";
        }, { passive: true });

        DOM.card.addEventListener("touchmove", (e) => {
            if (currentState !== "locked") return;
            const move = e.touches[0].clientX - cardTiltStartX;
            const rotate = move / 10;
            DOM.card.style.transform = `perspective(900px) rotateY(${rotate}deg)`;
        }, { passive: true });

        DOM.card.addEventListener("touchend", () => {
            if (DOM.resetBtn) DOM.resetBtn.style.display = "inline-block";
            DOM.card.style.transition = "transform 0.45s ease";
            DOM.card.style.transform = "perspective(900px) rotateY(0deg)";
        });
    }

    if (DOM.resetBtn) {
        DOM.resetBtn.addEventListener("click", () => {
            if (DOM.card) {
                DOM.card.style.transition = "transform 0.45s ease";
                DOM.card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
            }
        });
    }

    // Tap double click/press recognition handles
    if (DOM.body) {
        DOM.body.addEventListener("touchend", () => {
            const now = Date.now();
            if (now - lastTap < 300) heartBurst();
            lastTap = now;
        }, { passive: true });

        DOM.body.addEventListener("touchstart", () => {
            pressTimer = setTimeout(heartBurst, 700);
        }, { passive: true });
        DOM.body.addEventListener("touchend", () => clearTimeout(pressTimer), { passive: true });
    }

    // Wire up hub selection elements safely
    document.querySelectorAll(".hub-card").forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.addEventListener("click", () => {
            heartBurst();
            const targetSection = card.dataset.section;
            if (targetSection) showSection(targetSection);
        });
    });
    
    const openStarMap = document.getElementById("openStarMap");
const openSurprise = document.getElementById("openSurprise");

if (openStarMap) {
    openStarMap.addEventListener("click", () => showSection("starmap"));
}

if (openSurprise) {
    openSurprise.addEventListener("click", () => showSection("surprise"));
}

    // Sub-view backward route configurations
    const backBtnMappings = [
        { btn: DOM.backFromTimeline, target: "hub" },
        { btn: DOM.backFromGallery, target: "hub" },
        { btn: DOM.backFromLetters, target: "hub" },
        { btn: DOM.backFromGames, target: "hub" },
        { btn: DOM.backFromStarMap, target: "hub" },
        { btn: DOM.backFromSurprise, target: "hub" }
    ];

    backBtnMappings.forEach(mapping => {
        if (mapping.btn) {
            mapping.btn.addEventListener("click", () => showSection(mapping.target));
        }
    });

    // Timeline elements layout rendering loops
    document.querySelectorAll(".timeline-card").forEach((card, index) => {
        card.style.opacity = "0";
        card.style.transform = "translateY(30px)";
        setTimeout(() => {
            card.style.transition = "all 0.6s ease";
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
        }, index * 180);

        card.addEventListener("click", () => {
            heartBurst();
            card.animate([
                { transform: "scale(1)" },
                { transform: "scale(1.04)" },
                { transform: "scale(1)" }
            ], { duration: 400, easing: "ease" });
        });
    });

    // Gallery grids interactions bindings
    document.querySelectorAll(".gallery-card").forEach((card, index) => {
        card.addEventListener("click", () => {
            currentPhoto = index;
            showPhoto(index);
        });
    });

    if (DOM.closeViewer) {
        DOM.closeViewer.addEventListener("click", () => {
            if (DOM.viewer) DOM.viewer.style.setProperty("display", "none", "important");
        });
    }
    if (DOM.viewerBackBtn) {
    DOM.viewerBackBtn.addEventListener("click", () => {
        if (DOM.viewer) {
            DOM.viewer.style.setProperty("display", "none", "important");
        }
    });
}

    let gallerySwipeStartX = 0;
    if (DOM.viewer) {
        DOM.viewer.addEventListener("touchstart", e => {
            gallerySwipeStartX = e.touches[0].clientX;
        }, { passive: true });

        DOM.viewer.addEventListener("touchend", e => {
            const endX = e.changedTouches[0].clientX;
            if (endX - gallerySwipeStartX > 60) previousPhoto();
            if (gallerySwipeStartX - endX > 60) nextPhoto();
        }, { passive: true });
    }

    // Letters systems events setups
    document.querySelectorAll(".letter-card").forEach((card, index) => {
        card.addEventListener("click", () => {
            if (!DOM.letterViewer || !DOM.letterTitle || !DOM.letterContent || !letters[index]) return;
            DOM.letterViewer.style.setProperty("display", "block", "important");
            DOM.letterTitle.textContent = letters[index].title;
            DOM.letterContent.textContent = letters[index].text;
            heartBurst();
            
            card.animate([
                { transform: "scale(1)" },
                { transform: "scale(1.05)" },
                { transform: "scale(1)" }
            ], { duration: 400, easing: "ease" });
        });
    });

    if (DOM.closeLetter) {
        DOM.closeLetter.addEventListener("click", () => {
            if (DOM.letterViewer) DOM.letterViewer.style.setProperty("display", "none", "important");
        });
    }

    // Games dashboard interfaces setups
    document.querySelectorAll(".game-card").forEach((card, index) => {
        card.style.animationDelay = `${index * 0.12}s`;
        card.addEventListener("click", () => {
            heartBurst();
            // Games feature implementations placeholders
        });
    });

    // Wish interaction triggers
    if (DOM.animateStarsBtn) {
        DOM.animateStarsBtn.addEventListener("click", () => {
            heartBurst();
            for (let i = 0; i < 15; i++) {
                setTimeout(heartBurst, i * 120);
            }
            DOM.animateStarsBtn.textContent = "✨ Wish Granted ❤️";
            setTimeout(() => {
                if (DOM.animateStarsBtn) DOM.animateStarsBtn.textContent = "✨ Make A Wish";
            }, 2500);
        });
    }

    window.addEventListener("resize", () => {
        resizeCanvas();
        createStars();
    });

    // Surprise structures setup bindings
    if (DOM.openGiftBtn) {
        DOM.openGiftBtn.addEventListener("click", () => {
            if (DOM.giftBox) DOM.giftBox.classList.add("open");
            heartBurst();
            for (let i = 0; i < 20; i++) {
                setTimeout(heartBurst, i * 100);
            }
            setTimeout(() => {
                if (DOM.giftReveal) DOM.giftReveal.style.setProperty("display", "block", "important");
            }, 1200);
        });
    }

    if (DOM.closeGiftReveal) {
        DOM.closeGiftReveal.addEventListener("click", () => {
            if (DOM.giftReveal) DOM.giftReveal.style.setProperty("display", "none", "important");
            if (DOM.giftBox) DOM.giftBox.classList.remove("open");
        });
    }

    if (DOM.giftBox) {
        DOM.giftBox.addEventListener("click", () => {
            DOM.giftBox.animate([
                { transform: "rotate(0deg)" },
                { transform: "rotate(-6deg)" },
                { transform: "rotate(6deg)" },
                { transform: "rotate(0deg)" }
            ], { duration: 500, easing: "ease-in-out" });
        });
    }

    // Global Key Events Framework controls (Escapes & Gallery Arrows)
    document.addEventListener("keydown", e => {
        if (DOM.viewer && DOM.viewer.style.display !== "none") {
            if (e.key === "ArrowRight") nextPhoto();
            if (e.key === "ArrowLeft") previousPhoto();
            if (e.key === "Escape") DOM.viewer.style.setProperty("display", "none", "important");
        }
        if (e.key === "Escape" && DOM.letterViewer) {
            DOM.letterViewer.style.setProperty("display", "none", "important");
        }
    });

    setTimeout(heartBurst, 800);
});

// ==========================================
// 15. WINDOW BLUR/FOCUS TRACKING CONTROLS
// ==========================================
document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        document.title = "Come back ❤️";
        if (DOM.music) DOM.music.pause();
    } else {
        document.title = "OURVERSE";
        if (DOM.music && DOM.musicBtn && !DOM.musicBtn.classList.contains("off")) {
            DOM.music.play().catch(() => {});
        }
    }
});

const openPuzzleGame = document.getElementById("openPuzzleGame");
const puzzleLevelSelector = document.getElementById("puzzleLevelSelector");
const gamesGrid = document.querySelector(".games-grid");

if (openPuzzleGame && puzzleLevelSelector && gamesGrid) {

    puzzleLevelSelector.hidden = true;

    openPuzzleGame.addEventListener("click", () => {

        gamesGrid.style.display = "none";
        puzzleLevelSelector.hidden = false;

    });

}

const backToGames = document.getElementById("backToGames");

if (backToGames) {
    backToGames.addEventListener("click", () => {
        puzzleLevelSelector.hidden = true;
        gamesGrid.style.display = "grid";
    });
}

/* ===== FORCE UNLOCK EVERYTHING (TEST MODE ACTIVE) ===== */
window.addEventListener("load", () => {
    // Dynamic execution verification sequence 
    if (!DOM.sections) initDOMReferences();

    overrideAccess = true;
    setState("open");
    openLoveHub();
    showSection("hub");
    tryPlayMusic();
    heartBurst();
});