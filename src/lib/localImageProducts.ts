import type { Product } from '../types/product';

type ImageEntry = {
  displayPrefix: string;
  key: string;
  index: number;
  url: string;
};

const imageModules = import.meta.glob('../../Images/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', {
  eager: true,
  query: '?url',
  import: 'default',
});

const normalizeKey = (value: string) => value.toLowerCase().replace(/[^a-z0-9]/g, '');

const toTitle = (value: string) => {
  const readableValue = value
    .replace(/bagtag/gi, 'bag tag')
    .replace(/keychain/gi, 'keychain')
    .replace(/pothanger/gi, 'pot hanger')
    .replace(/wallhanger/gi, 'wall hanger')
    .replace(/tieback/gi, 'tie back')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[_-]+/g, ' ');

  return readableValue
    .split(' ')
    .filter(Boolean)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

const toSlug = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const imageEntries = Object.entries(imageModules).reduce<ImageEntry[]>((entries, [path, url]) => {
  const filename = path.split('/').pop() ?? '';
  const match = filename.match(/^(.+?)[_-]?([0-9]+)\.(jpe?g|png|webp)$/i);

  if (!match) {
    return entries;
  }

  entries.push({
    displayPrefix: match[1],
    key: normalizeKey(match[1]),
    index: Number(match[2]),
    url: String(url),
  });

  return entries;
}, []);

const groupedImages = imageEntries.reduce<Record<string, ImageEntry[]>>((groups, entry) => {
  groups[entry.key] = [...(groups[entry.key] ?? []), entry];
  return groups;
}, {});

export const localImageProducts: Product[] = Object.values(groupedImages)
  .map(entries => {
    const sortedEntries = entries.sort((a, b) => a.index - b.index);
    const images = sortedEntries.map(entry => entry.url);
    const name = toTitle(sortedEntries[0].displayPrefix);
    const slug = toSlug(name);

    return {
      id: slug,
      slug,
      name,
      category: name,
      description: `Handwoven macramé ${name.toLowerCase()} made with care for gifting, decor, and special occasions.`,
      price: 0,
      images,
      featured: sortedEntries.some(entry => entry.index === 1),
      created_at: '',
      imageUrl: images[0],
    };
  })
  .sort((a, b) => a.name.localeCompare(b.name));
