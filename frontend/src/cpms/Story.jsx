import { useEffect } from "react";
export function Story() {
  useEffect(() => {
    console.log("useEffect");
  }, []);
  return (
    <div>
      {" "}
     
    </div>
  );
}
