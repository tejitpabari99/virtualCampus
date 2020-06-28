import React from "react";
import {MuiThemeProvider} from "@material-ui/core/styles";
import Carousel from 'react-material-ui-carousel'
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

function Item(props) {
  const contStyle = containerStyles();
  return (
      <div>props</div>
  )
}

export default function ResourcesFeaturedDesktop() {
  const contStyle = containerStyles();
  return (
    <MuiThemeProvider theme={theme}>
    <Carousel>
        {
            Object.keys(FeaturedData).map(key => {
              let data = FeaturedData[key];
              // console.log(data);
              return (
                  <div style={{overflow:'hidden'}}>
                    <img src={data.img} alt={data.img} height='500px' width='100%' className={contStyle.container}/>
                    <img src={data.img} alt={data.img} height='70.32%' width={'57.3%'} className={contStyle.img}/>
                    <div className={contStyle.card} >
                      <p className={contStyle.category}>
                        {data.category.category
                          .split(' ')
                          .map(function(word) {
                              return word[0].toUpperCase() + word.substr(1);
                          })
                          .join(' ')
                        }

                        <p className={contStyle.title}>
                        {data.title}
                        </p>

                        <p>
                          {data.category.tags.map(ele => {
                            return (
                              <Button disabled className={contStyle.button}>
                                {ele}
                              </Button>
                            )
                          })}
                        </p>

                        <p className={contStyle.description}>
                          <br/>
                          {data.description}
                        </p>

                        <p>
                          <CustomButton text={"Explore"} href={data.links.website}
                            color={"orange"} size={"2.3vw"} style={{marginTop: 15, marginBottom: 25, position:'relative'}}/>
                        </p>

                      </p>

                    </div>
                  </div>
              )

            })
        }
    </Carousel>
    </MuiThemeProvider>
  )
}
