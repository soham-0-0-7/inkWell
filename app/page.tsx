import { getBooks } from "@/actions/data";
import BookCard from "@/components/BookCard";
import Header from "@/components/Header";
import { IBook } from "@/types";

export const dynamic = "force-dynamic";

export default async function Home() {
  const books: IBook[] = (await getBooks()).data;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Header />

      <main className="container mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-slate-800 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Discover Amazing Books
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Dive into our curated collection of literary treasures
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {books.map((book, idx) => (
            <div
              key={idx}
              className="transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <BookCard book={book} />
            </div>
          ))}
        </div>

        {books.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-2xl font-semibold text-slate-700 mb-2">
              No books found
            </h3>
            <p className="text-slate-500">
              Check back later for new additions to our collection
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
