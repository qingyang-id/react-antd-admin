// Elf 混合配置(有参数)

export const size = (width, height) => ({
  width,
  height,
});

export const fS = fontSize => ({
  'font-size': fontSize,
});

// hotcss方法: 转换px到rem
const designWidth = 640;

export const px2rem = px => ({
  'font-size': `${px * 320 / designWidth / 20}rem`,
});

// flex 居中混合
export const flexCenter = () => ({
  display: 'flex',
  'align-items': 'center',
  'justify-content': 'center',
});
