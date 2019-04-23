import { PlatformContext } from '../../../../../shared/src/platform/context'
import * as omnibox from '../../browser/omnibox'
import { SearchCommand } from './search'

export default function initialize(
    { onInputEntered, onInputChanged }: typeof omnibox,
    queryGraphQL: PlatformContext['queryGraphQL']
): void {
    const searchCommand = new SearchCommand(queryGraphQL)
    onInputChanged((query, suggest) => {
        searchCommand
            .getSuggestions(query)
            .then(suggest)
            .catch(err => console.error('error getting suggestions', err))
    })

    onInputEntered((query, disposition) => {
        searchCommand.action(query, disposition)
    })
}
