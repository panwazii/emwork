export const actions = {
    async create({ getters }, data) {
        return await this.$axios
            .post('/api/admin/create', data)
            .then((res) => res)
    },
    async getAllResult({ getters }, data) {
        return await this.$axios
            .get('/api/admin/getAllResult', data)
            .then((res) => res)
    },
    async getById({ getters }, data) {
        return await this.$axios
            .get('/api/admin/getById', data)
            .then((res) => res)
    },
    async delete({ getters }, data) {
        return await this.$axios
            .delete('/api/admin/delete', data)
            .then((res) => res)
    },
}