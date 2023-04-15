import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Box,
} from "@mui/material";

const Post = () => {


  //cria a página
  return (
    <Box flex={10} p={{ xs: 0, md: 11 }} minHeight="900px">
    <Card sx={{ margin: 1 }} >
      <CardContent>
      <Typography color="danger" align="center" variant="h3" gutterBottom>
        Você não tem acesso a esta página, por favor não insista
      </Typography>
      </CardContent>
      <CardActions disableSpacing>
      </CardActions>
    </Card>
    </Box>
  );

};

export default Post;
