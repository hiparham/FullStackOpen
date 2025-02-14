import { useSelector } from "react-redux";
export default function Notification() {
  const notif = useSelector((state) => state.Notification);
  if (!notif) return null;
  return (
    <p
      style={{
        color:
          notif.type === "success"
            ? "green"
            : notif.type === "alert"
            ? "red"
            : "blue",
      }}
    >
      {notif.text}
    </p>
  );
}
