export default function Total({ exercises }) {

  return (
    <footer>
      <p>
        Total Number of exercises is : {exercises[0].exercises + exercises[1].exercises + exercises[2].exercises}
      </p>
    </footer>
  );
}
