"use client";

import { useEffect, useRef } from "react";

export default function LightRays() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationRef = useRef<number>(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const gl = canvas.getContext("webgl");
        if (!gl) {
            console.warn("WebGL not supported, falling back to CSS light rays");
            return;
        }

        // Set canvas size
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            gl.viewport(0, 0, canvas.width, canvas.height);
        };
        resize();
        window.addEventListener("resize", resize);

        // Vertex shader
        const vertexShaderSource = `
            precision mediump float;
            attribute vec2 a_position;
            varying vec2 vUv;
            
            void main() {
                vUv = vec2(0.5 * (a_position.x + 1.0), 0.5 * (1.0 - a_position.y));
                gl_Position = vec4(a_position, 0.0, 1.0);
            }
        `;

        // Fragment shader - orange/gold themed light rays
        const fragmentShaderSource = `
            precision mediump float;
            
            varying vec2 vUv;
            uniform float u_time;
            uniform vec2 u_resolution;
            
            float rayStrength(vec2 raySource, vec2 rayRefDirection, vec2 coord, float seedA, float seedB, float speed) {
                vec2 sourceToCoord = coord - raySource;
                float cosAngle = dot(normalize(sourceToCoord), rayRefDirection);
                
                return clamp(
                    (0.45 + 0.15 * sin(cosAngle * seedA + u_time * speed)) +
                    (0.3 + 0.2 * cos(-cosAngle * seedB + u_time * speed)),
                    0.0, 1.0) *
                    clamp((u_resolution.x - length(sourceToCoord)) / u_resolution.x, 0.5, 1.0);
            }
            
            void main() {
                vec2 fragCoord = vUv * u_resolution;
                
                // Light rays from top right
                vec2 rayPos = vec2(u_resolution.x * 1.0, u_resolution.y * -0.2);
                vec2 rayRefDir = normalize(vec2(-1.0, 1.0));
                float raySeedA = 36.2214;
                float raySeedB = 21.11349;
                float raySpeed = 1.2;
                
                // Calculate ray color - orange/gold theme
                float rayValue = rayStrength(rayPos, rayRefDir, fragCoord, raySeedA, raySeedB, raySpeed);
                
                // Attenuate brightness towards the bottom
                float brightness = 1.0 - (fragCoord.y / (u_resolution.y *1.5));
                
                // Orange/gold color (RGB: 249, 115, 22 to 251, 191, 36)
                vec4 rays = vec4(
                    1.0 * rayValue * (0.4 + brightness * 0.6),   // Red: Keep high (0.98 -> 1.0)
                    0.35 * rayValue * (0.3 + brightness * 0.5),  // Green: Lower slightly (0.45 -> 0.35)
                    0.05 * rayValue * (0.2 + brightness * 0.3),  // Blue: Lower slightly (0.09 -> 0.05)
                    rayValue * 0.4
                );
                
                gl_FragColor = rays;
            }
        `;

        // Create shader
        const createShader = (type: number, source: string) => {
            const shader = gl.createShader(type);
            if (!shader) return null;
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                console.error("Shader compile error:", gl.getShaderInfoLog(shader));
                gl.deleteShader(shader);
                return null;
            }
            return shader;
        };

        const vertexShader = createShader(gl.VERTEX_SHADER, vertexShaderSource);
        const fragmentShader = createShader(gl.FRAGMENT_SHADER, fragmentShaderSource);
        if (!vertexShader || !fragmentShader) return;

        // Create program
        const program = gl.createProgram();
        if (!program) return;
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error("Program link error:", gl.getProgramInfoLog(program));
            return;
        }

        gl.useProgram(program);

        // Create geometry (fullscreen quad)
        const positions = new Float32Array([
            -1, -1,
            1, -1,
            -1, 1,
            1, 1,
        ]);
        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

        const positionLocation = gl.getAttribLocation(program, "a_position");
        gl.enableVertexAttribArray(positionLocation);
        gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

        // Get uniform locations
        const timeLocation = gl.getUniformLocation(program, "u_time");
        const resolutionLocation = gl.getUniformLocation(program, "u_resolution");

        // Enable blending for transparency
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

        // Animation loop
        const startTime = Date.now();
        const render = () => {
            const time = (Date.now() - startTime) * 0.001;

            gl.clearColor(0, 0, 0, 0);
            gl.clear(gl.COLOR_BUFFER_BIT);

            gl.uniform1f(timeLocation, time);
            gl.uniform2f(resolutionLocation, canvas.width, canvas.height);

            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

            animationRef.current = requestAnimationFrame(render);
        };
        render();

        return () => {
            cancelAnimationFrame(animationRef.current);
            window.removeEventListener("resize", resize);
            gl.deleteProgram(program);
            gl.deleteShader(vertexShader);
            gl.deleteShader(fragmentShader);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-[2]"
            style={{ mixBlendMode: "screen" }}
        />
    );
}
