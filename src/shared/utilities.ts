export const logBanner = (lines: string[]) => {
  const border = '='.repeat(60);
  const centerText = (text: string) => {
    const totalWidth = 60;
    const padding = Math.floor((totalWidth - text.length) / 2);
    return ' '.repeat(padding) + text;
  };

  console.error('\n' + border);
  lines.forEach((line) => console.error(centerText(line)));
  console.error(border + '\n');
};
