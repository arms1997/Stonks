import { makeStyles } from "@material-ui/core/styles";

import {
  Card,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    maxWidth: 800,
    marginBottom: 25,
    display: "flex",
    flexDirection: "row",
    textAlign: "left",
  },

  content: {
    justifyContent: "center",
  },

  innerContent: {
    display: "flex",
    flexDirection: "column",
  },

  media: {
    width: 300,
    height: 200,
  },
});

export default function NewsListItem({
  title,
  description,
  image,
  author,
  source,
  url,
  publishedDate,
}) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <CardMedia className={classes.media} image={image} title="test image" />
      </CardContent>
      <div className={classes.innerContent}>
        <CardContent className={classes.content}>
          <Typography gutterBottom variant="h6" component="h2">
            {title}
          </Typography>
          <Typography gutterBottom variant="subtitle1" component="h3">
            {author}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
        <CardContent className={classes.content}>
          <Button size="small" color="primary" href={url}>
            Learn More
          </Button>
        </CardContent>
      </div>
    </Card>
  );
}
