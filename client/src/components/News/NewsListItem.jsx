
import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles({
  root: {
    maxWidth: 800,
    marginBottom: 25,
    display: "flex",
    flexDirection: "row",
  },

  content: {
    justifyContent: "center",

  },

  innerContent: {
    flexDirection: "column",
  },

  linkContent: {
    flexDirection: "row",
  },

  media: {
    width: 300,
    height: 200,
  },
});


export default function NewsListItem({title, description, image, author, source, url, publishedDate}) {

  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <CardMedia 
          className={classes.media}
          image={image}
          title="test image"
        />
        </CardContent>
        <div className={classes.innerContent}>
          <CardContent className={classes.content}>
            <Typography gutterBottom variant="h6" component="h2">
              {title}
            </Typography>
            <Typography gutterBottom variant="h6" component="h2">
              {author}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {description}
            </Typography>
          </CardContent>
            <CardContent className={classes.content} >
              <div className={classes.linkContent}>
                <Button size="small" color="primary" href={url} >
                  Learn More
                </Button>
                <Typography>
                  {source}
                </Typography>
              </div>
          </CardContent>
        </div>
    </Card> 

  );
}
