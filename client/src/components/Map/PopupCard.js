import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ChatTwoToneIcon from "@material-ui/icons/ChatTwoTone";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  medium: {
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
}));

export default function PopupCardAlert(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      {props.time_created && (
        <CardHeader
          avatar={
            <Avatar
              aria-label="recipe"
              alt=""
              src={props.user_photo}
              className={classes.large}
            />
          }
          action={
            <IconButton>
              <ChatTwoToneIcon className={classes.medium}></ChatTwoToneIcon>
            </IconButton>
          }
          title={`${props.user_first_name} ${props.user_last_name}`}
          subheader={`Posted ${moment(props.time_created).fromNow()}`}
        />
      )}
      {props.member_since && (
        <CardHeader
          avatar={
            <Avatar
              aria-label="recipe"
              alt=""
              src={props.user_photo}
              className={classes.large}
            />
          }
          action={
            <IconButton>
              <ChatTwoToneIcon className={classes.medium}></ChatTwoToneIcon>
            </IconButton>
          }
          title={`${props.user_first_name} ${props.user_last_name}`}
          subheader={`Member since ${moment(props.member_since).format("LL")}`}
        />
      )}
      {props.event_time && props.event_date && (
        <Typography variant="body2" color="textSecondary" component="p">
          {props.event_date.slice(0, 10)} {props.event_time.slice(0, 2) + "h"}
        </Typography>
      )}
      {props.post_title && (
        <Typography variant="body2" color="textSecondary" component="p">
          {props.post_title}
        </Typography>
      )}
      {props.post_photo && (
        <CardMedia
          className={classes.media}
          image={`${props.post_photo}`}
          title="Photo"
        />
      )}
      <CardContent>
        {props.event_start && (
          <Typography variant="body2" color="textSecondary" component="p">
            {props.event_start}
          </Typography>
        )}
        <Typography variant="body2" color="textSecondary" component="p">
          {props.post_description}
        </Typography>
      </CardContent>
    </Card>
  );
}
