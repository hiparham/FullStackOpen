export default function Container({ children }) {
  return (
    <section className="container">
      <h1>Give Feedback | Unicafe</h1>
      <div>{children}</div>
    </section>
  );
}
