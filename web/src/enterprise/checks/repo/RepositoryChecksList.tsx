import H from 'history'
import AlertOutlineIcon from 'mdi-react/AlertOutlineIcon'
import CheckIcon from 'mdi-react/CheckIcon'
import * as React from 'react'
import { CHECKS } from '../data'
import { RepositoryChecksListHeader } from './RepositoryChecksListHeader'
import { RepositoryChecksListHeaderFilterButtonDropdown } from './RepositoryChecksListHeaderFilterButtonDropdown'
import { RepositoryChecksListItem } from './RepositoryChecksListItem'

interface Props {
    location: H.Location
}

/**
 * The list of repository checks with a header.
 */
export const RepositoryChecksList: React.FunctionComponent<Props> = ({ location }) => (
    <div className="repository-checks-list">
        <RepositoryChecksListHeader location={location} />
        <div className="card">
            <div className="card-header d-flex align-items-center justify-content-between">
                <div className="form-check mx-2">
                    <input className="form-check-input position-static" type="checkbox" aria-label="Select item" />
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
                {CHECKS.map((check, i) => (
                    <RepositoryChecksListItem key={i} location={location} check={check} />
                ))}
            </ul>
        </div>
    </div>
)
