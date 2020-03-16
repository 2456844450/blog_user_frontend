<template>
  <div class="footer"> An·Zhou 的个人博客 ©2020 Created by An·Zhou</div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'


@Component
export default class Footer extends Vue {}
</script>
<style scoped>
.footer {
  text-align: center;
  padding: 20px;
  font-weight: bold;
}
</style>