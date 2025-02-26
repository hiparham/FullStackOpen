export default function Notification({ notif }) {
  if (!notif) return null;
  return (
    <div className="text-white bg-emerald-500 text-center py-2 px-1 rounded-md mb-[2rem] fixed top-[10vh] w-11/12 max-w-[35rem] mx-auto left-0 right-0">
      New Book {notif} Added!!
    </div>
  );
}
