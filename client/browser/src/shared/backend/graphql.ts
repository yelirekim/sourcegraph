import { from } from 'rxjs'
import { graphQLContent, GraphQLRequestOptions } from '../../../../../shared/src/graphql/graphql'
import { PlatformContext } from '../../../../../shared/src/platform/context'
import { isBackground } from '../../context'
import { getHeaders } from './headers'

export const requestOptions: GraphQLRequestOptions = {
    headers: getHeaders(),
    requestOptions: {
        crossDomain: true,
        withCredentials: true,
        async: true,
    },
}

/**
 * Performs a graphQL request from the extension's background page.
 */
export const queryGraphQLFromBackground: PlatformContext['queryGraphQL'] = (request, variables) => {
    if (isBackground) {
        throw new Error('Should not be called from the background page')
    }
    return from(
        browser.runtime
            .sendMessage({
                type: 'requestGraphQL',
                payload: {
                    request: request[graphQLContent],
                    variables: variables || {},
                },
            })
            .then(response => {
                if (!response || (!response.result && !response.err)) {
                    throw new Error('Invalid requestGraphQL response received from background page')
                }
                const { result, err } = response
                if (err) {
                    throw err
                }
                return result
            })
    )
}
