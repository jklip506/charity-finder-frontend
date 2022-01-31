import React from 'react';
import { Space } from '../../model/Model'
import { DataService } from '../../services/DataService';
import { SpaceComponent} from './SpaceComponent';
import { ConfirmModalComponent } from './ConfirmModalComponent';
import { Link } from 'react-router-dom';

interface SpacesState {

    spaces: Space[],
    showModal: boolean,
    modalContent: string

}

interface SpacesProps {
    dataService: DataService
}

export class Spaces extends React.Component<SpacesProps, SpacesState> {

    constructor(props: SpacesProps) {
        super(props);
        this.state = {
            spaces: [],
            showModal: false,
            modalContent: ''
        }
        //Bind or else loses context
        this.reserveSpace = this.reserveSpace.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    async componentDidMount() {
        const spaces = await this.props.dataService.getSpaces();
        this.setState({
            
            spaces: spaces}
            
        );
    }

    private async reserveSpace(spaceId: string) {
        const reservationResult = await this.props.dataService.reserveSpace(spaceId);
        if(reservationResult) {
            this.setState({
                showModal: true,
                modalContent: `You donated the charity with id ${spaceId} and confirmation number ${reservationResult}`
            })
        } else {
            this.setState({
                showModal: true,
                modalContent: `You cant donate to this charity`
            })
        }
    }

    private renderSpaces() {
        const rows: any[] = [];
        for(const space of this.state.spaces) {
            rows.push(
                <SpaceComponent
                    location = {space.location}
                    name= {space.name}
                    photoURL = {space.photoURL}
                    spaceId= {space.spaceId}
                    reserveSpace = {this.reserveSpace}
                />
            );
        }
        return rows;
    }

    private closeModal() {
        this.setState({
            showModal: false,
            modalContent: ''
        })
    }

    render() {
        return<div>
            <h2>Welcome to the charities page</h2>
            <Link to='/createSpace'>Create Space</Link><br /><br />
            {this.renderSpaces()}
            <ConfirmModalComponent close={this.closeModal} content={this.state.modalContent} show={this.state.showModal}/>
        </div>
    }

}