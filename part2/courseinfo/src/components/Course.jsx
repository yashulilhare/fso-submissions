const Header = ({ course }) => {
  return <h1>{course}</h1>;
};

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};
const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part) => {
        return <Part part={part} key={part.id} />;
      })}
    </>
  );
};

const Total = ({ parts }) => {
  const total = parts.reduce((acc,curr) => acc + curr.exercises,0)
  return (
    <p><b>total of {total} exercises</b></p>
  );
};

const Course =({course}) => {
  return (
    <section id={course.id}>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </section>
  )
}

export default Course;