"use client";

import { useEffect, useState } from "react";
import { IBook } from "@/types";
import Header from "@/components/Header";
import { useRouter } from "next/navigation";
import { deleteBookInDB, getBookFromDB, putBookInDB } from "@/actions/actions";

function BookPage({ params }: { params: { id: number } }) {
  const [book, setBook] = useState<IBook | null>(null);
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

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (book) {
        await putBookInDB(book);
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      console.log(error);
      setError("Failed to edit book");
    }
  };

  const handleDeleteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (book) {
        await deleteBookInDB(params.id);
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      console.log(error);
      setError("Failed to delete book");
    }
  };

  useEffect(() => {
    const fetchBook = async () => {
      const fetchedBook = await getBookFromDB(params.id);
      if (fetchedBook.data.message == "not found") {
        router.push("/");
      }
      setBook(fetchedBook.data);
    };

    fetchBook();
  }, [params.id, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Header />

      <main className="container mx-auto px-6 py-12">
        <div className="max-w-2xl mx-auto">
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

          {book ? (
            <>
              {/* Page Header */}
              <div className="text-center mb-10">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
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
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </div>
                <h1 className="text-4xl font-bold text-slate-800 mb-2">
                  Edit Book
                </h1>
                <p className="text-slate-600">Update the book information</p>
              </div>

              {/* Edit Form */}
              <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 mb-6">
                <form onSubmit={handleEditSubmit} className="space-y-6">
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

                  {/* Update Button */}
                  <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    Update Book
                  </button>
                </form>
              </div>

              {/* Delete Section */}
              <div className="bg-white rounded-2xl shadow-lg border border-red-200 p-8">
                <div className="text-center mb-6">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg
                      className="w-6 h-6 text-red-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-red-700 mb-2">
                    Danger Zone
                  </h3>
                  <p className="text-slate-600 mb-6">
                    This action cannot be undone. This will permanently delete
                    the book.
                  </p>
                </div>

                <form onSubmit={handleDeleteSubmit}>
                  <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-semibold hover:from-red-600 hover:to-red-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    Delete Book Permanently
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-lg text-slate-600">Loading book details...</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default BookPage;
