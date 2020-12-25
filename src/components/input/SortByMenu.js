import React from 'react';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
   // backgroundColor: "red",
    textAlign: "left"
  }/*,
  paper: {
    marginRight: theme.spacing(2),
  },*/
}));

const useStylesDefaultLook = makeStyles((theme) => ({
  root: {
    textTransform: "capitalize",
    fontFamily: "Poppins",
    fontSize: "16px",
    //lineHeight: "24px",
    borderColor: "#0072CE",
    borderRadius: "5px",
    borderStyle: "solid",
    borderWidth: "1px",
    height: "39px",
    width: "100%",
    textAlign: "left",
    color: "rgba(0, 0, 0, 0.5)",
    //paddingRight: "50%"
  }
  
}));

const useStylesMenuItems = makeStyles((theme) => ({
  root: {
    fontFamily: "Poppins",
    fontSize: "16px",
    lineHeight: "24px"
    
    
  }
  
}));


/*const useStyles = makeStyles((theme) => ({
  outerDiv: {
  root: {
    display: 'flex',
    backgroundColor: "red"
  }
},
  defaultButton: {
    root: {
      textTransform: "capitalize",
      fontFamily: "Poppins",
      fontSize: "16px",
      lineHeight: "24px",
      borderColor: "#0072CE",
      borderRadius: "5px",
      borderStyle: "solid",
      borderWidth: "1px",
      height: "39px",
      width: "100%",
      textAlign: "left",
      color: "rgba(0, 0, 0, 0.5)",
      backgroundColor: "red"
    }
  },
  menuItems: {
    root: {
      fontFamily: "Poppins",
      fontSize: "16px",
      lineHeight: "24px"
      
      
    }
  },
  fullMenu: {
    root: {
    
    
    }
  }

}));   */

function SwitchIcon(props) {
  if (props.isOpen) {
    return (
      <ExpandLessIcon />
      );
  }
  else {
    return (
      <ExpandMoreIcon />
    );
  }
  
}

 //adapted from Materials UI dropdown menu example
export default function SortByMenu(props) {
  const classes = useStyles();
  const classesDefaultLook = useStylesDefaultLook();
  const classesMenuItems = useStylesMenuItems();
  
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
    props.onChange(1);
   
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) { 
      return;
    }
   props.onChange(event.target.id);
    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
      
    }
  }


  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);


  return (
    
      
      <div className={classes.root}>
        
        <Button
          ref={anchorRef}
          className={classesDefaultLook.root}
          onClick={handleToggle}
          
        >
          <div style={{alignItems: "center", width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
          <div>Sort By</div>
            <div style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
              <SwitchIcon isOpen={open} />
            </div>
          </div>
        </Button>
        
        
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper >
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList  autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
          <MenuItem id={2} className={classesMenuItems.root} onClick={handleClose}>Alphabetical</MenuItem>
                    <MenuItem id={3} className={classesMenuItems.root} onClick={handleClose}>Popularity</MenuItem>
                    <MenuItem id={4} className={classesMenuItems.root} onClick={handleClose}>Recently Added</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    
  );
}

