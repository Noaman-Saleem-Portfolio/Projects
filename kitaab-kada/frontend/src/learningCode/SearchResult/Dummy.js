import React from "react";
import { useSearchParams } from "react-router-dom";

const Dummy = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const abc = useSearchParams();
  console.log(abc[0].get("name"));
  const x = searchParams.get("name");
  console.log(x);
  return <div>Dummy</div>;
};

export default Dummy;
