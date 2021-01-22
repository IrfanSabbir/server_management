import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  button: {
    display: "block",
    marginTop: theme.spacing(2)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  }
}));

export default function ControlledOpenSelect(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

 
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div style={{textAlign:"right"}}>
      
      <FormControl className={classes.formControl}>
        <InputLabel id="open-select-label">Server type</InputLabel><br/>
        <Select
          labelId="open-select-label"
          id="open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={props.routeProvider}
          onChange={(event)=>props.getServers(event.target.value)}
          style={{fontSize:"20px", textAlign:"left"}}
        >
          <MenuItem value="">
            <em>all server</em>
          </MenuItem>
          <MenuItem value="vultr" style={{fontSize:"20px", textAlign:"left"}}>Vultr</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
