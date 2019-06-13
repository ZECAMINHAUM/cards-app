import React from 'react';

import {
  withStyles,
  Card,
  CardHeader,
  Avatar,
  IconButton,
  CardMedia,
  CardContent,
  Typography,
  Menu,
  MenuItem,
} from '@material-ui/core';

import MoreVertIcon from '@material-ui/icons/MoreVert';

import styles from './styles';

const CardItem = ({
  data, user, classes, image,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={(
          <Avatar className={classes.avatar} title={user.name}>
            {user.name.charAt(0)}
          </Avatar>
)}
        action={(
          <div>
            <IconButton onClick={handleClick}>
              <MoreVertIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
              <MenuItem onClick={handleClose}>Editar</MenuItem>
              <MenuItem onClick={handleClose}>Excluir</MenuItem>
            </Menu>
          </div>
)}
        subheader={new Date(data.date).toLocaleString('pt-BR')}
        title={user.name}
      />
      {image ? (
        <CardMedia className={classes.media} image={image} title={data.title} />
      ) : data.image ? (
        <CardMedia className={classes.media} image={`api/${data.image}`} title={data.title} />
      ) : (
        <CardMedia
          className={classes.media}
          image="http://media.buzzle.com/media/images-en/photos/mammals/foxes/1200-43438902-red-fox.jpg"
          title={data.title}
        />
      )}

      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {data.title}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {data.description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default withStyles(styles, { withTheme: true })(CardItem);
