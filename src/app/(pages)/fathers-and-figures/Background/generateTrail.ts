


export const generateTrail = (x: number, y: number) => ({
    id: Date.now() + Math.random(),
    src: `/fathersandfigures/${Math.floor(Math.random() * 22 + 1)}.jpg`,
    x,
    y
  });