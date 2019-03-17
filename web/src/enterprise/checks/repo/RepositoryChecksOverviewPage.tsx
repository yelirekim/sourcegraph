import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import { RepoHeaderContributionsLifecycleProps } from '../../../repo/RepoHeader'
import { RepositoryChecksAreaPageProps } from './RepositoryChecksArea'
import { RepositoryChecksList } from './RepositoryChecksList'

interface Props extends RepositoryChecksAreaPageProps, RouteComponentProps<{}>, RepoHeaderContributionsLifecycleProps {}

/**
 * The repository checks overview page.
 */
export class RepositoryChecksOverviewPage extends React.Component<Props> {
    public render(): JSX.Element | null {
        return (
            <div className="repository-checks-overview-page">
                <RepositoryChecksList />
            </div>
        )
    }
}
