import React from "react";
import {MuiThemeProvider} from "@material-ui/core/styles";
import { Carousel } from 'react-responsive-carousel'
import Button from "../../material-kit-components/CustomButtons/Button.js";

import {makeStyles} from "@material-ui/core/styles";
import Data from "../../../assets/ResourcesData";
import {CustomTheme, CustomButton} from "../..";
const FeaturedData = Data.FeaturedData;
const theme = CustomTheme;


const containerStyles = makeStyles(() => ({
  container: {
    position: 'relative',
    display: 'block',
    background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4))',
    filter: 'blur(15px) contrast(125%) brightness(75%)',
  },
  img: {
    position: 'absolute',
    left: '37.26%',
    top: '11.91%',
    objectFit: 'cover',
  },
  card: {
    position: 'absolute',
    left: '5.3%',
    right: '62.74%',
    top: '11.91%',
    bottom: '17.75%',
    background: '#FFFFFF',
  },
  category: {
    position: 'absolute',
    left: '7.55%',
    right: '7.55%',
    top: '7.81%',
    bottom: '77.93%',
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '1.2vw',
    lineHeight: '30px',
    color: '#000000'
  },
  title: {
    position: 'relative',
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '2vw',
    lineHeight: 'vh',
    color: '#0072CE'
  },
  button: {
    background: 'rgba(255, 255, 255, 0.85)',
    position: 'relative',
    marginLeft: '3%',
    bottom: '42.65%',
    borderRadius: '5px',
    zIndex: 10,
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '11px',
    lineHeight: '15px',
    textAlign: 'center',
  },
  description: {
    position: 'relative',
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 'vw',
    lineHeight: '18px',
    color: '#000000'
  },
}));

export default function ResourcesFeaturedDesktop() {
  let Carousel = require('react-responsive-carousel').Carousel;
  const contStyle = containerStyles();
  return (
    <MuiThemeProvider theme={theme}>
    <Carousel>
        <div>
                    <img src="assets/1.jpeg" />
                    <p className="legend">Legend 1</p>
                </div>
                <div>
                    <img src="assets/2.jpeg" />
                    <p className="legend">Legend 2</p>
                </div>
                <div>
                    <img src="assets/3.jpeg" />
                    <p className="legend">Legend 3</p>
                </div>
                <div>
                    <img src="assets/4.jpeg" />
                    <p className="legend">Legend 4</p>
                </div>
                <div>
                    <img src="assets/5.jpeg" />
                    <p className="legend">Legend 5</p>
                </div>
                <div>
                    <img src="assets/6.jpeg" />
                    <p className="legend">Legend 6</p>
                </div>
    </Carousel>
    </MuiThemeProvider>
  )
}
