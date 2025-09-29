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

export const getUserIncomes = async ({ userId, page = 1, limit = 10, startDate, endDate } = {}) => {
    const params = {
        userId,
        page,
        limit,
        startDate,
        endDate,
    }
    return (await api.get('auth/admin/user-incomes', { params })).data
}

export const getUserTransactions = async ({ userId, page = 1, limit = 10, startDate, endDate } = {}) => {
    const params = {
        userId,
        page,
        limit,
        startDate,
        endDate,
    }
    return (await api.get('auth/admin/user-transactions', { params })).data
}

export const getUserReferrals = async ({ userId, page = 1, limit = 10 } = {}) => {
    const params = {
        userId,
        page,
        limit,
    }
    return (await api.get('auth/admin/user-referrals', { params })).data
}