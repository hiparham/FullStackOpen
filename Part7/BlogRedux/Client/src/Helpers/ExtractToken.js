const extractToken = (token) => {
  if (!token) return;
  return `Bearer ${token}`;
};

export default extractToken;
