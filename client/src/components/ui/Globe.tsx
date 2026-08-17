import { useEffect, useRef } from "react";
import createGlobe from "cobe";
import { useTheme } from "next-themes";

export default function Globe() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const pointerInteracting = useRef<number | null>(null);
    const pointerInteractionMovement = useRef(0);
    const { theme } = useTheme();

    useEffect(() => {
        let phi = 0;
        let width = 0;
        let currentTheta = 0;

        const onResize = () => {
            if (canvasRef.current) {
                width = canvasRef.current.offsetWidth;
            }
        };
        window.addEventListener("resize", onResize);
        onResize();

        if (!canvasRef.current) return;

        const isDark = theme === "dark";

        const globe = createGlobe(canvasRef.current, {
            devicePixelRatio: 2,
            width: width * 2,
            height: width * 2,
            phi: 0,
            theta: 0.1,
            dark: isDark ? 1 : 0,
            diffuse: 1.2,
            mapSamples: 16000,
            mapBrightness: 6,
            baseColor: [0.95, 0.95, 0.95],
            markerColor: [0.898, 0.122, 0.180], // Burgundy/Red accent
            glowColor: [1, 1, 1],
            offset: [0, 0],
            markers: [
                { location: [7.9465, -1.0232], size: 0.05 }, // Ghana
                { location: [13.4432, -15.3101], size: 0.05 }, // Gambia
                { location: [8.4606, -11.7799], size: 0.05 }, // Sierra Leone
                { location: [12.2383, -1.5616], size: 0.05 }, // Burkina Faso
                { location: [7.54, -5.5471], size: 0.05 }, // Côte d'Ivoire
                { location: [-11.2027, 17.8739], size: 0.05 }, // Angola
                { location: [31.2407, 36.5118], size: 0.05 }, // Jordan
                { location: [26.8206, 30.8025], size: 0.05 }, // Egypt
                { location: [34.8021, 38.9968], size: 0.05 }, // Syria
                { location: [12.8628, 30.2176], size: 0.05 }, // Sudan
                { location: [23.8859, 45.0792], size: 0.06 }, // Saudi Arabia
            ],
            onRender: (state) => {
                if (pointerInteracting.current === null) {
                    phi += 0.005;
                }
                state.phi = phi + pointerInteractionMovement.current;
                state.theta = currentTheta;
            },
        });

        return () => {
            globe.destroy();
            window.removeEventListener("resize", onResize);
        };
    }, [theme]);

    return (
        <div
            className="w-full max-w-[600px] aspect-square mx-auto relative flex items-center justify-center"
        >
            <canvas
                ref={canvasRef}
                onPointerDown={(e) => {
                    pointerInteracting.current =
                        e.clientX - pointerInteractionMovement.current;
                    if (canvasRef.current) {
                        canvasRef.current.style.cursor = "grabbing";
                    }
                }}
                onPointerUp={() => {
                    pointerInteracting.current = null;
                    if (canvasRef.current) {
                        canvasRef.current.style.cursor = "grab";
                    }
                }}
                onPointerOut={() => {
                    pointerInteracting.current = null;
                    if (canvasRef.current) {
                        canvasRef.current.style.cursor = "grab";
                    }
                }}
                onMouseMove={(e) => {
                    if (pointerInteracting.current !== null) {
                        const delta = e.clientX - pointerInteracting.current;
                        pointerInteractionMovement.current = delta * 0.01;
                    }
                }}
                onTouchMove={(e) => {
                    if (pointerInteracting.current !== null && e.touches[0]) {
                        const delta = e.touches[0].clientX - pointerInteracting.current;
                        pointerInteractionMovement.current = delta * 0.01;
                    }
                }}
                style={{
                    width: "100%",
                    height: "100%",
                    cursor: "grab",
                    contain: "layout paint size",
                    opacity: 1,
                    transition: "opacity 1s ease",
                }}
            />
        </div>
    );
}
