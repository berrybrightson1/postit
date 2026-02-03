export async function extractColorsFromImage(imageSrc: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            if (!ctx) {
                resolve([]);
                return;
            }

            // Resize for faster processing
            const maxDimension = 100;
            const scale = Math.min(maxDimension / img.width, maxDimension / img.height);
            canvas.width = img.width * scale;
            canvas.height = img.height * scale;

            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            try {
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
                const colorCounts: Record<string, number> = {};

                for (let i = 0; i < imageData.length; i += 4) {
                    const r = imageData[i];
                    const g = imageData[i + 1];
                    const b = imageData[i + 2];
                    const a = imageData[i + 3];

                    // Skip transparent and very dark/light pixels
                    if (a < 128) continue;
                    if (r < 20 && g < 20 && b < 20) continue; // Too black
                    if (r > 240 && g > 240 && b > 240) continue; // Too white

                    // Quantize colors to reduce noise (round to nearest 32)
                    const qR = Math.round(r / 32) * 32;
                    const qG = Math.round(g / 32) * 32;
                    const qB = Math.round(b / 32) * 32;

                    const rgb = `${qR},${qG},${qB}`;
                    colorCounts[rgb] = (colorCounts[rgb] || 0) + 1;
                }

                // Sort by frequency
                const sortedColors = Object.entries(colorCounts)
                    .sort(([, a], [, b]) => b - a)
                    .map(([rgb]) => {
                        const [r, g, b] = rgb.split(',').map(Number);
                        return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
                    });

                // Return top 5 unique-ish colors
                resolve(sortedColors.slice(0, 5));
            } catch (e) {
                console.error("Color extraction failed", e);
                resolve([]);
            }
        };
        img.onerror = reject;
        img.src = imageSrc;
    });
}
