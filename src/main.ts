import Vue from 'vue'
import Component from 'vue-class-component'
import App from './App.vue'
import router from './router'
import store from './store/index'
import service from './utils/https'
import urls from './utils/urls'
import {
  Dialog,
  Form,
  FormItem,
  Input,
  Button,
  Message,
  Menu,
  MenuItem,
  Row,
  Col,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Loading,
  Timeline,
  TimelineItem,
  Card,
  Tag
} from 'element-ui'
import CollapseTransition from "element-ui/lib/transitions/collapse-transition"
import mixin from './mixins'

Vue.mixin(mixin)

Vue.component(Dialog.name, Dialog);
Vue.component(Form.name, Form);
Vue.component(FormItem.name, FormItem);
Vue.component(Input.name, Input);
Vue.component(Button.name, Button);
Vue.component(Message.name, Message);
Vue.component(Menu.name, Menu);
Vue.component(MenuItem.name, MenuItem);
Vue.component(Row.name, Row);
Vue.component(Col.name, Col);
Vue.component(Dropdown.name, Dropdown);
Vue.component(DropdownMenu.name, DropdownMenu);
Vue.component(DropdownItem.name, DropdownItem);
Vue.component(CollapseTransition.name, CollapseTransition);
Vue.component(Timeline.name, Timeline);
Vue.component(TimelineItem.name, TimelineItem);
Vue.component(Card.name, Card);
Vue.component(Tag.name, Tag);
Vue.use(Loading.directive);
Vue.prototype.$message = Message;
Vue.prototype.$loading = Loading.service;

Vue.config.productionTip = false
Vue.prototype.$https = service
Vue.prototype.$urls = urls


Component.registerHooks([
  "beforeRouteEnter",
  "beforeRouteLeave",
  "beforeRouteUpdate"
])
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
