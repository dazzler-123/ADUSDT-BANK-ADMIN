import api from "./interceptor"

export const login = async (body) => {

    return (await api.post('auth/admin/login', body)).data

}
export const getAnnouncement = async ({ page = 1, limit = 10, search = '', sortBy = '', sortDir = 'asc', startDate, endDate } = {}) => {
    const params = {
        page,
        limit,
        search,
        sortBy,
        sortDir,
        startDate,
        endDate,
    }
    return (await api.get('/announcements', { params })).data

}

export const getIncome = async ({ page = 1, limit = 10, search = '', sortBy = '', sortDir = 'asc', startDate, endDate, incomeType } = {}) => {
    const params = {
        page,
        limit,
        search,
        sortBy,
        sortDir,
        startDate,
        endDate,
        incomeType,
    }

    return (await api.get('auth/admin/income-types', { params })).data

}

export const getTicket = async ({ page = 1, limit = 10, search = '', sortBy = '', sortDir = 'asc', startDate, endDate } = {}) => {

    const params = {
        page,
        limit,
        search,
        sortBy,
        sortDir,
        startDate,
        endDate,
    }
    return (await api.get('/tickets', { params })).data

}

export const getTransaction = async ({ page = 1, limit = 10, search = '', sortBy = '', sortDir = 'asc', startDate, endDate, transactionType } = {}) => {
    const params = {
        page,
        limit,
        search,
        sortBy,
        sortDir,
        startDate,
        endDate,
        transactionType,
    }
    return (await api.get('auth/admin/transaction-types', { params })).data

}

export const financialSummary = async ({ startDate, endDate } = {}) => {
    const params = {
        startDate,
        endDate,
    }
    return (await api.get('auth/admin/financial-summary', { params })).data
}

export const createAnnouncement = async ({ title, message, isActive } = {}) => {
    const body = {
        title,
        message,
        isActive,
    }
    return (await api.post('/announcements',  body )).data
}
export const deleteAnnouncement = async ({ id } = {}) => {
    return (await api.delete(`/announcements/${id}`)).data
}

export const updateAnnouncement = async ({ id, title, message, isActive } = {}) => {
    const body = {
        title,
        message,
        isActive,
    }
    return (await api.patch(`/announcements/${id}`, body)).data
}
export const updateAnnouncementDeactive = async ({ id, } = {}) => {

    return (await api.patch(`/announcements/${id}/deactivate`)).data
}