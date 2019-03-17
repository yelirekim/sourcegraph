import * as React from 'react'
import { NavLink } from 'react-router-dom'
import { SIDEBAR_CARD_CLASS, SIDEBAR_LIST_GROUP_ITEM_ACTION_CLASS } from '../../../components/Sidebar'
import { RepositoryChecksAreaContext } from './RepositoryChecksArea'

interface Props extends RepositoryChecksAreaContext {
    className: string
    routePrefix: string
}

/**
 * Sidebar for the repository checks area.
 */
export const RepositoryChecksAreaSidebar: React.FunctionComponent<Props> = (props: Props) => (
    <div className={`repository-checks-area-sidebar ${props.className}`}>
        <div className={SIDEBAR_CARD_CLASS}>
            <div className="card-header">Checks</div>
            <div className="list-group list-group-flush">
                <NavLink
                    to={`${props.routePrefix}/-/checks`}
                    exact={true}
                    className={SIDEBAR_LIST_GROUP_ITEM_ACTION_CLASS}
                >
                    Overview
                </NavLink>
                <NavLink
                    to={`${props.routePrefix}/-/checks/audit-log`}
                    exact={true}
                    className={SIDEBAR_LIST_GROUP_ITEM_ACTION_CLASS}
                >
                    Audit log
                </NavLink>
                <NavLink
                    to={`${props.routePrefix}/-/checks/providers`}
                    exact={true}
                    className={SIDEBAR_LIST_GROUP_ITEM_ACTION_CLASS}
                >
                    Providers
                </NavLink>
            </div>
        </div>
    </div>
)
