import axios from '@/utils/request'

export const login = data => axios.post('/api/users/login', data)
