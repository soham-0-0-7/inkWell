"use client";

import { putBookInDB } from "@/actions/actions";
import Header from "@/components/Header";
import { IBook } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";

function AddPage() {
  const [book, setBook] = useState<IBook>({
    id: Math.floor(1000 + Math.random() * 9000),
    title: "",
    author: "",
    price: 0,
    description: "",
  });
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (book) {
      const newBook: IBook = {
        ...book,
        [name]: name === "price" ? parseFloat(value) : value,
      };
      setBook(newBook);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await putBookInDB(book);
      router.push("/");
      router.refresh();
    } catch (error) {
      console.log(error);
      setError("Failed to add book");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Header />

      <main className="container mx-auto px-6 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-slate-800 mb-2">
              Add New Book
            </h1>
            <p className="text-slate-600">
              Share a great read with the community
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-xl">
              <div className="flex items-center space-x-2">
                <svg
                  className="w-5 h-5 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
                <span className="text-red-700 font-medium">{error}</span>
              </div>
            </div>
          )}

          {/* Form */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-semibold text-slate-700 mb-2"
                >
                  Book Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={book.title}
                  onChange={handleChange}
                  placeholder="Enter the book title"
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50 hover:bg-white"
                  required
                />
              </div>

              {/* Author */}
              <div>
                <label
                  htmlFor="author"
                  className="block text-sm font-semibold text-slate-700 mb-2"
                >
                  Author
                </label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  value={book.author}
                  onChange={handleChange}
                  placeholder="Enter the author's name"
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50 hover:bg-white"
                  required
                />
              </div>

              {/* Price */}
              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-semibold text-slate-700 mb-2"
                >
                  Price
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500 font-medium">
                    $
                  </span>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    step="0.01"
                    value={book.price}
                    onChange={handleChange}
                    placeholder="0.00"
                    className="w-full pl-8 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50 hover:bg-white"
                    required
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-semibold text-slate-700 mb-2"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={book.description}
                  onChange={handleChange}
                  placeholder="Tell us about this book..."
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50 hover:bg-white resize-none"
                  rows={4}
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Add Book to Library
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AddPage;
