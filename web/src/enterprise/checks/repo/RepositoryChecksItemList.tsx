import AlertCircleOutlineIcon from 'mdi-react/AlertCircleOutlineIcon'
import AlertOutlineIcon from 'mdi-react/AlertOutlineIcon'
import CheckIcon from 'mdi-react/CheckIcon'
import * as React from 'react'
import { ButtonDropdown, DropdownToggle } from 'reactstrap'
import { RepositoryChecksItemListHeader } from './RepositoryChecksItemListHeader'
import { RepositoryChecksItemListHeaderFilterButtonDropdown } from './RepositoryChecksItemListHeaderFilterButtonDropdown'
import { RepositoryChecksItemListItem } from './RepositoryChecksItemListItem'

interface Props {}

/**
 * The list of repository checks with a header.
 */
export class RepositoryChecksItemList extends React.Component<Props> {
    public render(): JSX.Element | null {
        return (
            <div className="repository-checks-item-list">
                <RepositoryChecksItemListHeader />
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
                                <AlertOutlineIcon className="icon-inline" /> 8 need attention &nbsp;{' '}
                            </strong>
                            <CheckIcon className="icon-inline" /> 27 others
                        </div>
                        <div>
                            <RepositoryChecksItemListHeaderFilterButtonDropdown
                                header="Filter by who's assigned"
                                items={['sqs (you)', 'ekonev', 'jleiner', 'ziyang', 'kting7', 'ffranksena']}
                            >
                                Assignee
                            </RepositoryChecksItemListHeaderFilterButtonDropdown>
                            <RepositoryChecksItemListHeaderFilterButtonDropdown
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
                            </RepositoryChecksItemListHeaderFilterButtonDropdown>
                            <RepositoryChecksItemListHeaderFilterButtonDropdown
                                header="Sort by"
                                items={['Priority', 'Most recently updated', 'Least recently updated']}
                            >
                                Sort
                            </RepositoryChecksItemListHeaderFilterButtonDropdown>
                        </div>
                    </div>
                    <ul className="list-group list-group-flush">
                        <RepositoryChecksItemListItem
                            commitID="0c3c511"
                            author="ekonev"
                            priority="urgent"
                            count={217}
                            title="Possible database files"
                            messageCount={5}
                            timeAgo="3 hours ago"
                            labels={['security', 'infosec']}
                        />
                        <RepositoryChecksItemListItem
                            commitID="8c3537f"
                            author="jleiner"
                            priority="urgent"
                            count={73}
                            title="Potential cryptographic private keys"
                            messageCount={0}
                            timeAgo="9 hours ago"
                            labels={['security', 'infosec']}
                        />
                        <RepositoryChecksItemListItem
                            commitID="17c630d"
                            author="jleiner"
                            priority="normal"
                            count={112}
                            title="Potential API secret keys (high-entropy)"
                            messageCount={3}
                            timeAgo="1 day ago"
                            labels={['security', 'infosec', 'noisy']}
                        />
                        <RepositoryChecksItemListItem
                            commitID="910c03"
                            author="blslevitsky"
                            priority="normal"
                            count={2}
                            title="New API consumers"
                            messageCount={1}
                            timeAgo="2 days ago"
                            labels={['tech-lead', 'services']}
                        />
                        <RepositoryChecksItemListItem
                            commitID="af7b381"
                            author="kting7"
                            priority="normal"
                            count={3}
                            title="New npm dependencies"
                            messageCount={7}
                            timeAgo="3 days ago"
                            labels={['security', 'appsec', 'build']}
                        />
                        <RepositoryChecksItemListItem
                            commitID="0cba83d"
                            author="ziyang"
                            priority="normal"
                            count={2}
                            title="Untrusted publishers of npm dependencies"
                            messageCount={21}
                            timeAgo="3 days ago"
                            labels={['security', 'appsec', 'build']}
                        />
                        <RepositoryChecksItemListItem
                            commitID="c8164ef"
                            author="ffranksena"
                            priority="normal"
                            count={8}
                            title="Code with no owner"
                            messageCount={14}
                            timeAgo="4 days ago"
                            labels={['tech-lead']}
                        />
                        <RepositoryChecksItemListItem
                            commitID="83c713"
                            author="aconnor93"
                            priority="normal"
                            count={3}
                            title="PRs waiting on review >24h SLA"
                            messageCount={0}
                            timeAgo="7 days ago"
                            labels={['tech-lead']}
                        />
                    </ul>
                </div>
            </div>
        )
    }
}
