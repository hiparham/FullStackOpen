export default function Total({ exercises }) {
  return (
    <footer>
      <p>
        Total Number of exercises is : {exercises[0] + exercises[1] + exercises[2]}
      </p>
    </footer>
  );
}
