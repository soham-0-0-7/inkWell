import { IBook } from "@/types";
import Link from "next/link";

function BookCard({ book }: { book: IBook }) {
  return (
    <div className="group relative bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-300">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative p-6">
        {/* Book icon */}
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mb-4">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
        </div>

        {/* Content */}
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-slate-800 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
            {book.title}
          </h3>

          <p className="text-slate-600 font-medium">by {book.author}</p>

          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-emerald-600">
              ${book.price}
            </span>

            <Link href={`/${book.id}`}>
              <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-sm">
                View Details
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookCard;
