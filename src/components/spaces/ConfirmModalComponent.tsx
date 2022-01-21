import React from "react";
import './ConfirmModalComponent.css';

interface ConfirmModalComponentProps {
    show: boolean,
    content: string,
    close: () => void
}

export class ConfirmModalComponent extends React.Component<ConfirmModalComponentProps> {
    render() {
        if (!this.props.show) {
            return null
        } else {
            return <div className='modal'>
                <div className='modal-content'>
                    <h2>You tried to resrve and ...</h2>
                    <h3 className='modalText'>{this.props.content}</h3>
                    <button  onClick={()=> this.props.close()} >Ok, close</button>
                </div>
            </div>
        }

        console.log('123');
    }
}