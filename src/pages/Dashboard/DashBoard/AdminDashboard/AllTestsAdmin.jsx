import useTests from "../../../../hooks/useTests";

const AllTestsAdmin = () => {
  const [tests] = useTests();
  console.log(tests);
  return <div>{tests.length}</div>;
};

export default AllTestsAdmin;
