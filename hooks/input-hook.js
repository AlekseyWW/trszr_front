import { useState } from "react";

export const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    setValue,
    reset: () => setValue(""),
    bind: {
      value,
      onChange: (event) => {
        console.log("sdcsdckasbdvkljsdb", event.target.value);
          
        setValue(event.target.value);
      },
    },
  };
};
