import AlertOutlineIcon from 'mdi-react/AlertOutlineIcon'
import CheckIcon from 'mdi-react/CheckIcon'
import * as React from 'react'
import { RepositoryChecksListHeader } from './RepositoryChecksListHeader'
import { RepositoryChecksListHeaderFilterButtonDropdown } from './RepositoryChecksListHeaderFilterButtonDropdown'
import { RepositoryChecksListItem } from './RepositoryChecksListItem'

interface Props {}

/**
 * The list of repository checks with a header.
 */
export class RepositoryChecksList extends React.Component<Props> {
    public render(): JSX.Element | null {
        return (
            <div className="repository-checks-list">
                <RepositoryChecksListHeader />
                <div className="card">
                    <div className="card-header d-flex align-items-center justify-content-between">
                        <div className="form-check mx-2">
                            <input
                                className="form-check-input position-static"
                                type="checkbox"
                                aria-label="Select item"
                            />
                        </div>
                        <div className="font-weight-normal flex-1">
                            <strong>
                                <AlertOutlineIcon className="icon-inline" /> 8 open &nbsp;{' '}
                            </strong>
                            <CheckIcon className="icon-inline" /> 27 closed
                        </div>
                        <div>
                            <RepositoryChecksListHeaderFilterButtonDropdown
                                header="Filter by who's assigned"
                                items={['sqs (you)', 'ekonev', 'jleiner', 'ziyang', 'kting7', 'ffranksena']}
                            >
                                Assignee
                            </RepositoryChecksListHeaderFilterButtonDropdown>
                            <RepositoryChecksListHeaderFilterButtonDropdown
                                header="Filter by label"
                                items={[
                                    'perf',
                                    'tech-lead',
                                    'services',
                                    'bugs',
                                    'build',
                                    'noisy',
                                    'security',
                                    'appsec',
                                    'infosec',
                                    'compliance',
                                    'docs',
                                ]}
                            >
                                Labels
                            </RepositoryChecksListHeaderFilterButtonDropdown>
                            <RepositoryChecksListHeaderFilterButtonDropdown
                                header="Sort by"
                                items={['Priority', 'Most recently updated', 'Least recently updated']}
                            >
                                Sort
                            </RepositoryChecksListHeaderFilterButtonDropdown>
                        </div>
                    </div>
                    <ul className="list-group list-group-flush">
                        <RepositoryChecksListItem
                            commitID="0c3c511"
                            author="ekonev"
                            count={217}
                            title="Possible database files"
                            messageCount={5}
                            timeAgo="3 hours ago"
                            labels={['security', 'infosec']}
                        />
                        <RepositoryChecksListItem
                            commitID="8c3537f"
                            author="jleiner"
                            count={73}
                            title="Potential cryptographic private keys"
                            messageCount={0}
                            timeAgo="9 hours ago"
                            labels={['security', 'infosec']}
                        />
                        <RepositoryChecksListItem
                            commitID="17c630d"
                            author="jleiner"
                            count={112}
                            title="Potential API secret keys (high-entropy)"
                            messageCount={3}
                            timeAgo="1 day ago"
                            labels={['security', 'infosec', 'noisy']}
                        />
                        <RepositoryChecksListItem
                            commitID="910c03"
                            author="blslevitsky"
                            count={2}
                            title="New API consumers"
                            messageCount={1}
                            timeAgo="1 day ago"
                            labels={['tech-lead', 'services']}
                        />
                        <RepositoryChecksListItem
                            commitID="af7b381"
                            author="kting7"
                            count={3}
                            title="New npm dependencies"
                            messageCount={7}
                            timeAgo="2 days ago"
                            labels={['security', 'appsec', 'build']}
                        />
                        <RepositoryChecksListItem
                            commitID="0cba83d"
                            author="ziyang"
                            count={2}
                            title="Untrusted publishers of npm dependencies"
                            messageCount={21}
                            timeAgo="2 days ago"
                            labels={['security', 'appsec', 'build']}
                        />
                        <RepositoryChecksListItem
                            commitID="c8164ef"
                            author="ffranksena"
                            count={8}
                            title="Code with no owner"
                            messageCount={14}
                            timeAgo="3 days ago"
                            labels={['tech-lead']}
                        />
                        <RepositoryChecksListItem
                            commitID="83c713"
                            author="aconnor93"
                            count={3}
                            title="PRs waiting on review >24h SLA"
                            messageCount={0}
                            timeAgo="3 days ago"
                            labels={['tech-lead']}
                        />
                    </ul>
                </div>
            </div>
        )
    }
}
