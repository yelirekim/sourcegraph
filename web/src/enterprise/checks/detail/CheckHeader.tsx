import H from 'history'
import React from 'react'
import { Check } from '../data'

interface Props {
    check: Check
    location: H.Location
}

/**
 * The header for the check area (for a single check).
 */
export const CheckHeader: React.FunctionComponent<Props> = ({ check }) => (
    <div className="check-header mt-2">
        <h1 className="font-weight-normal">{check.title}</h1>
    </div>
)
