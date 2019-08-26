import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField'

/**
 * Dialogs can be nested. This example opens a Date Picker from within a Dialog.
 */
export default class DialogExampleDialogDatePicker extends React.Component {
    state = {
        open: false,
        name:''
    };

    componentWillReceiveProps(nextProps) {
        this.setState({ search: nextProps.search });
    }

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleSave = () =>{
        localStorage.setItem('search ', JSON.stringify({
            name: this.state.name,
            paramas: this.state.search
        }))
        this.handleClose()
    }

    handleNameChange = event => {
        this.setState({
          name: event.target.value
        });
      }

    render() {
        const actions = [
        <FlatButton
            label="Ok"
            primary={true}
            keyboardFocused={true}
            onClick={this.handleSave}
        />,
        ];

        return (
        <div>
            <RaisedButton label="Guardar" primary={true} onClick={this.handleOpen} style={{marginTop:5}}/>
            <Dialog
                title="Guradar busqueda"
                actions={actions}
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose}
            >
                <TextField floatingLabelText="Save as" value={this.state.name} onChange={this.handleNameChange}/>
            </Dialog>
        </div>
        );
    }
}