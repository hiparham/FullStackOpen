export default function FormNotification({ notif }: { notif: string }) {
  if (!notif) return null;
  return (
    <p className="text-red-500 py-[1rem] capitalize">
      {notif} Missing Or Wrong
    </p>
  );
}
