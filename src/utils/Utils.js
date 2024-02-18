import { axiosReq } from '../api/axiosDefaults'


// Adapted from Utils.js by Code Institute
export const getMoreData = async (resource, setResource) => {
    try {
        const { data } = await axiosReq.get(resource.next)
        setResource(prevResource => ({
            ...prevResource,
            next: data.next,
            results: data.results.reduce((acc, cur) => {
                return acc.some(accResult => accResult.id === cur.id)
                    ? acc
                    : [...acc, cur]
            }, prevResource.results)
        }))
    } catch (err) {
        console.log(err)
    }
}