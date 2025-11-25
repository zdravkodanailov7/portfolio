"use client";

import React, { useEffect, useRef, useState } from "react";

// External textures
const TEXTURE_WALL = "/content/raycasting/texture.png";
const TEXTURE_FLOOR = "/content/raycasting/floor.png";
const TEXTURE_BG = "/content/raycasting/background.png";

export default function RaycastingEngine() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const offscreenRef = useRef<HTMLCanvasElement | null>(null);
    const animationRef = useRef<number | null>(null);

    // Asset refs (hidden images)
    const textureRef = useRef<HTMLImageElement>(null);
    const floorRef = useRef<HTMLImageElement>(null);
    const bgRef = useRef<HTMLImageElement>(null);

    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        if (!canvasRef.current || !containerRef.current || !textureRef.current || !floorRef.current || !bgRef.current) return;

        // Initialize data
        /**
         * Color class
         */
        class Color {
            r: number;
            g: number;
            b: number;
            a: number;

            constructor(r: number, g: number, b: number, a: number) {
                this.r = r;
                this.g = g;
                this.b = b;
                this.a = a;
            }
        }

        const screenWidth = 640;
        const screenHeight = 480;

        // Data object
        const data: any = {
            screen: {
                width: screenWidth,
                height: screenHeight,
                halfWidth: null,
                halfHeight: null,
                scale: 4
            },
            projection: {
                width: null,
                height: null,
                halfWidth: null,
                halfHeight: null,
                buffer: null,
                imageData: null,
            },
            floorTextures: [
                {
                    width: 16,
                    height: 16,
                    id: "floor-texture",
                    data: null,
                    imgRef: floorRef.current
                }
            ],
            backgrounds: [
                {
                    width: 360,
                    height: 60,
                    id: "background",
                    data: null,
                    imgRef: bgRef.current
                }
            ],
            render: {
                delay: 30
            },
            rayCasting: {
                incrementAngle: null,
                precision: 64
            },
            player: {
                fov: 60,
                halfFov: null,
                x: 2,
                y: 2,
                angle: 90,
                speed: {
                    movement: 0.1,
                    rotation: 4.5
                },
                radius: 0.3
            },
            key: {
                up: {
                    code: "KeyW",
                    active: false
                },
                down: {
                    code: "KeyS",
                    active: false
                },
                left: {
                    code: "KeyA",
                    active: false
                },
                right: {
                    code: "KeyD",
                    active: false
                }
            },
            map: [
                [2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
                [2, 0, 0, 0, 0, 0, 0, 0, 0, 2],
                [2, 0, 0, 0, 0, 0, 0, 0, 0, 2],
                [2, 0, 0, 2, 2, 0, 2, 0, 0, 2],
                [2, 0, 0, 2, 0, 0, 2, 0, 0, 2],
                [2, 0, 0, 2, 0, 0, 2, 0, 0, 2],
                [2, 0, 0, 2, 0, 2, 2, 0, 0, 2],
                [2, 0, 0, 0, 0, 0, 0, 0, 0, 2],
                [2, 0, 0, 0, 0, 0, 0, 0, 0, 2],
                [2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
            ],
            textures: [
                {
                    width: 8,
                    height: 8,
                    bitmap: [
                        [1, 1, 1, 1, 1, 1, 1, 1],
                        [0, 0, 0, 1, 0, 0, 0, 1],
                        [1, 1, 1, 1, 1, 1, 1, 1],
                        [0, 1, 0, 0, 0, 1, 0, 0],
                        [1, 1, 1, 1, 1, 1, 1, 1],
                        [0, 0, 0, 1, 0, 0, 0, 1],
                        [1, 1, 1, 1, 1, 1, 1, 1],
                        [0, 1, 0, 0, 0, 1, 0, 0]
                    ],
                    colors: [
                        new Color(255, 241, 232, 255),
                        new Color(194, 195, 199, 255),
                    ]
                },
                {
                    width: 16,
                    height: 16,
                    id: "texture",
                    data: null,
                    imgRef: textureRef.current
                }
            ]
        }

        // Calculated data
        data.player.halfFov = data.player.fov / 2;
        data.projection.width = data.screen.width / data.screen.scale;
        data.projection.height = data.screen.height / data.screen.scale;
        data.projection.halfWidth = data.projection.width / 2;
        data.projection.halfHeight = data.projection.height / 2;
        data.rayCasting.incrementAngle = data.player.fov / data.projection.width;

        // Canvas context
        const screenContext = canvasRef.current.getContext("2d")!;
        // Reset scale if re-running
        screenContext.setTransform(1, 0, 0, 1, 0, 0);
        screenContext.scale(data.screen.scale, data.screen.scale);
        screenContext.translate(0.5, 0.5);
        screenContext.imageSmoothingEnabled = false;

        // Offscreen buffer
        if (!offscreenRef.current) {
            offscreenRef.current = document.createElement('canvas');
            offscreenRef.current.width = data.projection.width;
            offscreenRef.current.height = data.projection.height;
        }
        const offscreenContext = offscreenRef.current.getContext('2d')!;

        data.projection.imageData = offscreenContext.createImageData(data.projection.width, data.projection.height);
        data.projection.buffer = data.projection.imageData.data;

        function degreeToRadians(degree: number) {
            let pi = Math.PI;
            return degree * pi / 180;
        }

        function drawPixel(x: number, y: number, color: any) {
            let offset = 4 * (Math.floor(x) + Math.floor(y) * data.projection.width);
            data.projection.buffer[offset] = color.r;
            data.projection.buffer[offset + 1] = color.g;
            data.projection.buffer[offset + 2] = color.b;
            data.projection.buffer[offset + 3] = color.a;
        }

        function drawLine(x: number, y1: number, y2: number, color: any) {
            for (let y = y1; y < y2; y++) {
                drawPixel(x, y, color);
            }
        }

        function rayCasting() {
            let rayAngle = data.player.angle - data.player.halfFov;
            for (let rayCount = 0; rayCount < data.projection.width; rayCount++) {

                let ray = {
                    x: data.player.x,
                    y: data.player.y
                }

                let rayCos = Math.cos(degreeToRadians(rayAngle)) / data.rayCasting.precision;
                let raySin = Math.sin(degreeToRadians(rayAngle)) / data.rayCasting.precision;

                let wall = 0;
                while (wall == 0) {
                    ray.x += rayCos;
                    ray.y += raySin;
                    if (ray.y < 0 || ray.y >= data.map.length || ray.x < 0 || ray.x >= data.map[0].length) {
                        wall = 1;
                    } else {
                        wall = data.map[Math.floor(ray.y)][Math.floor(ray.x)];
                    }
                }

                let distance = Math.sqrt(Math.pow(data.player.x - ray.x, 2) + Math.pow(data.player.y - ray.y, 2));
                distance = distance * Math.cos(degreeToRadians(rayAngle - data.player.angle));

                let wallHeight = Math.floor(data.projection.halfHeight / distance);

                let texture = data.textures[wall - 1];
                let texturePositionX = Math.floor((texture.width * (ray.x + ray.y)) % texture.width);

                drawBackground(rayCount, 0, data.projection.halfHeight - wallHeight, data.backgrounds[0]);
                drawTexture(rayCount, wallHeight, texturePositionX, texture);
                drawFloor(rayCount, wallHeight, rayAngle);

                rayAngle += data.rayCasting.incrementAngle;
            }
        }

        function drawTexture(x: number, wallHeight: number, texturePositionX: number, texture: any) {
            let yIncrementer = (wallHeight * 2) / texture.height;
            let y = data.projection.halfHeight - wallHeight;

            for (let i = 0; i < texture.height; i++) {
                let color;
                if (texture.id) {
                    color = texture.data[texturePositionX + i * texture.width];
                } else {
                    color = texture.colors[texture.bitmap[i][texturePositionX]];
                }
                // Fix 2 pixels to prevent gap
                drawLine(x, y, Math.floor(y + (yIncrementer + 2)), color);
                y += yIncrementer;
            }
        }

        function drawBackground(x: number, y1: number, y2: number, background: any) {
            let offset = (data.player.angle + x);
            for (let y = y1; y < y2; y++) {
                let textureX = Math.floor(offset % background.width);
                let textureY = Math.floor(y % background.height);
                // Safety check
                if (background.data) {
                    let color = background.data[textureX + textureY * background.width];
                    if (color) drawPixel(x, y, color);
                }
            }
        }

        function drawFloor(x1: number, wallHeight: number, rayAngle: number) {
            let start = data.projection.halfHeight + wallHeight + 1;
            let directionCos = Math.cos(degreeToRadians(rayAngle))
            let directionSin = Math.sin(degreeToRadians(rayAngle))
            let playerAngle = data.player.angle

            for (let y = start; y < data.projection.height; y++) {
                let distance = data.projection.height / (2 * y - data.projection.height)
                distance = distance / Math.cos(degreeToRadians(playerAngle) - degreeToRadians(rayAngle))

                let tilex = distance * directionCos
                let tiley = distance * directionSin
                tilex += data.player.x
                tiley += data.player.y

                let mapY = Math.floor(tiley);
                let mapX = Math.floor(tilex);
                if (mapY < 0 || mapY >= data.map.length || mapX < 0 || mapX >= data.map[0].length) {
                    continue;
                }
                let tile = data.map[mapY][mapX]

                let texture = data.floorTextures[tile] || data.floorTextures[0]; // fallback

                if (!texture || !texture.data) {
                    continue
                }

                let texture_x = (Math.floor(tilex * texture.width)) % texture.width
                let texture_y = (Math.floor(tiley * texture.height)) % texture.height

                let color = texture.data[texture_x + texture_y * texture.width];
                drawPixel(x1, y, color)
            }
        }

        function clearScreen() {
            for (let i = 0; i < data.projection.buffer.length; i += 4) {
                data.projection.buffer[i] = 0;     // R
                data.projection.buffer[i + 1] = 0; // G
                data.projection.buffer[i + 2] = 0; // B
                data.projection.buffer[i + 3] = 255; // A
            }
        }

        function loadTextures() {
            for (let i = 0; i < data.textures.length; i++) {
                if (data.textures[i].id) {
                    data.textures[i].data = getTextureData(data.textures[i]);
                }
            }
            for (let i = 0; i < data.floorTextures.length; i++) {
                if (data.floorTextures[i].id) {
                    data.floorTextures[i].data = getTextureData(data.floorTextures[i]);
                }
            }
        }

        function loadBackgrounds() {
            for (let i = 0; i < data.backgrounds.length; i++) {
                if (data.backgrounds[i].id) {
                    data.backgrounds[i].data = getTextureData(data.backgrounds[i]);
                }
            }
        }

        function getTextureData(texture: any) {
            // Use the ref instead of getElementById
            let image = texture.imgRef;
            if (!image) return null;

            let canvas = document.createElement('canvas');
            canvas.width = texture.width;
            canvas.height = texture.height;
            let canvasContext = canvas.getContext('2d')!;
            canvasContext.drawImage(image, 0, 0, texture.width, texture.height);
            let imageData = canvasContext.getImageData(0, 0, texture.width, texture.height).data;
            return parseImageData(imageData);
        }

        function parseImageData(imageData: Uint8ClampedArray) {
            let colorArray = [];
            for (let i = 0; i < imageData.length; i += 4) {
                colorArray.push(new Color(imageData[i], imageData[i + 1], imageData[i + 2], 255));
            }
            return colorArray;
        }

        function renderBuffer() {
            offscreenContext.putImageData(data.projection.imageData, 0, 0);
            screenContext.drawImage(offscreenRef.current!, 0, 0);
        }

        function movePlayer() {
            if (data.key.up.active) {
                let playerCos = Math.cos(degreeToRadians(data.player.angle)) * data.player.speed.movement;
                let playerSin = Math.sin(degreeToRadians(data.player.angle)) * data.player.speed.movement;
                let newX = data.player.x + playerCos;
                let newY = data.player.y + playerSin;
                let checkX = Math.floor(newX + playerCos * data.player.radius);
                let checkY = Math.floor(newY + playerSin * data.player.radius);

                if (data.map[checkY][Math.floor(data.player.x)] == 0) {
                    data.player.y = newY;
                }
                if (data.map[Math.floor(data.player.y)][checkX] == 0) {
                    data.player.x = newX;
                }
            }
            if (data.key.down.active) {
                let playerCos = Math.cos(degreeToRadians(data.player.angle)) * data.player.speed.movement;
                let playerSin = Math.sin(degreeToRadians(data.player.angle)) * data.player.speed.movement;
                let newX = data.player.x - playerCos;
                let newY = data.player.y - playerSin;
                let checkX = Math.floor(newX - playerCos * data.player.radius);
                let checkY = Math.floor(newY - playerSin * data.player.radius);

                if (data.map[checkY][Math.floor(data.player.x)] == 0) {
                    data.player.y = newY;
                }
                if (data.map[Math.floor(data.player.y)][checkX] == 0) {
                    data.player.x = newX;
                }
            }
            if (data.key.left.active) {
                data.player.angle -= data.player.speed.rotation;
                if (data.player.angle < 0) data.player.angle += 360;
                data.player.angle %= 360;
            }
            if (data.key.right.active) {
                data.player.angle += data.player.speed.rotation;
                data.player.angle %= 360;
            }
        }

        function main() {
            // Clear existing interval if any
            if (animationRef.current) clearInterval(animationRef.current);

            animationRef.current = window.setInterval(function () {
                clearScreen();
                movePlayer();
                rayCasting();
                renderBuffer();
            }, data.render.delay);
        }

        function renderFocusLost() {
            screenContext.fillStyle = 'rgba(0,0,0,0.5)';
            screenContext.fillRect(0, 0, data.projection.width, data.projection.height);
            screenContext.fillStyle = 'white';
            screenContext.font = '10px Lucida Console';
            screenContext.fillText('CLICK TO FOCUS', 37, data.projection.halfHeight);
        }

        const handleKeyDown = (event: KeyboardEvent) => {
            let keyCode = event.code;

            if (keyCode === data.key.up.code) data.key.up.active = true;
            if (keyCode === data.key.down.code) data.key.down.active = true;
            if (keyCode === data.key.left.code) data.key.left.active = true;
            if (keyCode === data.key.right.code) data.key.right.active = true;
        };

        const handleKeyUp = (event: KeyboardEvent) => {
            let keyCode = event.code;

            if (keyCode === data.key.up.code) data.key.up.active = false;
            if (keyCode === data.key.down.code) data.key.down.active = false;
            if (keyCode === data.key.left.code) data.key.left.active = false;
            if (keyCode === data.key.right.code) data.key.right.active = false;
        };

        const handleClick = () => {
            if (!isFocused) {
                setIsFocused(true);
                // main(); // Start loop (handled by effect dependency on isFocused mostly)
            }
        };

        // Initialize
        const init = async () => {
            // Wait for images to load
            const waitForImages = () => {
                return new Promise<void>((resolve) => {
                    const checkImages = () => {
                        if (
                            textureRef.current?.complete &&
                            floorRef.current?.complete &&
                            bgRef.current?.complete &&
                            textureRef.current?.naturalWidth !== 0
                        ) {
                            resolve();
                        } else {
                            setTimeout(checkImages, 100);
                        }
                    };
                    checkImages();
                });
            };

            await waitForImages();
            loadTextures();
            loadBackgrounds();
            main();
            setIsFocused(true);
        };

        init();

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        // Handle focus/blur internally to match original logic
        const handleBlur = () => {
            if (animationRef.current) {
                clearInterval(animationRef.current);
                animationRef.current = null;
                // Draw overlay immediately
                renderFocusLost();
                setIsFocused(false);
            }
        };

        const handleFocus = () => {
            if (!animationRef.current) {
                main();
                setIsFocused(true);
            }
        };

        window.addEventListener('blur', handleBlur);

        // Attach click listener to canvas for restarting
        const canvas = canvasRef.current;
        if (canvas) {
            canvas.addEventListener('click', handleFocus);
        }

        return () => {
            if (animationRef.current) clearInterval(animationRef.current);
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            window.removeEventListener('blur', handleBlur);
            if (canvas) {
                canvas.removeEventListener('click', handleFocus);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Handle focus/blur
    useEffect(() => {
        if (!canvasRef.current) return;

        if (!isFocused) {
            const ctx = canvasRef.current.getContext('2d');
            if (ctx) {
                // Draw overlay
                // Need to access data dimensions, but they are local to the other effect.
                // For now, hardcode overlay or just let it pause visually
                ctx.fillStyle = 'rgba(0,0,0,0.5)';
                ctx.fillRect(0, 0, 640 / 4, 480 / 4); // Approximate scale
            }
        }
    }, [isFocused]);

    return (
        <div className="flex flex-col items-center justify-center w-full my-8 p-4 bg-neutral-100 dark:bg-neutral-900 rounded-lg">
            <div className="relative" ref={containerRef}>
                <canvas
                    ref={canvasRef}
                    width={640}
                    height={480}
                    className="border border-black max-w-full h-auto cursor-pointer"
                />
            </div>
            <div className="mt-2 text-xs text-neutral-500 font-mono">
                Controls: W, A, S, D to move
            </div>

            {/* Hidden assets - using img tags for canvas texture loading */}
            <div style={{ display: 'none' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img ref={textureRef} src={TEXTURE_WALL} alt="wall" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img ref={floorRef} src={TEXTURE_FLOOR} alt="floor" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img ref={bgRef} src={TEXTURE_BG} alt="bg" />
            </div>
        </div>
    );
}
