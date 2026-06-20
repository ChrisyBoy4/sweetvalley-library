'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '../../supabase';
import Link from 'next/link';

type Book = {
  id: string;
  title: string;
  author: string;
  genre: string;
  age_group: string;
  cover_emoji: string;
  description: string;
};

type Review = {
  id: string;
  reviewer_name: string;
  rating: number;
  comment: string;
  created_at: string;
};

export default function BookDetail() {
  const params = useParams();
  const bookId = params.id as string;

  const [book, setBook] = useState<Book | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  // Form state
  const [reviewerName, setReviewerName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function fetchData() {
    const { data: bookData } = await supabase
      .from('books')
      .select('*')
      .eq('id', bookId)
      .single();

    const { data: reviewData } = await supabase
      .from('reviews')
      .select('*')
      .eq('book_id', bookId)
      .order('created_at', { ascending: false });

    setBook(bookData);
    setReviews(reviewData || []);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, [bookId]);

  async function handleSubmitReview(e: React.FormEvent) {
    e.preventDefault();
    if (!reviewerName.trim() || !comment.trim()) return;

    setSubmitting(true);
    const { error } = await supabase.from('reviews').insert({
      book_id: bookId,
      reviewer_name: reviewerName,
      rating: rating,
      comment: comment,
    });

    if (!error) {
      setReviewerName('');
      setComment('');
      setRating(5);
      fetchData(); // refresh reviews
    }
    setSubmitting(false);
  }

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading book...</div>;
  }

  if (!book) {
    return <div className="p-8 text-center text-gray-500">Book not found.</div>;
  }

  return (
    <main className="min-h-screen bg-yellow-50">
      <header className="bg-blue-700 text-white py-6 px-8">
        <Link href="/" className="text-blue-200 hover:text-white">
          ← Back to all books
        </Link>
      </header>

      <section className="max-w-3xl mx-auto py-10 px-6">
        <div className="bg-white rounded-2xl shadow-md p-6 flex gap-6 items-start">
          <div className="bg-blue-200 rounded-xl h-40 w-32 flex items-center justify-center text-5xl flex-shrink-0">
            {book.cover_emoji}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{book.title}</h1>
            <p className="text-gray-500">{book.author}</p>
            <p className="text-blue-600 text-sm mt-1">
              {book.genre} • Ages {book.age_group}
            </p>
            <p className="text-gray-600 mt-3">{book.description}</p>
          </div>
        </div>

        {/* Reviews */}
        <div className="mt-10">
          <h2 className="text-xl font-bold text-blue-800 mb-4">
            ⭐ Reviews ({reviews.length})
          </h2>

          {reviews.length === 0 && (
            <p className="text-gray-500 mb-6">No reviews yet. Be the first!</p>
          )}

          <div className="space-y-4 mb-8">
            {reviews.map((review) => (
              <div key={review.id} className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold text-gray-800">{review.reviewer_name}</span>
                  <span className="text-yellow-500">{'⭐'.repeat(review.rating)}</span>
                </div>
                <p className="text-gray-600 text-sm">{review.comment}</p>
              </div>
            ))}
          </div>

          {/* Review Form */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-4">Write a Review</h3>
            <form onSubmit={handleSubmitReview} className="space-y-4">
              <input
                type="text"
                placeholder="Your name"
                value={reviewerName}
                onChange={(e) => setReviewerName(e.target.value)}
                className="w-full border-2 border-blue-200 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                required
              />

              <div>
                <label className="block text-sm text-gray-600 mb-1">Rating</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRating(star)}
                      className="text-2xl"
                    >
                      {star <= rating ? '⭐' : '☆'}
                    </button>
                  ))}
                </div>
              </div>

              <textarea
                placeholder="What did you think of this book?"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full border-2 border-blue-200 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                rows={3}
                required
              />

              <button
                type="submit"
                disabled={submitting}
                className="bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-800 disabled:opacity-50"
              >
                {submitting ? 'Submitting...' : 'Submit Review'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}