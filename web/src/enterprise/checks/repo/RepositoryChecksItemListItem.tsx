import AlertOutlineIcon from 'mdi-react/AlertOutlineIcon'
import MessageOutlineIcon from 'mdi-react/MessageOutlineIcon'
import React from 'react'

interface Props {
    author: string
    commitID: string
    priority: 'urgent' | 'normal'
    count: number
    title: string | React.ReactFragment
    messageCount: number
    timeAgo: string
    labels?: string[]
}

const PRIORITY_TO_CLASS_NAME: Record<Props['priority'], string> = {
    urgent: 'badge-danger',
    normal: 'badge-secondary',
}

/**
 * A list item for a check in {@link RepositoryChecksItemList}.
 */
export const RepositoryChecksItemListItem: React.FunctionComponent<Props> = ({
    author,
    commitID,
    priority,
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
                    <a href={`#{title}`}>{title}</a>
                    {count > 1 && <span className="badge badge-secondary ml-1">{count}</span>}
                </h3>
                <ul className="list-inline d-flex align-items-center">
                    <li className="list-inline-item">
                        <small className="text-muted">
                            {timeAgo} by {author} in <code>{commitID}</code>
                        </small>
                    </li>
                    {false && priority === 'urgent' && (
                        <li className="list-inline-item">
                            <span
                                className={`badge ${PRIORITY_TO_CLASS_NAME[priority]} d-flex align-items-center`}
                                // tslint:disable-next-line:jsx-ban-props
                                style={{ fontSize: '10px !important' }}
                            >
                                <AlertOutlineIcon className="icon-inline mr-1" /> Urgent
                            </span>
                        </li>
                    )}
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
