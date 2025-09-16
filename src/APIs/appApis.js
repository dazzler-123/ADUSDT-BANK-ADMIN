import api from "./interceptor"

export const getAllUser = async ({ page = 0, limit = 10, search = '', sortBy = '', sortDir = 'asc',startDate,endDate ,status} = {}) => {
    const params = {
        page,
        limit,
        search,
        sortBy,
        sortDir,
        startDate,
        endDate,
        status,
    }
    return (await api.get('auth/getAllUser', { params })).data
}

export const getReport = async () => {
    return (await api.get('auth/admin/report')).data
}