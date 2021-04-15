<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">
          conduit
        </h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li
                v-if="$store.state.user"
                class="nav-item"
              >
                <router-link
                  class="nav-link"
                  to="/feed"
                  exact-active-class="active"
                >
                  Your Feed
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  class="nav-link"
                  to="/"
                  exact-active-class="active"
                >
                  Global Feed
                </router-link>
              </li>
              <li
                v-if="$route.name === 'TagArticleList'"
                class="nav-item"
              >
                <router-link
                  class="nav-link"
                  :to="{
                    name: 'TagArticleList',
                    params: {
                      tag: $route.params.tag
                    }
                  }"
                  exact-active-class="active"
                >
                  #{{ $route.params.tag }}
                </router-link>
              </li>
            </ul>
          </div>

          <div
            v-if="isLoading"
            class="article-preview"
          >
            Loading articles...
          </div>

          <template v-else-if="articles.length">
            <div
              v-for="(article, index) in articles"
              :key="index"
              class="article-preview"
            >
              <div class="article-meta">
                <router-link to="/profile">
                  <img :src="article.author.image">
                </router-link>
                <div class="info">
                  <router-link
                    to="/profile"
                    class="author"
                  >
                    {{ article.author.username }}
                  </router-link>
                  <span class="date">{{ dayjs(article.createdAt) }}</span>
                </div>
                <button class="btn btn-outline-primary btn-sm pull-xs-right">
                  <i class="ion-heart" /> {{ article.favoritesCount }}
                </button>
              </div>
              <router-link
                to="/article"
                class="preview-link"
              >
                <h1>{{ article.title }}</h1>
                <p>{{ article.description }}</p>
                <span>Read more...</span>

                <ul
                  v-for="(tag, index) in article.tagList"
                  :key="index"
                  class="tag-list"
                >
                  <li class="tag-default tag-pill tag-outline">
                    {{ tag }}
                  </li>
                </ul>
              </router-link>
            </div>
          </template>

          <div
            v-else
            class="article-preview"
          >
            No articles are here... yet.
          </div>

          <nav>
            <ul class="pagination">
              <li
                v-for="(offsetVal, index) in Math.ceil(articlesCount/limit)"
                :key="index"
                class="page-item"
                :class="{ active: (offsetVal - 1) * limit === offset }"
                @click="changeOffset(offsetVal - 1)"
              >
                <span
                  class="page-link"
                  href=""
                >{{ offsetVal }}</span>
              </li>
            </ul>
          </nav>
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <router-link
                v-for="(tag, index) in tags"
                :key="index"
                :to="{
                  name: 'TagArticleList',
                  params: {
                    tag
                  }
                }"
                class="tag-pill tag-default"
              >
                {{ tag }}
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, readonly, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { listArticles, feedListArticles, getTags } from '@/api/articles'
import dayjs from '@/utils/date'

export default {
  name: 'ArticleList',
  setup () {
    const limit = readonly(10)
    const articles = ref([])
    const articlesCount = ref(0)
    const offset = ref(0)
    const tags = ref(null)
    const route = useRoute()
    const isLoading = ref(false)

    getTags().then(({ data }) => {
      tags.value = data.tags
    })

    async function getArticles (offset) {
      try {
        const api = route.name === 'FeedArticleList' ? feedListArticles : listArticles
        const { data } = await api({
          params: {
            limit,
            offset,
            tag: route.params.tag
          }
        })
        articles.value = data.articles
        articlesCount.value = data.articlesCount
      } catch (e) {
        console.log(e)
      }
    }

    function changeOffset (offsetVal) {
      offset.value = offsetVal * limit
    }

    watchEffect(async () => {
      isLoading.value = true
      await getArticles(offset.value)
      isLoading.value = false
    })

    return {
      articles,
      getArticles,
      dayjs,
      articlesCount,
      changeOffset,
      limit,
      offset,
      tags,
      isLoading
    }
  }
}
</script>

<style scoped>

</style>
