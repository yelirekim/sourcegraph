import H from 'history'
import * as React from 'react'
import { FilteredConnection } from '../../../../components/FilteredConnection'
import { queryChecks } from '../../data'
import { Check } from '../../data'
import { RepositoryChecksManageChecksListItem } from './RepositoryChecksManageChecksListItem'

interface Props {
    history: H.History
    location: H.Location
}

/**
 * The list of repository checks in the checks management area.
 */
export const RepositoryChecksManageChecksList: React.FunctionComponent<Props> = ({ history, location }) => (
    <div className="repository-checks-manage-checks-list">
        <FilteredConnection<Check>
            listClassName="list-group list-group-flush"
            listComponent="ul"
            noun="check"
            pluralNoun="checks"
            queryConnection={queryChecks}
            nodeComponent={RepositoryChecksManageChecksListItem}
            hideSearch={false}
            noSummaryIfAllNodesVisible={true}
            history={history}
            location={location}
        />
    </div>
)
