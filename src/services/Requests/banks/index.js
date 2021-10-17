import React, { useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { getEmail, getToken } from '../../../api/index';
import { baseUrl } from '../index';

const { CancelToken } = axios;

const source = CancelToken.source();

//Globus Bank Requests

export const createGlobusAccount = async (form) => {
  //   console.log('from create Globus', form);

  const maritalStatusValues = {
    Single: 'UNMAR',
    Divorced: 'DIVOR',
    Married: 'MARR',
    Widow: 'WIDOW',
    Widower: 'WIDOWR',
    'Legally Separated': 'LEGSP',
    'Live-in Relationship': 'LIVTO',
  };

  const data = {
    salutation: form.title,
    firstname: form.firstName,
    middlename: form.middleName,
    lastname: form.lastName,
    bvn: form.bvn,
    streetName: form.street,
    city: form.lga,
    state: form.state,
    dob: form.dob,
    sex: form.gender.split('')[0],
    postalCode: form.postalCode,
    phoneNo: form.mobileNumber,
    email: form.email,
    maritalstatus: maritalStatusValues[form.maritalStatus],
  };

  const token = await getToken();

  const config = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token,
    },
    data: JSON.stringify(data),
    url: `${baseUrl}banks/globusbank/AccountOpening`,
  };

  console.log(JSON.stringify(data));

  let res;

  try {
    res = await axios(config);
    return res;
  } catch (error) {
    console.log(error);
  }
};
