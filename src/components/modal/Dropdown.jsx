import { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function Dropdown(props) {
  const [age, setAge] = useState("");
  const publicPosting = () => props.setShow(true);
  const privatePosting = () => props.setShow(false);
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 90 }}>
        <Select
          value={age}
          onChange={handleChange}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem value="" onClick={publicPosting}>
            공개
          </MenuItem>
          <MenuItem value={10} onClick={privatePosting}>
            비공개
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
