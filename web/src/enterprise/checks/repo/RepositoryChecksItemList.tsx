import AlertCircleOutlineIcon from 'mdi-react/AlertCircleOutlineIcon'
import CheckIcon from 'mdi-react/CheckIcon'
import * as React from 'react'
import { ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap'
import { RepositoryChecksItemListHeader } from './RepositoryChecksItemListHeader'

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
                        <div className="font-weight-normal">
                            <strong>
                                <AlertCircleOutlineIcon className="icon-inline" /> 17 open &nbsp;{' '}
                            </strong>
                            <CheckIcon className="icon-inline" /> 55 closed
                        </div>
                        <div>
                            <ButtonDropdown>
                                <DropdownToggle caret={true}>Type</DropdownToggle>
                            </ButtonDropdown>
                            <ButtonDropdown>
                                <DropdownToggle caret={true}>Labels</DropdownToggle>
                            </ButtonDropdown>
                            <ButtonDropdown>
                                <DropdownToggle caret={true}>Assignee</DropdownToggle>
                            </ButtonDropdown>
                            <ButtonDropdown>
                                <DropdownToggle caret={true}>Sort</DropdownToggle>
                            </ButtonDropdown>
                        </div>
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Cras justo odio</li>
                        <li className="list-group-item">Dapibus ac facilisis in</li>
                        <li className="list-group-item">Vestibulum at eros</li>
                    </ul>
                </div>
            </div>
        )
    }
}
