import H from 'history'
import HistoryIcon from 'mdi-react/HistoryIcon'
import MessageOutlineIcon from 'mdi-react/MessageOutlineIcon'
import React from 'react'
import { Link } from 'react-router-dom'
import { Check } from '../data'

interface Props {
    check: Check
    location: H.Location
}

/**
 * A list item for a check in {@link RepositoryChecksList}.
 */
export const RepositoryChecksListItem: React.FunctionComponent<Props> = ({
    check: { id, author, commitID, count, title, messageCount, timeAgo, labels },
    location,
}) => (
    <li className="list-group-item p-2">
        <div className="d-flex align-items-start">
            <div className="form-check mx-2">
                <input className="form-check-input position-static" type="checkbox" aria-label="Select item" />
            </div>
            <div className="flex-1">
                <h3 className="d-flex align-items-center mb-0">
                    {/* tslint:disable-next-line:jsx-ban-props */}
                    <Link to={`${location.pathname}/${id}`} style={{ color: 'var(--body-color)' }}>
                        {title}
                    </Link>
                    {count > 1 && <span className="badge badge-secondary ml-1">{count}</span>}
                </h3>
                <ul className="list-inline d-flex align-items-center mb-1">
                    <li className="list-inline-item">
                        <small className="text-muted">
                            <HistoryIcon className="icon-inline" />
                            {timeAgo} by {author} in <code>{commitID}</code>
                        </small>
                    </li>
                </ul>
                {labels && (
                    <div>
                        {labels.map((label, i) => (
                            <span key={i} className={`badge mr-1 ${badgeColorClass(label)}`}>
                                {label}
                            </span>
                        ))}
                    </div>
                )}
            </div>
            <div>
                <ul className="list-inline d-flex align-items-center">
                    {messageCount > 0 && (
                        <li className="list-inline-item">
                            <small className="text-muted">
                                <MessageOutlineIcon className="icon-inline" /> {messageCount}
                            </small>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    </li>
)

function badgeColorClass(label: string): string {
    if (label === 'security' || label.endsWith('sec')) {
        return 'badge-danger'
    }
    const CLASSES = ['badge-primary', 'badge-warning', 'badge-info', 'badge-success']
    const k = label.split('').reduce((sum, c) => (sum += c.charCodeAt(0)), 0)
    return CLASSES[k % (CLASSES.length - 1)]
}
