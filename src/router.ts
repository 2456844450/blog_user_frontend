import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import(/* webpackChunkName: "home" */ "./views/home.vue")
    },
    {
      path: "/articles",
      name: "articles",
      component: () =>
        import(/* webpackChunkName: "articles" */ "./views/articles.vue")
    },
    {
      path: "/archive",
      name: "archive",
      component: () =>
        import(/* webpackChunkName: "archive" */ "./views/archive.vue")
    },
    {
      path: "/timeline",
      name: "timeline",
      component: () =>
        import(/* webpackChunkName: "timeline" */ "./views/timeline.vue")
    },
    {
      path: "/project",
      name: "project",
      component: () =>
        import(/* webpackChunkName: "project" */ "./views/project.vue")
    },
    {
      path: "/message",
      name: "message",
      component: () =>
        import(/* webpackChunkName: "message" */ "./views/message.vue")
    },
    {
      path: "/about",
      name: "about",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/articleDetail.vue")
    },
    {
      path: "/articleDetail",
      name: "articleDetail",
      component: () =>
        import(/* webpackChunkName: "articleDetail" */ "./views/articleDetail.vue")
    },
	{
		path: '/practice',
		name: 'practice',
		component: () => 
			import('./views/practice.vue')
	},
	{
		path: '/practiceDetail',
		name: 'practiceDetail',
		component: () => 
			import('./views/practiceDetail.vue')
	}
  ]
})