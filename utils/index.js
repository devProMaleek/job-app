export const setImageURL = (url) => {
  if (!url) {
    return 'https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqz05H.jpg';
  } else {
    // const pattern = new RegExp('^https?:\\/\\/.+\\.(png|jpg|jpeg|gif|webp)$', 'i')
    return url;
  }
};
