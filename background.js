const canvas = document.getElementById('shimmer-canvas');

// Error handling - check if canvas exists
if (!canvas) {
    console.warn('Shimmer canvas not found. Shimmer effect disabled.');
} else {
    const ctx = canvas.getContext('2d');

    if (!ctx) {
        console.warn('Canvas context not supported. Shimmer effect disabled.');
    } else {
        let width, height;
        let dots = [];
        const DOT_SPACING = 30;
        const DOT_SIZE = 1.5;
        const MOUSE_RADIUS = 100;
        let isDirty = true;  // Track if we need to redraw

        let mouse = { x: -1000, y: -1000 };

        function resize() {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            initDots();
            isDirty = true;
        }

        function initDots() {
            dots = [];
            for (let x = 0; x < width; x += DOT_SPACING) {
                for (let y = 0; y < height; y += DOT_SPACING) {
                    dots.push({
                        x: x,
                        y: y,
                        baseAlpha: 0.1,
                        alpha: 0.1,
                        targetAlpha: 0.1
                    });
                }
            }
        }

        function updateDots() {
            let hasChanges = false;

            dots.forEach(dot => {
                const dx = mouse.x - dot.x;
                const dy = mouse.y - dot.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                let newTargetAlpha;
                if (distance < MOUSE_RADIUS) {
                    newTargetAlpha = 0.6 - (distance / MOUSE_RADIUS) * 0.5;
                } else {
                    newTargetAlpha = dot.baseAlpha;
                }

                if (Math.abs(newTargetAlpha - dot.targetAlpha) > 0.001) {
                    dot.targetAlpha = newTargetAlpha;
                    hasChanges = true;
                }

                const alphaDiff = (dot.targetAlpha - dot.alpha) * 0.1;
                if (Math.abs(alphaDiff) > 0.001) {
                    dot.alpha += alphaDiff;
                    hasChanges = true;
                }
            });

            if (hasChanges) {
                isDirty = true;
            }
        }

        function drawDots() {
            if (!isDirty) return;  // Skip drawing if nothing changed

            ctx.clearRect(0, 0, width, height);

            dots.forEach(dot => {
                if (dot.alpha > 0.05) {  // Only draw visible dots
                    ctx.beginPath();
                    ctx.arc(dot.x, dot.y, DOT_SIZE, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(255, 255, 255, ${dot.alpha})`;
                    ctx.fill();
                }
            });

            isDirty = false;
        }

        function animate() {
            updateDots();
            drawDots();
            requestAnimationFrame(animate);
        }

        // Throttled resize handler
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(resize, 150);
        });

        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });

        // Initialize
        resize();
        animate();
    }
}

