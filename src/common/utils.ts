import * as bcrypt from 'bcryptjs';

export async function validatePasswordHash(
  password: string | undefined,
  hash: string | undefined,
): Promise<boolean> {
  if (!password || !hash) {
    return Promise.resolve(false);
  }
  return await bcrypt.compareSync(password, hash);
}

export function trimPipe(value: string): string {
  if (typeof value === 'string') {
    return value.replace(/ /g, '');
  }
}
