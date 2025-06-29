"use client";

import { useEffect, useMemo, useState } from "react";
import KeywordInput from "@/components/formComponents/KeywordInput";
/* import { useRouter } from "next/navigation"; */
import dynamic from "next/dynamic";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import axiosInstance from "@/lib/axiosInstance";
import { Category } from "@/types";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

export default function AddBlogPage() {
  /*  const router = useRouter(); */
  //form data states
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  //other states
  const [categories, setCategories] = useState<Category[]>([]);
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
        const file = formData.get("file") as File;
        console.log(file);
        if (file && file.size > 10 * 1024 * 1024) {
          alert("File size exceeds 10MB. Please upload a smaller image.");
          formData.delete("file");
          return; // ⬅️ prevent sending the large file
        }
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
    if (file && file.size > 10 * 1024 * 1024) {
      alert("File size exceeds 10MB. Please upload a smaller image.");
      return; // ⬅️ prevent sending the large file
    }
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
  });

  const toggleCategory = (id: string) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((cat) => cat !== id) : [...prev, id]
    );
  };

  const handleSubmit = async () => {
    if (!title || !content || !imageFile || selectedCategories.length < 1) {
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

    const metaDescription = content.replace(/<[^>]*>/g, "");

    const res = await axiosInstance.post("/api/admin/blog", {
      title,
      content,
      coverImage: imageUrl,
      categories: selectedCategories,
      metaDescription,
      keywords,
    });

    if (res.data.success) {
      alert("Submitted");
      // router.push("/admin/blogs");
      setContent("");
      setSelectedCategories([]);
      setTitle("");
      setImagePreview(null);
      setImageFile(null);
    } else {
      alert("Failed to add blog");
    }

    setLoading(false);
  };

  const getCategories = async () => {
    const res = await axiosInstance.get("/api/categories");

    setCategories(res.data.categories);
  };

  useEffect(() => {
    getCategories();
  }, []);
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

      <div className="flex flex-wrap space-x-3 space-y-3 mb-5">
        {categories.map((cat) => {
          const isSelected = selectedCategories.includes(cat.name);
          return (
            <label
              key={cat.name}
              className={`flex items-center gap-3 border-2 rounded-lg px-4 py-3 cursor-pointer transition h-10
              ${isSelected ? "border-blue-500 bg-blue-50" : "border-gray-300"}`}
            >
              <input
                type="checkbox"
                checked={cat.name === "all" ? true : isSelected}
                onChange={() => toggleCategory(cat.name)}
                className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-0"
                disabled={cat.name === "all"}
              />
              <span className="text-base font-medium text-gray-800">
                {cat.name}
              </span>
            </label>
          );
        })}
      </div>

      <KeywordInput
        keywords={keywords}
        setKeywords={setKeywords}
        className="mb-4"
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
