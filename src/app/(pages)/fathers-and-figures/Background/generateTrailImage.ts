/**
 * Creates a single trail image object with a unique ID, positioned at the given (x, y) coordinates
 * Randomly selects an image from the fathersandfigures directory.
 * 
 * @param x - The x-coordinate where the image will be placed.
 * @param y - The y-coordinate where the image will be placed.
 * @returns A trail image object contailing:
 * - id: A unique identifier based on the current timestamp and random number for generating random IDs in a quick timespan
 * - src: The path to a randomly selected background image from the fathersandfigures directory
 * - x: The x-coordinate of the image.
 * - y: THe y-coordinate of the image.
 */


export const generateTrailImage = (x: number, y: number) => ({
    id: Date.now() + Math.random(),
    src: `/fathersandfigures/${Math.floor(Math.random() * 22 + 1)}.jpg`,
    x,
    y
  });