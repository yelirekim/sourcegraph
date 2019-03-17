import MapSearchIcon from 'mdi-react/MapSearchIcon'
import * as React from 'react'
import { Route, RouteComponentProps, Switch } from 'react-router'
import { Link } from 'react-router-dom'
import * as GQL from '../../../../../shared/src/graphql/schema'
import { HeroPage } from '../../../components/HeroPage'
import { RepoHeaderContributionsLifecycleProps } from '../../../repo/RepoHeader'
import { RepoHeaderContributionPortal } from '../../../repo/RepoHeaderContributionPortal'
import { RepositoryChecksManageArea } from './manage/RepositoryChecksManageArea'
import { RepositoryChecksOverviewPage } from './RepositoryChecksOverviewPage'
import { CheckArea } from '../detail/CheckArea'

const NotFoundPage = () => (
    <HeroPage
        icon={MapSearchIcon}
        title="404: Not Found"
        subtitle="Sorry, the requested repository checks page was not found."
    />
)

/**
 * Properties passed to all page components in the repository checks area.
 */
export interface RepositoryChecksAreaContext {
    /**
     * The repository.
     */
    repo: GQL.IRepository
}

interface Props extends RepositoryChecksAreaContext, RouteComponentProps<{}>, RepoHeaderContributionsLifecycleProps {
    routePrefix: string
}

/**
 * The repository checks area.
 */
export class RepositoryChecksArea extends React.Component<Props> {
    public render(): JSX.Element | null {
        const context: RepositoryChecksAreaContext = {
            repo: this.props.repo,
        }

        return (
            <div className="repository-checks-area area">
                <RepoHeaderContributionPortal
                    position="nav"
                    element={
                        <Link to={this.props.routePrefix} key="checks">
                            Checks
                        </Link>
                    }
                    repoHeaderContributionsLifecycleProps={this.props.repoHeaderContributionsLifecycleProps}
                />
                {/* TODO(sqs): remove sidebar if unused */}
                <div className="area__content mb-5">
                    <Switch>
                        <Route
                            path={this.props.match.url}
                            key="hardcoded-key" // see https://github.com/ReactTraining/react-router/issues/4578#issuecomment-334489490
                            exact={true}
                            // tslint:disable-next-line:jsx-no-lambda
                            render={routeComponentProps => (
                                <RepositoryChecksOverviewPage {...routeComponentProps} {...context} />
                            )}
                        />
                        <Route
                            path={`${this.props.match.url}/-/manage`}
                            key="hardcoded-key" // see https://github.com/ReactTraining/react-router/issues/4578#issuecomment-334489490
                            // tslint:disable-next-line:jsx-no-lambda
                            render={routeComponentProps => (
                                <RepositoryChecksManageArea
                                    {...routeComponentProps}
                                    {...context}
                                    repoHeaderContributionsLifecycleProps={
                                        this.props.repoHeaderContributionsLifecycleProps
                                    }
                                />
                            )}
                        />
                        <Route
                            path={`${this.props.match.url}/:checkID`}
                            key="hardcoded-key" // see https://github.com/ReactTraining/react-router/issues/4578#issuecomment-334489490
                            // tslint:disable-next-line:jsx-no-lambda
                            render={routeComponentProps => (
                                <CheckArea
                                    {...routeComponentProps}
                                    {...context}
                                    repoHeaderContributionsLifecycleProps={
                                        this.props.repoHeaderContributionsLifecycleProps
                                    }
                                />
                            )}
                        />
                        <Route key="hardcoded-key" component={NotFoundPage} />
                    </Switch>
                </div>
            </div>
        )
    }
}
