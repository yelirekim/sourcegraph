import H from 'history'
import * as React from 'react'
import { RepositoryChecksAreaContext } from '../RepositoryChecksArea'
import { RepositoryChecksManageChecksList } from './RepositoryChecksManageChecksList'

interface Props extends RepositoryChecksAreaContext {
    history: H.History
    location: H.Location
}

/**
 * The repository checks management overview page.
 */
export const RepositoryChecksManageOverviewPage: React.FunctionComponent<Props> = props => (
    <div className="repository-checks-manage-overview-page">
        <RepositoryChecksManageChecksList {...props} />
    </div>
)
