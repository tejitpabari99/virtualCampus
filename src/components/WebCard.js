import React from 'react';
import classNames from "classnames";
import { makeStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import TextInfoContent from './mui-treasury-components/textInfo';
import { useFourThreeCardMediaStyles } from '../assets/mui-treasury-assets/styles/cardMedia/fourThree';
import { useN04TextInfoContentStyles } from '../assets/mui-treasury-assets/styles/textInfoContent/n04';
import { useOverShadowStyles } from '../assets/mui-treasury-assets/styles/shadow/over';

import Button from './material-kit-components/CustomButtons/Button.js';

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: "20rem",
    margin: 'auto',
    borderRadius: 12,
    padding: 12,
  },
  media: {
    borderRadius: 6,
  },
}));

const WebCard = (props) => {
  const {imageURL, title, developer, description, btnText, tag, btnID } = props;
  const styles = useStyles();
  const mediaStyles = useFourThreeCardMediaStyles();
  const textCardContentStyles = useN04TextInfoContentStyles();
  const shadowStyles = useOverShadowStyles({ inactive: true });
  return (
    <Card className={classNames(styles.root, shadowStyles.root)}>
      <CardMedia
        className={classNames(styles.media, mediaStyles.root)}
        image={imageURL}
      />
      <CardContent>
        <TextInfoContent
          classes={textCardContentStyles}
          heading={title}
          body={description}
          style={{borderWidth: 1, borderColor: 'black'}}
        />
      </CardContent>
      <div style={{textAlign:"center", borderRadius: 6}}>
        <Button color="vcColor" href={'/covid-resources/'+btnID} >{btnText}</Button>
      </div>
      {
        tag && (
          <div style={{display: 'inline-block', marginTop: 10}}>
            <Button round
                    style={{display: 'inline-block', padding:7, paddingLeft: 13,
                      paddingRight: 13, backgroundColor:'#EFEFEF', margin:5, elevation:"None", boxShadow:"None"
                    }}>Tag2</Button>
            <Button round
                    style={{display: 'inline-block', padding:7, paddingLeft: 13,
                      paddingRight: 13, backgroundColor:'#EFEFEF', margin:5, elevation:"None", boxShadow:"None"
                    }}>Tag2</Button>
            <Button round
                    style={{display: 'inline-block', padding:7, paddingLeft: 13,
                      paddingRight: 13, backgroundColor:'#EFEFEF', margin:5, elevation:"None", boxShadow:"None"
                    }}>Tag2</Button>
            <Button round
                    style={{display: 'inline-block', padding:7, paddingLeft: 13, color:'blue',
                      paddingRight: 13, backgroundColor:'#EFEFEF', margin:5, elevation:"None", boxShadow:"None"
                    }}>More...</Button>
          </div>
        )
      }
    </Card>
  );
};

export default WebCard;