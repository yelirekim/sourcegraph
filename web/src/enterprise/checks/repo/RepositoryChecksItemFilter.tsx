import React, { useState } from 'react'
import { ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap'

interface Props {
    /** The current value of the filter. */
    value: string

    className: string
}

/**
 * The filter control (dropdown and input field) for check items.
 */
export const RepositoryChecksItemFilter: React.FunctionComponent<Props> = ({ value, className }) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className={`input-group ${className}`}>
            <div className="input-group-prepend">
                {/* tslint:disable-next-line:jsx-no-lambda */}
                <ButtonDropdown isOpen={isOpen} toggle={() => setIsOpen(!isOpen)}>
                    <DropdownToggle caret={true}>Filter</DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem>Open items</DropdownItem>
                        <DropdownItem>Assigned to you</DropdownItem>
                        <DropdownItem>Acted on by you</DropdownItem>
                        <DropdownItem>Closed items</DropdownItem>
                    </DropdownMenu>
                </ButtonDropdown>
            </div>
            <input
                type="text"
                className="form-control"
                aria-label="Filter check items"
                autoCapitalize="off"
                value={value}
            />
        </div>
    )
}
