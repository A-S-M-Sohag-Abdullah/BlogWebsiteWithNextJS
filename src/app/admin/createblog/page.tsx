"use client";

import { useMemo, useState } from "react";
/* import { useRouter } from "next/navigation"; */
import dynamic from "next/dynamic";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

export default function AddBlogPage() {
  /*  const router = useRouter(); */

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  type CloudinaryUploadResponse = {
    secure_url: string;
    url?: string;
    error?: { message: string };
  };

  type UploadProcessResult = {
    isSuccess: boolean;
    isLink?: boolean;
    base?: string;
    message?: string;
  };

  const editorConfig = useMemo(() => {
    const uploaderConfig = {
      url: `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      filesVariableName: () => "file",
      prepareData(formData: FormData): void {
        formData.append("upload_preset", process.env.NEXT_PUBLIC_UPLOADPRESET!);
      },

      isSuccess(resp: CloudinaryUploadResponse): boolean {
        return !!resp && !resp.error;
      },

      getMessage(resp: CloudinaryUploadResponse): string {
        return resp.error?.message || "";
      },

      process(resp: CloudinaryUploadResponse): UploadProcessResult {
        if (resp && !resp.error) {
          console.log(resp);
          // Insert image logic should be handled by the editor, not here
          return {
            isSuccess: true,
            isLink: true,
            base: resp.secure_url,
          };
        }

        return {
          isSuccess: false,
          message: uploaderConfig.getMessage(resp),
        };
      },
      defaultHandlerSuccess(
        this: { s: { insertImage: (url: string) => void } },
        data: { base?: string }
      ): void {
        if (data.base) {
          this.s.insertImage(data.base);
        }
      },
    };

    return {
      uploader: uploaderConfig,
      style: { color: "#000" },
      removeButtons: ["file"],
    };
  }, []);

  const onDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];

    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
  });

  const handleSubmit = async () => {
    if (!title || !content || !imageFile) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);

    const formdata = new FormData();

    formdata.append("file", imageFile);

    formdata.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_UPLOADPRESET as string
    );

    const data = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formdata,
      }
    ).then((r) => r.json());

    const imageUrl = data.secure_url;

    console.log(data.secure_url);

    const res = await fetch("/api/admin/blog", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content, coverImage: imageUrl }),
    });

    if (res.ok) {
      alert("Submitted");
      /*   router.push("/admin/blogs"); */
    } else {
      alert("Failed to add blog");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Add New Blog</h1>

      <input
        type="text"
        placeholder="Enter blog title"
        className="w-full border p-2 rounded mb-4"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <div
        {...getRootProps()}
        className="border-dashed border-2 border-gray-400 rounded p-4 text-center cursor-pointer mb-4"
      >
        <input {...getInputProps()} />
        {imagePreview ? (
          <Image
            src={imagePreview}
            alt="Cover Preview"
            width={400}
            height={250}
            className="mx-auto rounded"
          />
        ) : (
          <p>Drag & drop cover image here, or click to select</p>
        )}
      </div>

      <JoditEditor
        value={content}
        config={editorConfig}
        onBlur={(newContent) => setContent(newContent)}
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded mt-6 hover:bg-blue-700"
      >
        {loading ? "Submitting..." : "Publish Blog"}
      </button>
    </div>
  );
}
