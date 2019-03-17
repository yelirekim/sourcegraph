import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import { RepoHeaderContributionsLifecycleProps } from '../../../repo/RepoHeader'
import { RepositoryChecksAreaContext } from './RepositoryChecksArea'
import { RepositoryChecksList } from './RepositoryChecksList'

interface Props extends RepositoryChecksAreaContext, RouteComponentProps<{}>, RepoHeaderContributionsLifecycleProps {}

/**
 * The repository checks overview page.
 */
export const RepositoryChecksOverviewPage: React.FunctionComponent<Props> = ({ location }) => (
    <div className="repository-checks-overview-page">
        <RepositoryChecksList location={location} />
    </div>
)
