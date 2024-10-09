import ColorThief from "colorthief";

export const getDominantColors = (imageUrl: string): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";

    img.onload = async () => {
      try {
        const colorThief = new ColorThief();
        const palette = colorThief.getPalette(img);
        
        const dominantColors = palette.slice(0, 3).map(color => rgbToHex(color[0], color[1], color[2]));

        resolve(dominantColors);
      } catch (error) {
        reject(new Error("Erro ao extrair a paleta de cores: " + error));
      }
    };

    img.onerror = () => reject(new Error("Falha ao carregar a imagem."));
    img.src = imageUrl;
  });
};

const rgbToHex = (r: number, g: number, b: number): string => {
  return "#" + [r, g, b].map(x => x.toString(16).padStart(2, "0")).join("").toUpperCase();
};
