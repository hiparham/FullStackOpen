export default function PageWrapper({ children }) {
  return (
    <section className="max-w-screen-md mx-auto w-11/12 py-[5vh]">
      {children}
    </section>
  );
}
