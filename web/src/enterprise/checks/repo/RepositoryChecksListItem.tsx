import HistoryIcon from 'mdi-react/HistoryIcon'
import MessageOutlineIcon from 'mdi-react/MessageOutlineIcon'
import React from 'react'

interface Props {
    author: string
    commitID: string
    count: number
    title: string | React.ReactFragment
    messageCount: number
    timeAgo: string
    labels?: string[]
}

/**
 * A list item for a check in {@link RepositoryChecksList}.
 */
export const RepositoryChecksListItem: React.FunctionComponent<Props> = ({
    author,
    commitID,
    count,
    title,
    messageCount,
    timeAgo,
    labels,
}) => (
    <li className="list-group-item p-2">
        <div className="d-flex align-items-start">
            <div className="form-check mx-2">
                <input className="form-check-input position-static" type="checkbox" aria-label="Select item" />
            </div>
            <div className="flex-1">
                <h3 className="d-flex align-items-center mb-0">
                    {/* tslint:disable-next-line:jsx-ban-props */}
                    <a href={`#${title}`} style={{ color: 'var(--body-color)' }}>
                        {title}
                    </a>
                    {count > 1 && <span className="badge badge-secondary ml-1">{count}</span>}
                </h3>
                <ul className="list-inline d-flex align-items-center">
                    <li className="list-inline-item">
                        <small className="text-muted">
                            <HistoryIcon className="icon-inline" />
                            {timeAgo} by {author} in <code>{commitID}</code>
                        </small>
                    </li>
                </ul>
                <ul className="list-inline d-flex align-items-center">
                    {labels && (
                        <li className="list-inline-item">
                            {labels.map((label, i) => (
                                <span key={i} className={`badge mr-1 ${badgeColorClass(label)}`}>
                                    {label}
                                </span>
                            ))}
                        </li>
                    )}
                </ul>
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
