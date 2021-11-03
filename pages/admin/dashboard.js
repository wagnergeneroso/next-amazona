import React, { useContext, useEffect, useReducer } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { Store } from '../utils/Store';
import Layout from '../components/Layout';
import useStyles from '../utils/styles';
import NextLink from 'next/link';
import { getError } from '../utils/error';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
  Typography,
  Grid,
  Button,
  Card,
  List,
  ListItem,
  CircularProgress,
  ListItemText,
  CardContent,
  CardActions,
} from '@material-ui/core';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, summary: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      state;
  }
}

function AdminDashboard() {
  const classes = useStyles();
  const { state } = useContext(Store);
  const { userInfo } = state;
  const [{ loading, error, summary }, dispatch] = useReducer(reducer, {
    loading: true,
    summary: { salesData: [] },
    error: '',
  });
  const router = useRouter();
  useEffect(() => {
    if (!userInfo) {
      router.push('/login');
    }
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/admin/summary`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    fetchData();
  }, []);
  return (
    <Layout title=" History">
      <Grid container spacing={1}>
        <Grid item md={3} xs={12}>
          <Card className={classes.section}>
            <List>
              <NextLink href="/admin/dashboard" passHref>
                <ListItem selected button component="a">
                  <ListItemText primary="Admin Dashboard"></ListItemText>
                </ListItem>
              </NextLink>
              <NextLink href="/admin/orders" passHref>
                <ListItem button component="a">
                  <ListItemText primary="Orders"></ListItemText>
                </ListItem>
              </NextLink>
              <NextLink href="/admin/products" passHref>
                <ListItem button component="a">
                  <ListItemText primary="Products"></ListItemText>
                </ListItem>
              </NextLink>
              <NextLink href="/admin/users" passHref>
                <ListItem button component="a">
                  <ListItemText primary="Users"></ListItemText>
                </ListItem>
              </NextLink>
            </List>
          </Card>
        </Grid>
        <Grid item md={9} xs={12}>
          <Card className={classes.section}>
            <List>
              <ListItem>
                {loading ? (
                  <CircularProgress />
                ) : error ? (
                  <Typography className={classes.error}>{error}</Typography>
                ) : (
                  <Grid container spacing={5}>
                    <Grid item md={3}>
                      <Card raised>
                        <CardContent>
                          <Typography variant="h1">
                            $ {summary.ordersPrice}
                          </Typography>
                          <Typography variant="h1">Sales</Typography>
                        </CardContent>
                        <CardActions>
                          <NextLink
                            href="/admin/orders"
                            color="primary"
                            passHref
                          >
                            <Button size="small" color="primary">
                              View Sales
                            </Button>
                          </NextLink>
                        </CardActions>
                      </Card>
                    </Grid>
                    <Grid item md={3}>
                      <Card raised>
                        <CardContent>
                          <Typography variant="h1">
                            {summary.ordersCount}
                          </Typography>
                          <Typography variant="h1">Orders</Typography>
                        </CardContent>
                        <CardActions>
                          <NextLink
                            href="/admin/orders"
                            color="primary"
                            passHref
                          >
                            <Button size="small" color="primary">
                              View Orders
                            </Button>
                          </NextLink>
                        </CardActions>
                      </Card>
                    </Grid>
                    <Grid item md={3}>
                      <Card raised>
                        <CardContent>
                          <Typography variant="h1">
                            {summary.productsCount}
                          </Typography>
                          <Typography variant="h1">Products</Typography>
                        </CardContent>
                        <CardActions>
                          <NextLink
                            href="/admin/products"
                            color="primary"
                            passHref
                          >
                            <Button size="small" color="primary">
                              View Products
                            </Button>
                          </NextLink>
                        </CardActions>
                      </Card>
                    </Grid>
                    <Grid item md={3}>
                      <Card raised>
                        <CardContent>
                          <Typography variant="h1">
                            {summary.usersCount}
                          </Typography>
                          <Typography variant="h1">Users</Typography>
                        </CardContent>
                        <CardActions>
                          <NextLink
                            href="/admin/users"
                            color="primary"
                            passHref
                          >
                            <Button size="small" color="primary">
                              View Users
                            </Button>
                          </NextLink>
                        </CardActions>
                      </Card>
                    </Grid>
                  </Grid>
                )}
              </ListItem>
              <ListItem>
                <Typography component="h2" variant="h2">
                  Sales Chart
                </Typography>
              </ListItem>
              <ListItem>
                <Bar
                  data={{
                    labels: summary.salesData.map((x) => x._id),
                    datasets: [
                      {
                        label: 'Sales',
                        backgroundColor: 'rgba(162, 222, 208, 1)',
                        data: summary.salesData.map((x) => x.totalSales),
                      },
                    ],
                  }}
                  options={{
                    legend: { display: true, position: 'right' },
                  }}
                ></Bar>
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(AdminDashboard), { ssr: false });
