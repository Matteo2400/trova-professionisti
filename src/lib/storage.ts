import { put, del } from '@vercel/blob';
import { writeFile, mkdir, unlink } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

const BLOB_TOKEN = process.env.BLOB_READ_WRITE_TOKEN;

export interface UploadResult {
  url: string;
  key: string; // Used to delete the file later.
}

/**
 * Upload a file to cloud storage in production (Vercel Blob),
 * or to public/uploads/ in dev (when no token is set).
 */
export async function uploadFile(file: File, prefix = 'uploads'): Promise<UploadResult> {
  const ext = (file.name.split('.').pop() || 'bin').toLowerCase().replace(/[^a-z0-9]/g, '');
  const filename = `${uuidv4()}.${ext}`;
  const pathname = `${prefix}/${filename}`;

  if (BLOB_TOKEN) {
    const blob = await put(pathname, file, {
      access: 'public',
      token: BLOB_TOKEN,
      addRandomSuffix: false,
      contentType: file.type,
    });
    return { url: blob.url, key: pathname };
  }

  // Dev fallback: write to public/uploads.
  const buffer = Buffer.from(await file.arrayBuffer());
  const dir = join(process.cwd(), 'public', prefix);
  await mkdir(dir, { recursive: true });
  await writeFile(join(dir, filename), buffer);
  return { url: `/${prefix}/${filename}`, key: pathname };
}

export async function deleteFile(key: string): Promise<void> {
  if (BLOB_TOKEN) {
    try {
      await del(key, { token: BLOB_TOKEN });
    } catch (err) {
      console.warn('Blob delete failed:', err);
    }
    return;
  }
  try {
    await unlink(join(process.cwd(), 'public', key));
  } catch {
    // file may not exist; ignore
  }
}

export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/avif'];
export const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB
