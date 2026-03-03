import { RootRoute, Route, Router} from '@tanstack/react-router';
import App from "../App";
import { HomePage } from "../pages/HomePage";
import { AboutPage } from "../pages/AboutPage";
import { ProductPage } from '../pages/ProductPage';
import CartPage from '../pages/CartPage';
import { ContactPage } from '../pages/ContactPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { SuccessfulPage } from '../pages/SuccessfulPage';

const rootRoute = new RootRoute({
    component: App
});

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/', 
  component: HomePage,
})

const aboutRoute = new Route({
    getParentRoute: () => rootRoute,
    path: 'about',
    component: AboutPage,
});

export const productRoute = new Route({
    getParentRoute: () => rootRoute,
    path: '/products/$productId',
    component: ProductPage,
});

export const cartRoute = new Route ({
    getParentRoute: () => rootRoute,
    path: '/cart',
    component: CartPage
})

export const contactRoute = new Route ({
    getParentRoute: () => rootRoute,
    path: '/contact',
    component: ContactPage
})

export const checkoutRoute = new Route ({
    getParentRoute: () => rootRoute,
    path: '/checkout',
    component: CheckoutPage
})

export const successfulRoute = new Route ({
    getParentRoute: () => rootRoute,
    path: '/successful',
    component: SuccessfulPage

})

const routeTree = rootRoute.addChildren([
    indexRoute,
    aboutRoute,
    productRoute,
    cartRoute,
    contactRoute,
    checkoutRoute,
    successfulRoute
]);



// Create the router instance
export const router = new Router({ routeTree });


//All these files, imported functions should be here?
// is Router.jsx inside component logically correct?
// Explain with your own words what you are doing