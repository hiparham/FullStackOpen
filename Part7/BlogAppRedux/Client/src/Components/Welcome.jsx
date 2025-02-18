export default function Welcome({ userInfo }) {
  if (!userInfo) return null;
  return <h1 className="text-2xl text-blue-700">Hello {userInfo}</h1>;
}
