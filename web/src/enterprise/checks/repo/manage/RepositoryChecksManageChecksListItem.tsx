import React from 'react'
import { Check } from '../../data'

interface Props {
    node: Check
}

export const RepositoryChecksManageChecksListItem: React.FunctionComponent<Props> = ({ node }) => (
    <li className="list-group-item">{node.title}</li>
)
