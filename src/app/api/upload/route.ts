/* import { NextRequest, NextResponse } from 'next/server';
import { cloudinary } from '@/lib/cloudinary';
import formidable, { IncomingForm, File as FormidableFile, Files } from 'formidable';
import fs from 'fs'; */

export const config = {
  api: {
    bodyParser: false,
  },
};

/* const parseForm = (req: any): Promise<{ files: Files }> => {
  const form = new IncomingForm({ keepExtensions: true });

  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ files });
    });
  });
}; */

/* export async function POST(req: NextRequest) {
  try {
    const { files } = await parseForm(req);

    const imageFile = files.image as FormidableFile | FormidableFile[];

    const file = Array.isArray(imageFile) ? imageFile[0] : imageFile;

    if (!file?.filepath) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const result = await cloudinary.uploader.upload(file.filepath, {
      folder: 'blog-images',
    });

    return NextResponse.json({ url: result.secure_url });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
} */
