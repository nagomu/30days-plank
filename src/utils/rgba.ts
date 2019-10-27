const rgba = (color: string, alpha: number): string => {
  const match = color.match(/#(([a-f0-9]{6})|([a-f0-9]{3}))$/i);
  if (!match) {
    throw new Error(`${color} is not a color`);
  }

  const ensure16Digit = (hex: string): string => {
    if (hex.length === 6) {
      return hex;
    }
    return hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  };

  const hex = ensure16Digit(match[1]);
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export default rgba;
