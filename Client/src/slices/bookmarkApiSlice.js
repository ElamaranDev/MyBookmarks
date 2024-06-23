import { apiSlice } from "./apiSlice";

const BOOKMARK_URL = "/api/users/bookmarks";

export const bookmarkApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBookmarks: builder.query({
      query: () => ({
        url: BOOKMARK_URL,
        method: "GET",
      }),
      providesTags: ["Bookmarks"],
    }),
    getBookmarkById: builder.query({
      query: (id) => ({
        url: `${BOOKMARK_URL}/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Bookmarks", id }],
    }),
    addBookmark: builder.mutation({
      query: (newBookmark) => ({
        url: BOOKMARK_URL,
        method: "POST",
        body: newBookmark,
      }),
      invalidatesTags: ["Bookmarks"],
    }),
    updateBookmark: builder.mutation({
      query: ({ id, updatedBookmark }) => ({
        url: `${BOOKMARK_URL}/${id}`,
        method: "PUT",
        body: updatedBookmark,
      }),
      invalidatesTags: ["Bookmarks"],
    }),
    deleteBookmark: builder.mutation({
      query: (id) => ({
        url: `${BOOKMARK_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Bookmarks"],
    }),
  }),
});

export const {
  useGetBookmarksQuery,
  useGetBookmarkByIdQuery,
  useAddBookmarkMutation,
  useUpdateBookmarkMutation,
  useDeleteBookmarkMutation,
} = bookmarkApiSlice;
