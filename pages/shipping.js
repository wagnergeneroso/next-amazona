import {
  Button,
  Link,
  List,
  ListItem,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useContext, useEffect } from 'react';
import Layout from './components/Layout';
import useStyles from './utils/styles';
import NextLink from 'next/link';
import axios from 'axios';
import { Store } from './utils/Store';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { useSnackbar } from 'notistack';
import { Controller, useForm } from 'react-hook-form';
import CheckoutWizard from './components/checkoutWizard';

export default function Shipping() {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { state, dispatch } = useContext(Store);
  const {
    userInfo,
    cart: { shippingAddress },
  } = state;
  const router = useRouter();
  const { redirect } = router.query;
  useEffect(() => {
    if (!userInfo) {
      router.push('/login?redirect=/shipping');
    } else {
      setValue('fullName', shippingAddress.fullName);
      setValue('address', shippingAddress.address);
      setValue('city', shippingAddress.city);
      setValue('postalCode', shippingAddress.postalCode);
      setValue('country', shippingAddress.country);
    }
  }, []);
  const classes = useStyles();
  const submitHandler = ({ fullName, address, city, postalCode, country }) => {
    const data = { fullName, address, city, postalCode, country };
    dispatch({ type: 'SAVE_SHIPPING_ADDRESS', payload: data });
    Cookies.set('shippingAddress', JSON.stringify(data));
    router.push(redirect || '/payment');
  };

  return (
    <Layout title="Shipping">
      <CheckoutWizard activeStep={1} />
      <form onSubmit={handleSubmit(submitHandler)} className={classes.form}>
        <Typography components="h1" variant="h1">
          Shipping Address
        </Typography>
        <List>
          <ListItem>
            <Controller
              name="fullName"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 10,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="fullName"
                  label="Full Name"
                  inputProps={{ type: 'text' }}
                  error={Boolean(errors.fullName)}
                  helperText={
                    errors.fullName
                      ? errors.fullName.type === 'minLength'
                        ? 'Full Name is not valid'
                        : 'Full Name is required'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Controller
              name="address"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 2,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="address"
                  label="Address"
                  inputProps={{ type: 'text' }}
                  error={Boolean(errors.address)}
                  helperText={
                    errors.address
                      ? errors.address.type === 'minLength'
                        ? 'Address is not valid'
                        : 'Address is required'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Controller
              name="city"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 2,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="city"
                  label="City"
                  inputProps={{ type: 'text' }}
                  error={Boolean(errors.address)}
                  helperText={
                    errors.city
                      ? errors.city.type === 'minLength'
                        ? 'City is not valid'
                        : 'City is required'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Controller
              name="postalCode"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 2,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="postalCode"
                  label="Postal Code"
                  inputProps={{ type: 'text' }}
                  error={Boolean(errors.postalCode)}
                  helperText={
                    errors.postalCode
                      ? errors.postalCode.type === 'minLength'
                        ? 'Postal Code is not valid'
                        : 'Postal Code is required'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Controller
              name="country"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 2,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="country"
                  label="Country"
                  inputProps={{ type: 'text' }}
                  error={Boolean(errors.country)}
                  helperText={
                    errors.country
                      ? errors.country.type === 'minLength'
                        ? 'Country is not valid'
                        : 'Country Code is required'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Button variant="contained" type="submit" fullWidth color="primary">
              Continue
            </Button>
          </ListItem>
        </List>
      </form>
    </Layout>
  );
}
