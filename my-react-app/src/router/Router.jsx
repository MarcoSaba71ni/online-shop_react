import { RootRoute, Route, Router} from '@tanstack/react-router';
import App from "../App";
import { HomePage } from "../pages/HomePage";
import { AboutPage } from "../pages/AboutPage";
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';


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

const routeTree = rootRoute.addChildren([
    indexRoute,
    aboutRoute,
    productRoute,
    cartRoute
]);



// Create the router instance
export const router = new Router({ routeTree });


//All these files, imported functions should be here?
// is Router.jsx inside component logically correct?
// Explain with your own words what you are doing