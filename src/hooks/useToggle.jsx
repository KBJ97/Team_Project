import { useState } from "react";

//모달 등 boolean 값을 toggle로 조절하는 훅
const useToggle = (value) => {
  const [boolean, setBoolean] = useState(value);
  const toggleHandler = () => { 
    setBoolean(prev=>!prev)
  }
  return [boolean, toggleHandler];
}
 
export default useToggle;