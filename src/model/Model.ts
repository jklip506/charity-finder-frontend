import { CognitoUser } from "@aws-amplify/auth";


export interface User {
    username: string,
    cognitoUser: CognitoUser
}

export interface UserAttribute {
    Name: string,
    Value: string
}

export interface Space {
    spaceId: string,
    name: string,
    location: string,
    photoUrl?: string
}