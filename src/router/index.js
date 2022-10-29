import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/views/HelloWorld'
import Login from '@/views/Login-client'
// import Login from '@/components/loginRegister'
import Register from '@/views/client/Register-client'
import Home from '@/views/client/Home-client'
import RePassword from '@/views/client/Retrieve-password-client'
import PersonalMsg from '@/views/client/PersonalMsg'
import purchaseNav from '@/views/client/Purchase_nav'
import Search from '@/views/client/Search_details'
import Shopping_cart from '@/views/client/Shopping_cart'
import Logoff from '@/views/client/Logoff-client'
import Favorites from '@/views/client/Favorites'
import Pro_datails from '@/views/client/Product-details-client'
import Settlement from '@/views/client/Settlement'
import Order from '@/views/client/Order-client'
import Order_list from '@/views/client/Orderlist-client'
import Contact_us from '@/views/client/Contact-us-client'
import About_client from '@/views/client/About-client'
import Activity_client from '@/views/client/Activity-client'
import Activity_details from '@/views/client/Activity_details'
import Comments_client from '@/views/client/Comments-client'

// 服务端
import Home_service from '@/views/service/home-service'
import Store_service from "../views/service/Store_service";
import RetrieveOrder_service from "../views/service/RetrieveOrder_service";
import product_msg_manage from "../views/service/product_msg_manage";
import OrderDetails_service from "../views/service/OrderDetails_service";
import Product_type_manage from '../views/service/product_type_manage'
import Activity_manage_service from '../views/service/Activity-manage-service'
import Activity_status_manage from '../views/service/Activity_status_manage'
import User_manage_Service from '../views/service/User_manage_Service'
import SaleData_service from '../views/service/SaleData-service'




Vue.use(Router)
const VueRouterPush = Router.prototype.push
Router.prototype.push = function push (to) {
  return VueRouterPush.call(this, to).catch(err => err)
}



export default new Router({
  mode:"hash",
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },

    // 客户端
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/rePassword',
      name: 'RePassword',
      component: RePassword
    },
    {
      path: '/logoff',
      name: 'Logoff',
      component: Logoff
    },
    {
      path: '/personalMsg',
      name: 'personalMsg',
      component: PersonalMsg
    },
    {
      path: '/purchaseNav',
      name: 'purchaseNav',
      component: purchaseNav
    },
    {
      path: '/search',
      name: 'Search_details',
      component: Search
    },
    {
      path: '/shopping_cart',
      name: 'shopping_cart',
      component: Shopping_cart
    },
    {
      path: '/favorites',
      name: 'Favorites',
      component: Favorites
    },
    {
      path: '/pro_datails',
      name: 'Pro_datails',
      component: Pro_datails
    },
    {
      path: '/settlement',
      name: 'Settlement',
      component: Settlement
    },
    {
      path: '/order',
      name: 'Order',
      component: Order
    },
    {
      path: '/order_list',
      name: 'Order_list',
      component: Order_list
    },
    {
      path: '/contact_us',
      name: 'contact_us',
      component: Contact_us
    },
    {
      path: '/about_client',
      name: 'About_client',
      component: About_client
    },
    {
      path: '/comments',
      name: 'comments',
      component: Comments_client
    },
    {
      path: '/activity_details',
      name: 'Activity_details',
      component: Activity_details
    },
    {
      path: '/activity_client',
      name: 'activity_client',
      component: Activity_client
    },

    // 服务端
    {
      path: '/home_service',
      name: 'Home_service',
      component: Home_service
    },
    {
      path: '/store_service',
      name: 'store_service',
      component: Store_service
    },
    {
      path: '/retrieveOrder_service',
      name: 'retrieveOrder_service',
      component: RetrieveOrder_service
    },
    {
      path: '/product_msg_manage',
      name: 'product_msg_manage',
      component: product_msg_manage
    },
    {
      path: '/orderDetails_service',
      name: 'orderDetails_service',
      component: OrderDetails_service
    },
    {
      path: '/product_type_manage',
      name: 'Product_type_manage',
      component: Product_type_manage
    },
    {
      path: '/activity_manage_service',
      name: 'Activity_manage_service',
      component: Activity_manage_service
    },
    {
      path: '/activity_status_manage',
      name: 'Activity_status_manage',
      component: Activity_status_manage
    },
    {
      path: '/user_manage_service',
      name: 'User_manage_Service',
      component: User_manage_Service
    },
    {
      path: '/saleData_service',
      name: 'SaleData_service',
      component: SaleData_service
    },


  ]
})
