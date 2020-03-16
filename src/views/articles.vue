<template>
  <div class="left clearfix">
    <h3 v-if="params.tag_id"
        class="left-title">{{tag_name}} 相关的文章：</h3>
    <ul class="articles-list"
        id="list">
      <transition-group name="el-fade-in">
        <li @click="articleDetail(article._id)"
            v-for="(article) in articlesList"
            :key="article._id"
            class="item">
          <a :href="href + article._id"
              target="_blank">
            <img class="wrap-img img-blur-done"
                :data-src="article.img_url"
                data-has-lazy-src="false"
                src="../assets/bg.jpg"
                alt="文章封面" />
            <div class="content">
              <h4 class="title">{{article.title}}</h4>
              <p class="abstract">{{article.desc}}</p>
              <div class="meta">
                <span>查看 {{article.meta.views}}</span>
                <span>评论 {{article.meta.comments}}</span>
                <span>赞 {{article.meta.likes}}</span>
                <span v-if="article.create_time"
                      class="time">
                  {{formatTime(article.create_time)}}
                </span>
              </div>
            </div>
          </a>
        </li>
      </transition-group>
    </ul>
    <LoadingCustom v-if="isLoading"></LoadingCustom>
    <LoadEnd v-if="isLoadEnd"></LoadEnd>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { Route } from 'vue-router'
import {
  throttle,
  getScrollTop,
  getDocumentHeight,
  getWindowHeight,
  getQueryStringByName,
  timestampToTime
} from '@/utils/utils'
import LoadEnd from '@/components/loadEnd.vue'
import LoadingCustom from '@/components/loading.vue'
import { ArticlesParams, ArticlesData } from '@/types/index' 


const viewHeight = window.innerHeight || document.documentElement.clientHeight;

const lazyload = throttle(() => {
  const imgs = document.querySelectorAll("#list .item img")

  let num = 0;
  for (let i = num; i < imgs.length; i++) {
    let distanace = viewHeight - imgs[i].getBoundingClientRect().top;
    let imgItem: any = imgs[i]
    if (distanace >= 100) {
      let hasLaySrc = imgItem.getAttribute('data-has-lazy-src')
      if (hasLaySrc === 'false') {
        imgItem.src = imgItem.getAttribute("data-src")
        imgItem.setAttribute('data-has-lazy-src', 'true')
      }

      num = i + 1
    }
  }
}, 1000)

@Component({
  components: {
    LoadEnd,
    LoadingCustom
  }
})
export default class Articles extends Vue {
  private isLoadEnd: boolean = false;
  private isLoading: boolean = false;
  private articlesList: Array<object> = [];
  private total: number = 0;
  private tag_name: string = decodeURI(getQueryStringByName('tag_name'))
  private params: ArticlesParams = {
    keyword: "",
    likes: "",
    state: 1,
    tag_id: getQueryStringByName("tag_id"),
    category_id: getQueryStringByName("category_id"),
    pageNum: 1,
    pageSize: 10
  };
  private href: string = 
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:8080/articleDetail?article_id='
      : 'http://123.57.35.115/articleDetail?article_id='


  mounted(): void {
    this.handleSearch();
    window.onscroll = () => {
      if (getScrollTop() + getWindowHeight() > getDocumentHeight() - 150) {
        if (this.isLoadEnd === false && this.isLoading === false) {
          this.handleSearch()
        }
      }
    };
    document.addEventListener('scroll', lazyload)
  }

  @Watch("$route")
  routeChange(val: Route, oldVal: Route): void {
    this.tag_name = decodeURI(getQueryStringByName("tag_name"));
    this.params.tag_id = getQueryStringByName("tag_id");
    this.params.category_id = getQueryStringByName("category_id");
    this.articlesList = [];
    this.params.pageNum = 1;
    this.handleSearch();
  }

  private articleDetail(id: string): void {

  }
  

  private async handleSearch(): Promise<void> {
    // console.log(this.params)
    this.isLoading = true;
    const data: ArticlesData = await this.$https.get(
      this.$urls.getArticleList,
      {
        params: this.params
      }
    )
    // console.log(data)
    this.isLoading = false;
    this.articlesList = [...this.articlesList, ...data.list]
    this.total = data.count;
    this.params.pageNum++;
    this.$nextTick(() => {
      lazyload()
    })
    if (data.list.length === 0 || this.total === this.articlesList.length) {
      this.isLoadEnd = true;
      document.removeEventListener("scroll", () => {})
      window.onscroll = null
    }
  }
}
</script>

<style lang="less" scoped>
.left {
  .articles-list {
    margin: 0;
    padding: 0;
    list-style: none;
    .title {
      color: #333;
      margin: 7px 0 4px;
      display: inherit;
      font-size: 18px;
      font-weight: 700;
      line-height: 1.5;
    }
    .item > div {
      padding-right: 140px;
    }
    .item .wrap-img {
      position: absolute;
      top: 50%;
      margin-top: -50px;
      right: 0;
      width: 125px;
      height: 100px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 4px;
        border: 1px solid #f0f0f0;
      }
    }
    li {
      line-height: 20px;
      position: relative;
      // width: 100%;
      padding: 15px 0px;
      padding-right: 150px;
      border-bottom: 1px solid #f0f0f0;
      word-wrap: break-word;
      cursor: pointer;
      &:hover {
        .title {
          color: #000;
        }
      }
      .abstract {
        min-height: 30px;
        margin: 0 0 8px;
        font-size: 13px;
        line-height: 24px;
        color: #555;
      }
      .meta {
        padding-right: 0 !important;
        font-size: 12px;
        font-weight: 400;
        line-height: 20px;
        a {
          margin-right: 10px;
          color: #b4b4b4;
          &::hover {
            transition: 0.1s ease-in;
            -webkit-transition: 0.1s ease-in;
            -moz-transition: 0.1s ease-in;
            -o-transition: 0.1s ease-in;
            -ms-transition: 0.1s ease-in;
          }
        }
        span {
          margin-right: 10px;
          color: #666;
        }
      }
    }
  }
}
</style>