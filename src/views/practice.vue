<template>
	<div class="item" @click="practiceDetail(1)">
		<a :href="href + 1"
			target="_blank">
			B站首页
		</a>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { Route } from 'vue-router'

export default class Practice extends Vue {
	private href: string = 
		process.env.NODE_ENV === 'development'
			? 'http://localhost:8080/practiceDetail?practice_id='
			: 'http://123.57.35.115:8080/practiceDetail?practice_id='
	private practiceDetail(id: number): void {
		
	}
}
</script>

<style lang="less" scoped>
	.item{
		margin: 0;
		padding: 0;
		list-style: none;
		width: 100%;
		text-align: center;
		height: 200px;
		line-height: 100px;
	}
</style>
