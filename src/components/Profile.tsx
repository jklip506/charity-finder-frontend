import React from "react";
import { Link } from "react-router-dom";
import { User, UserAttribute } from "../model/Model";
import { AuthService } from "../services/AuthService";


interface ProfileState{
    userAttributes: UserAttribute[]
}

interface ProfileProps{
    user: User | undefined,
    authService: AuthService
}

export class Profile extends React.Component<ProfileProps, ProfileState> {
    //load attributes
    state: ProfileState = {
        userAttributes: []
    }
    //load state ofter compnent is mounted
    async componentDidMount() {
        if (this.props.user) {
            const userAttrs = await this.props.authService.getUserAttributes(this.props.user);
            this.setState({
                userAttributes: userAttrs
            })
        }
    }
//dynamically render table
    private renderUserAttributes() {
        const rows = [];
        for (const userAttribute of this.state.userAttributes) {
            rows.push(<tr key={userAttribute.Name}>
                <td>{userAttribute.Name}</td>
                <td>{userAttribute.Value}</td>
            </tr>)
        }

        return <table>
            <tbody>
                {rows}
            </tbody>
        </table>
    }

    render() {
        let profileSpace;
        if(this.props.user) {
            profileSpace = <div>
            <h3>{this.props.user.username}</h3>
            Attributes: {this.renderUserAttributes()}
            </div>
        } else {
            profileSpace = <div>
                Please <Link to="/login">Login</Link>
            </div>
        }
        return(
            <div>
                Hello, {profileSpace}
            </div>
        )
    }
}