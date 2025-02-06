export default function AddBlogPost({ postAdded }) {
  async function sendPost(e) {
    e.preventDefault();
    try {
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="my-[3rem]">
      <h3 className="font-semibold text-xl">Create A New Post</h3>
      <form onSubmit={sendPost} className="mt-[2rem] flex flex-col gap-[1rem]">
        <input
          required={true}
          type="text"
          placeholder="Title"
          className="py-5 px-3 border rounded-md border-zinc-300 block w-full"
        />
        <input
          required={true}
          type="text"
          placeholder="Author"
          className="py-5 px-3 border rounded-md border-zinc-300 block w-full"
        />
        <input
          required={true}
          type="text"
          placeholder="URL"
          className="py-5 px-3 border rounded-md border-zinc-300 block w-full"
        />
        <button
          type="submit"
          className="bg-sky-500 text-white py-3 rounded-md cursor-pointer"
        >
          Add Blog Post
        </button>
      </form>
    </div>
  );
}
