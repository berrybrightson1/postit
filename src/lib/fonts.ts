export const GOOGLE_FONTS = Array.from(new Set([
    "Inter", "Roboto", "Open Sans", "Lato", "Montserrat", "Playfair Display", "Oswald", "Raleway", "Merriweather", "Noto Sans",
    "Poppins", "Ubuntu", "Roboto Mono", "Space Grotesk", "Outfit", "Bebas Neue", "Lora", "Source Sans Pro", "PT Sans", "Josefin Sans",
    "Quicksand", "Dancing Script", "Pacifico", "Caveat", "Shadows Into Light", "Abril Fatface", "Arvo", "Exo 2", "Bitter", "Kanit",
    "Titillium Web", "Dosis", "Comfortaa", "Cairo", "Fira Sans", "Inconsolata", "Barlow", "Assistant", "Crimson Text", "Work Sans",
    "Libre Baskerville", "Anton", "Archivo", "Muli", "Maven Pro", "Hind", "Rajdhani", "Teko", "Nanum Gothic", "Heebo",
    "Karla", "Spectral", "Cormorant Garamond", "Cinzel", "Cardo", "Josefin Slab", "Old Standard TT", "Zilla Slab", "Passion One", "Righteous",
    "Bangers", "Patua One", "Fredoka One", "Alfa Slab One", "Luckiest Guy", "Orbitron", "Press Start 2P", "Special Elite", "Alegreya", "Source Serif Pro",
    "DM Sans", "Public Sans", "Space Mono", "JetBrains Mono", "IBM Plex Sans", "IBM Plex Mono", "Manrope", "Sen", "Syne", "Urbanist",
    "Fraunces", "Epilogue", "Mulish", "Be Vietnam Pro", "Plus Jakarta Sans", "Readex Pro", "Outfit", "Lexend", "Space Grotesk", "Cabinet Grotesque",
    "Sora", "Schibsted Grotesk", "Gloock", "Instrument Serif", "Young Serif", "Hanken Grotesk", "Figtree", "Onest", "Golos Text", "Unbounded",
    "Bricolage Grotesque", "Rethink Sans", "Lalezar", "Vazirmatn", "Tiptoe", "Gugi", "Gaegu", "Yeon Sung", "East Sea Dokdo", "Sunflower",
    "Black Han Sans", "Dokdo", "Gamja Flower", "Hi Melody", "Jua", "Kirang Haerang", "Poor Story", "Song Myung", "Stylish", "Nanum Myeongjo",
    "Nanum Pen Script", "Nanum Brush Script", "Bagel Fat One", "Moirai One", "Nabla", "Rubik Burned", "Rubik Distressed", "Rubik Glitch", "Rubik Puddles", "Rubik Wet Paint",
    "Honk", "Madimi One", "Jersey 10", "Jersey 15", "Jersey 20", "Jersey 25", "Jersey 10 Charted", "Jersey 15 Charted", "Jersey 20 Charted", "Jersey 25 Charted",
    "Tiny5", "Jacquarda Bastarda 9", "Jacquard 12", "Jacquard 24", "Micro 5", "Platypi", "Danfo", "Rowdies", "Rubik Scribble", "Bungee Spice",
    "Bungee Hairline", "Bungee Outline", "Bungee Shade", "Silkscreen", "Pixelify Sans", "DotGothic16", "VT323", "Courier Prime", "Major Mono Display", "Staatliches",
    "Teko", "Chakra Petch", "Khand", "Tallu", "Saira", "Bai Jamjuree", "Mitr", "Pridi", "Prompt", "Sarabun",
    "Taviraj", "Trirong", "Itim", "Mali", "Srisakdi", "Charm", "Charmonman", "Krub", "KoHo", "Kodchasan",
    "Fahkwang", "Chonburi", "Savy", "Anek Devanagari", "Anek Gujarati", "Anek Kannada", "Anek Malayalam", "Anek Odia", "Anek Tamil", "Anek Telugu"
])).sort();

export const isStandardFont = (font: string) => {
    return ['Inter', 'Playfair Display', 'Space Grotesk', 'Outfit', 'Bebas Neue'].includes(font);
};
