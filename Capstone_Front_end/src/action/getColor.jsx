const draw = function (img) {
	let canvas = document.createElement('canvas');
	let c = canvas.getContext('2d');
	c.width = canvas.width = img.clientWidth;
	c.height = canvas.height = img.clientHeight;
	c.clearRect(0, 0, c.width, c.height);
	c.drawImage(img, 0, 0, img.clientWidth, img.clientHeight);
	return c;
};

// scompone pixel per pixel e ritorna un oggetto con una mappa della loro frequenza nell'immagine
const getColors = function (c) {
	let col,
		colors = {};
	let pixels, r, g, b, a;
	r = g = b = a = 0;
	pixels = c.getImageData(0, 0, c.width, c.height);
	for (let i = 0, data = pixels.data; i < data.length; i += 4) {
		r = data[i];
		g = data[i + 1];
		b = data[i + 2];
		a = data[i + 3];
		if (a < 255 / 2 || isTooLight(r, g, b)) continue;
		col = `${r}, ${g}, ${b}`;
		if (!colors[col]) colors[col] = 0;
		colors[col]++;
	}
	return colors;
};

// Funzione per determinare se un colore è troppo chiaro
const isTooLight = function (r, g, b) {
	const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
	return luminance > 0.9;
};

// trova il colore più ricorrente data una mappa di frequenza dei colori
const findMostRecurrentColor = function (colorMap) {
	let highestValue = 0;
	let mostRecurrent = null;
	for (const hexColor in colorMap) {
		if (colorMap[hexColor] > highestValue) {
			mostRecurrent = hexColor;
			highestValue = colorMap[hexColor];
		}
	}
	return mostRecurrent;
};

// converte un valore in rgb a un valore esadecimale
const rgbToHex = function (r, g, b) {
	if (r > 255 || g > 255 || b > 255) {
		throw 'Invalid color component';
	} else {
		return ((r << 16) | (g << 8) | b).toString(16);
	}
};

export const start = (img) => {
	// prendo il riferimento all'immagine del dom

	let imgReference = img;

	// creo il context 2d dell'immagine selezionata
	let context = draw(imgReference);

	// creo la mappa dei colori più ricorrenti nell'immagine
	let allColors = getColors(context);

	// trovo colore più ricorrente in esadecimale
	let mostRecurrent = findMostRecurrentColor(allColors);
	return mostRecurrent;
};
