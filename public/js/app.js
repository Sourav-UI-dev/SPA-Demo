window.addEventListener('load', () => {
  const el = $('#app');

  // Compile Handlebar Templates
  const errorTemplate = Handlebars.compile($('#error-template').html());
  const homeTemplate = Handlebars.compile($('#home').html());

  // Instantiate api handler
  const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    timeout: 5000,
  });

  const router = new Router({
    mode: 'history',
    page404: (path) => {
      const html = errorTemplate({
        color: 'yellow',
        title: 'Error 404 - Page NOT Found!',
        message: `The path '/${path}' does not exist on this site`,
      });
      el.html(html);
    },
  });

  // Display Error Banner
  const showError = (error) => {
    const { title, message } = error.response.data;
    const html = errorTemplate({ color: 'red', title, message });
    el.html(html);
  };

  // Display Latest products
  router.add('/', async () => {
    // Display loader first
    let html = homeTemplate();
    el.html(html);
    try {
      const response = [{
        ProductName: 'Coombes',
        ProductImage: '../assets/homepage_image.jpeg',
        Category: 'LOUNGE',
        Price: 2600,
        Rating: 4
      },
      {
        ProductName: 'Keeve Set',
        ProductImage: '../assets/download1.jpg',
        Category: 'TABLE & CHAIR',
        Price: 590,
        Rating: 4
      },
      {
        ProductName: 'Nille',
        ProductImage: '../assets/download.jpg',
        Category: 'CHAIR',
        Price: 450,
        Rating: 4
      }, {
        ProductName: 'Momo',
        ProductImage: '../assets/homepage_image.jpeg',
        Category: 'SHELVES',
        Price: 890,
        Rating: 4
      }, {
        ProductName: 'Penemille',
        ProductImage: '../assets/istockphoto-968086564-612x612.jpg',
        Category: 'CHAIR',
        Price: 120,
        Rating: 4
      }, {
        ProductName: 'Kappu',
        ProductImage: '../assets/homepage_image.jpeg',
        Category: 'SHELVES',
        Price: 400,
        Rating: 4
      }, {
        ProductName: 'Coombes',
        ProductImage: '../assets/images1.jpg',
        Category: 'BED',
        Price: 2600,
        Rating: 4
      }, {
        ProductName: 'Coombes',
        ProductImage: '../assets/images2.jpg',
        Category: 'BED',
        Price: 5400,
        Rating: 4
      }, {
        ProductName: 'Nille',
        ProductImage: '../assets/royal-wing-chair-in-blue-color-by-dreamzz-furniture-royal-wing-chair-in-blue-color-by-dreamzz-furnit-6hcjya.webp',
        Category: 'CHAIR',
        Price: 2600,
        Rating: 4
      }];

      html = homeTemplate({ response });
      el.html(html);
      $('.loading').removeClass('loading');
    } catch (error) {
      showError(error);
    }
  });

  router.navigateTo(window.location.pathname);

  // Highlight Active Menu on Load
  const link = $(`a[href$='${window.location.pathname}']`);
  link.addClass('active');

  $('a').on('click', (event) => {
    // Block page load
    event.preventDefault();

    // Highlight Active Menu on Click
    const target = $(event.target);
    $('.item').removeClass('active');
    target.addClass('active');

    // Navigate to clicked url
    const href = target.attr('href');
    const path = href.substr(href.lastIndexOf('/'));
    router.navigateTo(path);
  });
});
