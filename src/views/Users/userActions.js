import api from '../../services/api'

export const getList = (callBackSuccess, callBackError) => {
    return async dispatch => {
        try {
            const response = await api.get(`${import.meta.env.VITE_APP_API_URL}users`)
            dispatch({
                type: 'USERS_FETCH',
                payload: response.data
            })
            callBackSuccess()

        } catch (error) {
            console.log('Erro ao carregar lista ', error)
            callBackError(error)
        }
    }
}
