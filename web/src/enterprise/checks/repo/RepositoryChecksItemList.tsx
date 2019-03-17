import AlertCircleOutlineIcon from 'mdi-react/AlertCircleOutlineIcon'
import AlertOutlineIcon from 'mdi-react/AlertOutlineIcon'
import CheckIcon from 'mdi-react/CheckIcon'
import * as React from 'react'
import { ButtonDropdown, DropdownToggle } from 'reactstrap'
import { RepositoryChecksItemListHeader } from './RepositoryChecksItemListHeader'
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
                        <div className="form-check mr-2">
                            <input
                                className="form-check-input position-static"
                                type="checkbox"
                                aria-label="Select item"
                            />
                        </div>
                        <div className="font-weight-normal flex-1">
                            <AlertOutlineIcon className="icon-inline" /> 2 urgent &nbsp;{' '}
                            <strong>
                                <AlertCircleOutlineIcon className="icon-inline" /> 17 open &nbsp;{' '}
                            </strong>
                            <CheckIcon className="icon-inline" /> 55 closed
                        </div>
                        <div>
                            <ButtonDropdown>
                                <DropdownToggle caret={true} toggle={true as any}>
                                    Type
                                </DropdownToggle>
                            </ButtonDropdown>
                            <ButtonDropdown>
                                <DropdownToggle caret={true} toggle={true as any}>
                                    Labels
                                </DropdownToggle>
                            </ButtonDropdown>
                            <ButtonDropdown>
                                <DropdownToggle caret={true} toggle={true as any}>
                                    Assignee
                                </DropdownToggle>
                            </ButtonDropdown>
                            <ButtonDropdown>
                                <DropdownToggle caret={true} toggle={true as any}>
                                    Sort
                                </DropdownToggle>
                            </ButtonDropdown>
                        </div>
                    </div>
                    <ul className="list-group list-group-flush">
                        <RepositoryChecksItemListItem
                            commitID="0c3c511"
                            author="ekonev"
                            priority="urgent"
                            count={3}
                            title="Possible database files"
                            messageCount={1}
                            timeAgo="3 hours ago"
                        />
                        <RepositoryChecksItemListItem
                            commitID="8c3537f"
                            author="jleiner"
                            priority="urgent"
                            count={1}
                            title="Potential cryptographic private key"
                            messageCount={0}
                            timeAgo="9 hours ago"
                        />
                        <RepositoryChecksItemListItem
                            commitID="8c3537f"
                            author="jleiner"
                            priority="normal"
                            count={2}
                            title="Potential API secret key (high-entropy)"
                            messageCount={3}
                            timeAgo="1 day ago"
                        />
                        <RepositoryChecksItemListItem
                            commitID="af7b381"
                            author="kting7"
                            priority="normal"
                            count={1}
                            title={
                                <>
                                    Review new npm dependency <code>zeit-jest</code>
                                </>
                            }
                            messageCount={11}
                            timeAgo="2 days ago"
                        />
                        <RepositoryChecksItemListItem
                            commitID="b8326af"
                            author="ffranksena"
                            priority="normal"
                            count={1}
                            title={
                                <>
                                    No code owner for <code>src/components/TreeView</code>
                                </>
                            }
                            messageCount={9}
                            timeAgo="4 days ago"
                        />
                    </ul>
                </div>
            </div>
        )
    }
}
