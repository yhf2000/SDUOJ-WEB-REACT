import React, {Component} from "react";
import {withRouter} from "react-router";
import UserList from "../Component/user/UserList";
import UserListOperHeader from "../Component/user/UserListOperHeader";
import {IUserPropRoles} from "../Component/user/Iuser";
import {RouteComponentProps} from "react-router-dom";
import {Space} from "antd";



class MUser extends Component<IUserPropRoles & RouteComponentProps, any> {
    render() {
        console.log("12312312")
        console.log(
            this.props.roles
        )
        return (
            <>
                <div style={{marginTop: -20, overflow: "hidden"}}>
                    <UserListOperHeader id={this.props.id} roles={this.props.roles}/>
                    <UserList id={this.props.id} roles={this.props.roles}/>
                </div>
            </>
        )
    }
}

export default withRouter(MUser)