import React from 'react';
import classNames from "classnames";
import { makeStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import TextInfoContent from '@mui-treasury/components/content/textInfo';
import { useFourThreeCardMediaStyles } from '@mui-treasury/styles/cardMedia/fourThree';
import { useN04TextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/n04';
import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over';

import Button from './material-kit-components/CustomButtons/Button.js';

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 280,
    margin: 'auto',
    borderRadius: 12,
    padding: 12,
  },
  media: {
    borderRadius: 6,
  },
}));

const WebCard = (props) => {
  const {imageURL, title, developer, description, btnText } = props;
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
      <CardContent className={styles.content}>
        <TextInfoContent
          classes={textCardContentStyles}
          overline={developer}
          heading={title}
          body={description}
        />
      </CardContent>
      <div style={{textAlign:"center"}}>
        <Button color="vcColor" round>{btnText}</Button>
      </div>
    </Card>
  );
};

export default WebCard;