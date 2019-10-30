import { Archive } from '~/store/archive';

export const mergeArchives = (
  state: Archive[],
  payload: Archive[],
): Archive[] => {
  const mergedArchives: Archive[] = [];

  const isAlreadyAdded = (id: string): boolean =>
    !!mergedArchives.find(m => !!m.id && m.id === id);

  [...state, ...payload].forEach(archive => {
    if (isAlreadyAdded(archive.id)) return;
    mergedArchives.push(archive);
  });

  return mergedArchives;
};
