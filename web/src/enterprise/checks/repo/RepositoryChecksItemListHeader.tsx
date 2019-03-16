import AccessPointIcon from 'mdi-react/AccessPointIcon'
import HistoryIcon from 'mdi-react/HistoryIcon'
import RadarIcon from 'mdi-react/RadarIcon'
import * as React from 'react'
import { RepositoryChecksItemFilter } from './RepositoryChecksItemFilter'

interface Props {}

/**
 * The header for the list of check items.
 */
export class RepositoryChecksItemListHeader extends React.Component<Props> {
    public render(): JSX.Element | null {
        return (
            <div className="d-flex justify-content-between mr-4">
                <div className="flex-1 mr-2">
                    <RepositoryChecksItemFilter className="mb-3" value="is:open sort:priority" />
                </div>
                <div className="btn-group mb-3" role="group">
                    <button type="button" className="btn btn-outline-link">
                        <RadarIcon className="icon-inline" /> Rules
                    </button>
                    <button type="button" className="btn btn-outline-link">
                        <HistoryIcon className="icon-inline" /> Activity
                    </button>
                    <button type="button" className="btn btn-outline-link">
                        <AccessPointIcon className="icon-inline" /> Status
                    </button>
                </div>
            </div>
        )
    }
}
