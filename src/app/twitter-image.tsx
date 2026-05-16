/**
 * Twitter card image — same artwork as the OG image.
 * Re-export keeps a single source of truth so the social cards stay
 * visually identical across networks.
 */
export const runtime = 'edge';

export { default, alt, size, contentType } from './opengraph-image';
