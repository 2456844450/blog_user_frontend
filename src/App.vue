<template>
  <div id="app"
	class="container">
	<Nav v-if="isShowNav" />
	<div class="layout">
		<router-view />
		<Slider v-if="isShowSlider"></Slider>
	</div>
	<ArrowUp></ArrowUp>
	<footer v-show="isShowNav"></footer>
  </div>
</template>

<script lang="ts">
import { Vue, Watch } from "vue-property-decorator";
import Component from "vue-class-component"
import { Route } from "vue-router"
import Nav from "@/components/nav.vue"
import Slider from "@/components/slider.vue"
import Footer from "@/components/footer.vue"
import ArrowUp from "@/components/arrowUp.vue"
import { isMobileOrPc } from "@/utils/utils"
// 如果是移动端   先获取窗口的宽度    改变字体大小  
if (isMobileOrPc()) {
	let width = window.screen.width
	window.document.getElementsByTagName("html")[0].style.fontSize =
		width / 7.5 + "px"
}

@Component({
	components: {
		Nav,
		Slider,
		ArrowUp,
		Footer
	}
})

export default class App extends Vue {
  private isShowNav: boolean = false
  private isShowSlider: boolean = false
  mounted(): void {
	  this.routeChange(this.$route, this.$route)
  }
  @Watch("$route")
  routeChange(val: Route, oldVal: Route): void {
	  const referrer: any = document.getElementById("referrer")
	  if (val.path === "/" || val.path === '/practiceDetail') {
		  this.isShowNav = false
		  referrer.setAttribute("content", "always")
	  } else {
		  this.isShowNav = true
		  referrer.setAttribute("content", "never")
	  }
	  if (
		val.path === "/articles" ||
		val.path === "/archive" ||
		val.path === "/project" ||
		val.path === "/timeline" ||
		val.path === "/message"
		) {
			this.isShowSlider = true 
		} else {
			this.isShowSlider = false
		}
	  if(isMobileOrPc()) {
		  this.isShowSlider = false
	  }
  }
}
</script>

<style>
@import url("./less/index.less");
@import url("./less/mobile.less");
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  width: 1200px;
  margin: 0 auto;
  padding-top: 61px;
}

img {
	vertical-align: bottom;
}
</style>
