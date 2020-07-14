import React from "react"

import Grid from '@material-ui/core/Grid'
import Button from "@material-ui/core/Button";

const SubmitButton = () => {
  return (
    <div style={{ margin: '30px 0 0 0' }}>
      <Grid container spacing={2} >
        <Grid item sm={4}>
          <Button
            style={{
              background: "white",
              border: "1px solid #FB750D",
              borderRadius: "10px",
              boxSizing: "border-box",
              color: "#FB750D",
              boxShadow: "none",
              width: "100%"
            }}
            type="submit">
            Submit
        </Button>
        </Grid>
      </Grid >
    </div >
  )
}

export default SubmitButton