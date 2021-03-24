import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 60,
  },
  tablecell: {
    fontSize: '10pt'
},
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
  },
  image: {
    width: 200,
    height: 200,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));

export default function ComplexGrid(props) {
  let { image, name, description,is_featured, is_offer,item_attributes} = props.details
  let {rate}= props
 console.log(image,'image')
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item className={classes.image}>
          <img className={classes.img} alt="complex" src= {`http://localhost:8000/storage/${image}`} />
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
              <Typography variant="body1" gutterBottom>
                  {name}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {'Description: '+ description}
                </Typography>
                <Grid container direction="row">
                  <Typography variant="body2">
                    {is_featured ? 'featured:✔' : ''}
                  </Typography>
                  <Typography variant="body2">
                    {is_offer ? 'offer:✔' : ''}
                  </Typography>
                </Grid>
               
              </Grid>
              <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Size</TableCell>
            <TableCell align="left">Price</TableCell>
            <TableCell align="left">Offer Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {item_attributes.map((row) => (
            <TableRow >
              <TableCell className={classes.tablecell} align="left">{row.bottle_size + ' mL'}</TableCell>
              <TableCell className={classes.tablecell} align="left">{row.price + '$= '+ row.price * rate + ' LBP'}</TableCell>
              <TableCell className={classes.tablecell} align="left">{row.offer_price + '$= '+ row.offer_price * rate + ' LBP'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
