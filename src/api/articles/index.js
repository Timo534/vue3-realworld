import axios from '@/utils/request'

export const listArticles = config => axios.get('/api/articles', config)

export const feedListArticles = config => axios.get('/api/articles/feed', config)

export const getTags = config => axios.get('/api/tags', config)
