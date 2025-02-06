export default function LogOut({logout}) {
  return (
    <button
      onClick={logout}
      className="py-2 px-10 rounded-md shadow-md cursor-pointer bg-white text-black capitalize"
    >
      Log Out
    </button>
  );
}
