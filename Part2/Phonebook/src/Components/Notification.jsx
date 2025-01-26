export default function Notification({ notif }) {
  if (!notif) {
    return null;
  }
  return <p className={`${notif.type==='error'?'text-red-500':'text-emerald-400'} text-center font-semibold text-2xl`}>{notif.message}</p>;
}
