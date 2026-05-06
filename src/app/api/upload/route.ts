import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { uploadFile, ALLOWED_IMAGE_TYPES, MAX_IMAGE_SIZE_BYTES } from '@/lib/storage';

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get('file');

  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'Nessun file caricato' }, { status: 400 });
  }

  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return NextResponse.json(
      { error: 'Tipo file non supportato. Usa JPG, PNG, WebP o AVIF.' },
      { status: 400 },
    );
  }

  if (file.size > MAX_IMAGE_SIZE_BYTES) {
    return NextResponse.json({ error: 'File troppo grande. Massimo 5MB.' }, { status: 400 });
  }

  const prefix = `users/${session.user.id}`;
  const { url, key } = await uploadFile(file, prefix);

  return NextResponse.json({ success: true, url, key });
}
