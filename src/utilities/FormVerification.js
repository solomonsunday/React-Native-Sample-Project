const re = {
  email: /\S+@\S+\.\S+/,
  password: /\S+/,
  required: /\S+/,
};

export const verifyWithCaption = (term, type) => {
  if (re[type].test(term)) {
    return {
      status: 'success',
      caption: 'Good!',
    };
  }
  return {
    status: 'danger',
    caption: 'Format is invalid!',
  };
};

export const verifyWithoutCaption = (term, type) => {
  if (re[type].test(term)) {
    return {
      status: 'success',
    };
  }
  return {
    status: 'danger',
  };
};
