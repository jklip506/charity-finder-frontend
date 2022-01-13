import React, { SyntheticEvent } from "react";
import { AuthService } from "../services/AuthService";
import { User } from '../model/Model';
import { Navigate } from 'react-router-dom';

interface LoginProps {
    authService: AuthService,
    // child to parent
    setUser: (user: User) => void

}

interface LoginState {
    userName: string,
    password: string,
    loginAttempted: boolean,
    loginSuccessfull: boolean
}

interface CustomEvent {
    target: HTMLInputElement
}

export class Login extends React.Component<LoginProps, LoginState> {

    state: LoginState = {
        userName: '',
        password: '',
        loginAttempted: false,
        loginSuccessfull: false
    }

    private setUserName(event: CustomEvent){
        this.setState({userName: event.target.value})
    }

    private setPassword(event: CustomEvent){
        this.setState({password: event.target.value})
    }

    private async handleSubmit(event: SyntheticEvent){
        event.preventDefault();
        this.setState({loginAttempted: true});
        const result = await this.props.authService.login(
            this.state.userName,
            this.state.password
        )
        if (result) {
            this.setState({loginSuccessfull: true});
            this.props.setUser(result);
            
        } else {
            this.setState({loginSuccessfull: false});
        }
    }

    render() {

        let loginMessage: any;
        let navigate: any | undefined;
        if (this.state.loginAttempted) {
            if (this.state.loginSuccessfull) {
                loginMessage = <label>Login Successfully</label>
                navigate = <Navigate to='/profile' replace={true}/>
            } else {
                loginMessage = <label>Login Failed</label>;
            }
        }

        return (
            <div>
                <h2>Please Login</h2>
                <form onSubmit={e => this.handleSubmit(e)}>
                    <input value={this.state.userName} onChange = {e => this.setUserName(e)}/><br/>
                    <input value={this.state.password} onChange = {e => this.setPassword(e)} type='password'/><br/>
                    <input type="submit" value="Login" />
                </form>
                {loginMessage}
                {navigate}
            </div>
        )
    }
}

