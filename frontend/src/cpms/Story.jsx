import { useEffect } from "react";
export function Story() {
  useEffect(() => {
    console.log("useEffect");
  }, []);
  return (
    <div>
      {" "}
      <h1>Posts</h1>
      <h1>Posts</h1>
      <h1>Posts</h1>
      <h1>Posts</h1>
      <h1>Posts</h1>
      <h1>Posts</h1>
      <h1>Posts</h1>
      <h1>Posts</h1>
      <h1>Posts</h1>
      <h1>Posts</h1>
      <h1>Posts</h1>
      <h1>Posts</h1>
      <h1>Posts</h1>{" "}
    </div>
  );
}
