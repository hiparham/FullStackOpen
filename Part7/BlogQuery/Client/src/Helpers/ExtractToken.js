const extractToken = () => {
  const token = JSON.parse(localStorage.getItem("BlogAuth"))?.token || "";
  if (!token) return;
  return `Bearer ${token}`;
};

export default extractToken;
