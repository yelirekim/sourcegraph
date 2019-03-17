import MapSearchIcon from 'mdi-react/MapSearchIcon'
import * as React from 'react'
import { Route, RouteComponentProps, Switch } from 'react-router'
import * as GQL from '../../../../../shared/src/graphql/schema'
import { HeroPage } from '../../../components/HeroPage'
import { RepoHeaderContributionsLifecycleProps } from '../../../repo/RepoHeader'
import { RepoHeaderContributionPortal } from '../../../repo/RepoHeaderContributionPortal'
import { RepositoryChecksOverviewPage } from './RepositoryChecksOverviewPage'

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
export interface RepositoryChecksAreaPageProps {
    /**
     * The repository.
     */
    repo: GQL.IRepository
}

interface Props extends RepositoryChecksAreaPageProps, RouteComponentProps<{}>, RepoHeaderContributionsLifecycleProps {
    routePrefix: string
}

/**
 * The repository checks area.
 */
export class RepositoryChecksArea extends React.Component<Props> {
    public render(): JSX.Element | null {
        const transferProps: RepositoryChecksAreaPageProps = {
            repo: this.props.repo,
        }

        return (
            <div className="repository-checks-area area">
                <RepoHeaderContributionPortal
                    position="nav"
                    element={<span key="checks">Checks</span>}
                    repoHeaderContributionsLifecycleProps={this.props.repoHeaderContributionsLifecycleProps}
                />
                {/* TODO(sqs): remove sidebar if unused */}
                <div className="area__content">
                    <Switch>
                        <Route
                            path={this.props.match.url}
                            key="hardcoded-key" // see https://github.com/ReactTraining/react-router/issues/4578#issuecomment-334489490
                            exact={true}
                            // tslint:disable-next-line:jsx-no-lambda
                            render={routeComponentProps => (
                                <RepositoryChecksOverviewPage {...routeComponentProps} {...transferProps} />
                            )}
                        />
                        <Route
                            path={`${this.props.match.url}/asdfTODO(sqs)`}
                            key="hardcoded-key" // see https://github.com/ReactTraining/react-router/issues/4578#issuecomment-334489490
                            exact={true}
                            // tslint:disable-next-line:jsx-no-lambda
                            render={routeComponentProps => <p>TODO(sqs)</p>}
                        />
                        <Route key="hardcoded-key" component={NotFoundPage} />
                    </Switch>
                </div>
            </div>
        )
    }
}
