import React, { useEffect, useState } from "react";
import styles from '../../../styles/table.module.css';

const DebouncedInput = ({
  value: initValue,
  onChange,
  debounce = 500,
  ...props
}) => {
  const [value, setValue] = useState(initValue);

  useEffect(() => {
    setValue(initValue);
  }, [initValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);
    return () => clearTimeout(timeout);
  }, [value, debounce, onChange]);
  
  return (
    <input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className={styles.debouncedInput}
      placeholder="search for transactions..."
    />
  );
};
export default DebouncedInput;


