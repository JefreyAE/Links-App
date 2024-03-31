
import { redirectToLoginIfNotAuthenticated } from '@/utils/authUtils'

export default async function Index() {

    await redirectToLoginIfNotAuthenticated()
    
    return (
        <></>
    )
}