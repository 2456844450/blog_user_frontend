<template>
  <div class="archive left">
    <el-timeline>
      <el-timeline-item v-for="(l, i) in articlesList"
                        :key="l.year"
                        placement="top"
                        hide-timestamp>
        <h3 class="year">{{l.year}}</h3>

        <el-timeline-item v-for="(item, index) in l.list"
                          :key="item._id"
                          :color="item.state === 1 ? 'green' : item.state === 3 ? 'red' : ''"
                          placement="top"
                          hide-timestamp>
          <router-link :to="`/articleDetail?article_id=${item.id}`"
                        target="_blank">
            <h3 class="title">{{item.title}}</h3>
          </router-link>
          <p>{{formatTime(item.create_time)}}</p>
        </el-timeline-item>
      </el-timeline-item>
    </el-timeline>
    <LoadEnd v-if="isLoadEnd"></LoadEnd>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { timestampToTime } from '@/utils/utils'
import { ParamsArchive, ArchiveData } from '@/types/index'
import LoadEnd from '@/components/loadEnd.vue'

@Component({
  components: {
    LoadEnd
  }
})
export default class Archive extends Vue {
  private isLoadEnd: boolean = false;
  private isLoading: boolean = false;
  private articlesList: Array<object> = []
  private total: number = 0;
  private params: ParamsArchive = {
    keyword: "",
    likes: "",
    state: 1,
    article: 1,
    tag_id: '',
    category_id: '',
    pageNum: 1,
    pageSize: 10
  }

  mounted(): void {
    this.handleSearch()
  }

  private async handleSearch(): Promise<void> {
    this.isLoading = true;
    console.log(this.params)
    const data: ArchiveData = await this.$https.get(this.$urls.getArticleList, {
      params: this.params
    })
    this.isLoading = false;
    this.articlesList = [...this.articlesList, ...data.list]
    // this.total = data.count
    // this.params.pageNum++;
    // if (this.total === this.articlesList.length) {
    //   this.isLoadEnd = true
    // }
    if (this.articlesList.length === 0) {
      this.isLoadEnd = true
    }
  }

}
</script>

<style lang="less" scoped>
.archive {
  padding: 40px 0;
  .year {
    font-size: 30px;
    font-weight: bold;
    color: #000;
    margin-top: 0;
  }
  a {
    text-decoration: none;
  }

  .title {
    color: #333;
    &:hover {
      color: #1890ff;
    }
  }
}
</style>