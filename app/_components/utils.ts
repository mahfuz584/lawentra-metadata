'use server';

import { updateTag } from 'next/cache';

export const updateByTag = async (tag: string) => {
  return updateTag(tag);
};
