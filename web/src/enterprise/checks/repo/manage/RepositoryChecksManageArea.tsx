import MapSearchIcon from 'mdi-react/MapSearchIcon'
import * as React from 'react'
import { Route, RouteComponentProps, Switch } from 'react-router'
import { Link } from 'react-router-dom'
import { HeroPage } from '../../../../components/HeroPage'
import { RepoHeaderContributionsLifecycleProps } from '../../../../repo/RepoHeader'
import { RepoHeaderContributionPortal } from '../../../../repo/RepoHeaderContributionPortal'
import { RepositoryChecksAreaContext } from '../RepositoryChecksArea'
import { RepositoryChecksManageOverviewPage } from './RepositoryChecksManageOverviewPage'

const NotFoundPage = () => (
    <HeroPage
        icon={MapSearchIcon}
        title="404: Not Found"
        subtitle="Sorry, the requested repository checks management page was not found."
    />
)

interface Props extends RepositoryChecksAreaContext, RouteComponentProps<{}>, RepoHeaderContributionsLifecycleProps {}

/**
 * The repository checks management area.
 */
export class RepositoryChecksManageArea extends React.Component<Props> {
    public render(): JSX.Element | null {
        const context: RepositoryChecksAreaContext = this.props
        return (
            <div className="repository-checks-manage-area">
                <RepoHeaderContributionPortal
                    position="nav"
                    element={
                        <Link to={this.props.match.url} key="manage">
                            Manage
                        </Link>
                    }
                    repoHeaderContributionsLifecycleProps={this.props.repoHeaderContributionsLifecycleProps}
                />
                <Switch>
                    <Route
                        path={this.props.match.url}
                        key="hardcoded-key" // see https://github.com/ReactTraining/react-router/issues/4578#issuecomment-334489490
                        exact={true}
                        // tslint:disable-next-line:jsx-no-lambda
                        render={routeComponentProps => (
                            <RepositoryChecksManageOverviewPage {...routeComponentProps} {...context} />
                        )}
                    />
                    <Route key="hardcoded-key" component={NotFoundPage} />
                </Switch>
            </div>
        )
    }
}
