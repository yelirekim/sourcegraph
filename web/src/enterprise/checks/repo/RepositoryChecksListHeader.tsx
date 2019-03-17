import CheckBoxMultipleOutlineIcon from 'mdi-react/CheckBoxMultipleOutlineIcon'
import HistoryIcon from 'mdi-react/HistoryIcon'
import * as React from 'react'
import { RepositoryChecksListFilter } from './RepositoryChecksListFilter'

interface Props {}

/**
 * The header for the list of checks.
 */
export class RepositoryChecksListHeader extends React.Component<Props> {
    public render(): JSX.Element | null {
        return (
            <div className="d-flex justify-content-between align-items-start">
                <div className="flex-1 mr-5 d-flex">
                    <div className="flex-1 mb-3 mr-2">
                        <RepositoryChecksListFilter className="" value="is:open sort:priority" />
                    </div>
                    <button type="button" className="btn btn-outline-link mb-3 mr-4">
                        <HistoryIcon className="icon-inline" /> Activity
                    </button>
                </div>
                <div className="btn-group" role="group">
                    <button type="button" className="btn btn-outline-link">
                        <CheckBoxMultipleOutlineIcon className="icon-inline" /> Checks{' '}
                        <span className="badge badge-secondary">17</span>
                    </button>
                    <button type="button" className="btn btn-success">
                        New check
                    </button>
                </div>
            </div>
        )
    }
}
